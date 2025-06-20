'use server';

import path from "path";
import { CommonService } from "@/modules/common/services/common-service";
import {getTranslations} from 'next-intl/server';
import {Form, Field, Submission, PaginatedResult} from "@/modules/form/types/form";
import {revalidatePath} from 'next/cache';
import {v4 as uuidV4} from 'uuid';
import {FormSchema} from "@/modules/form/validators/form";
import prisma from "@/lib/prisma";
import {QueryArgs} from "@/modules/common/types/prisma";
import bcrypt from "bcryptjs";
import {loadControlsConfigFiles, loadControlsSchemaFiles} from "@/lib/control";
import {ComponentType} from "react";


/**
 * Create form
 *
 * @param form
 */
export async function createForm(form: Form) {
    const t = await getTranslations('Message');

    // delete unnecessary fields' properties
    if (!form.fields) {
        form.fields = [];
    }
    form.fields.forEach((field: Field, index: number) => {
        delete field.active;
        field.sort = index;
    });

    // validate fields' types
    const result = FormSchema.safeParse(form);
    if (!result.success) {
        throw new Error(t(result.error.errors[0].message));
    }

    // validate title's uniqueness
    const formWithTitle = await prisma.form.findFirst({where: {title: form.title}});
    if (formWithTitle) {
        throw new Error(t("Form with this title already exists"));
    }

    // create form and fields
    const createForm = {
        data: {
            uuid: uuidV4(),
            title: form.title,
            description: form.description,
            enabled: form.enabled,
            numberingStyle: form.numberingStyle,
            fields: {
                create: form.fields.map(field => ({
                    uuid: field.uuid,
                    title: field.title,
                    description: field.description,
                    regex: field.regex,
                    required: field.required,
                    config: field.config as any,
                    controlId: field.controlId,
                    controlName: field.controlName,
                    controlType: field.controlType,
                    sort: field.sort || 0
                }))
            }
        },
    };
    await prisma.form.create(createForm);

    // reset page cache
    revalidatePath('/dashboard/form');
    revalidatePath('/dashboard/form/create');
}

/**
 * Update form
 *
 * @param form
 */
export async function updateForm(form: Form) {
    // delete unnecessary fields' properties
    if (!form.fields) {
        form.fields = [];
    }
    form.fields.forEach((field: Field, index: number) => {
        delete field.active;
        field.sort = index;
    });

    // validate fields' types
    const result = FormSchema.safeParse(form);
    if (!result.success) {
        throw new Error(result.error.errors[0].message);
    }

    // validate title's uniqueness
    const formWithTitle = await prisma.form.findFirst({where: {title: form.title, id: {not: form.id}}});
    if (formWithTitle) {
        throw new Error("Form with this title already exists");
    }

    // query existed fields for comparison
    const existedFields = await prisma.formField.findMany({
        where: {formId: form.id},
        orderBy: {sort: 'asc'}
    });

    // 检测字段是否有变化
    const hasFieldChanges = detectFieldChanges(existedFields, form.fields);

    // 获取当前表单版本
    const currentForm = await prisma.form.findUnique({
        where: { id: form.id },
        select: { version: true }
    });

    const newVersion = hasFieldChanges ? (currentForm?.version || 1) + 1 : (currentForm?.version || 1);

    // update form (包含版本号更新)
    await prisma.form.update({
        data: {
            title: form.title,
            description: form.description,
            enabled: form.enabled,
            numberingStyle: form.numberingStyle,
            version: newVersion,
        },
        where: {
            id: form.id
        }
    });

    // 如果有字段变化，才进行字段的增删改操作
    if (hasFieldChanges) {
        // delete fields
        for (const existedField of existedFields) {
            const field = form.fields.find((field) => field.uuid === existedField.uuid);
            if (!field) {
                await prisma.formField.delete({where: {uuid: existedField.uuid}});
            }
        }

        // update and create fields
        for (const field of form.fields) {
            // if field is new
            if (!existedFields.find((existedField: {uuid: string}) => existedField.uuid === field.uuid)) {
                await prisma.formField.create({
                    data: {
                        uuid: field.uuid,
                        title: field.title,
                        description: field.description,
                        regex: field.regex,
                        required: field.required,
                        config: field.config as any,
                        controlId: field.controlId,
                        controlName: field.controlName,
                        controlType: field.controlType,
                        formId: form.id!,
                        sort: field.sort || 0
                    }
                });
            } else {
                await prisma.formField.update({
                    data: {
                        title: field.title,
                        description: field.description,
                        required: field.required,
                        config: field.config as any,
                        regex: field.regex,
                        sort: field.sort || 0
                    },
                    where: {
                        uuid: field.uuid
                    }
                });
            }
        }
    }

    // reset page cache
    revalidatePath('/dashboard/form');
    revalidatePath('/dashboard/form/' + form.id + '/[uuid]');
}

/**
 * 检测字段是否有变化
 * @param existedFields 数据库中现有的字段
 * @param newFields 提交的新字段
 * @returns boolean 是否有变化
 */
function detectFieldChanges(existedFields: any[], newFields: Field[]): boolean {
    // 1. 检查字段数量是否变化
    if (existedFields.length !== newFields.length) {
        return true;
    }

    // 2. 创建字段映射以便比较
    const existedFieldsMap = new Map();
    existedFields.forEach(field => {
        existedFieldsMap.set(field.uuid, field);
    });

    // 3. 检查每个新字段
    for (const newField of newFields) {
        const existedField = existedFieldsMap.get(newField.uuid);
        
        // 如果是新字段
        if (!existedField) {
            return true;
        }

        // 检查关键字段是否有变化
        if (
            existedField.title !== newField.title ||
            existedField.description !== newField.description ||
            existedField.regex !== newField.regex ||
            existedField.required !== newField.required ||
            existedField.controlId !== newField.controlId ||
            existedField.controlName !== newField.controlName ||
            existedField.controlType !== newField.controlType ||
            existedField.sort !== (newField.sort || 0) ||
            JSON.stringify(existedField.config) !== JSON.stringify(newField.config)
        ) {
            return true;
        }
    }

    // 4. 检查是否有字段被删除
    for (const existedField of existedFields) {
        const newField = newFields.find(field => field.uuid === existedField.uuid);
        if (!newField) {
            return true;
        }
    }

    return false;
}

/**
 * Delete forms
 *
 * @param ids
 */
export async function deleteForms(ids: number[]) {
    const t = await getTranslations('Message');

    for (const id of ids) {
        // validate if form id is existed
        const form = await prisma.form.findUnique({
            where: { id },
        });
        if (!form) {
            throw new Error("Form id does not exists");
        }

        // validate if form has submissions
        const formSubmission = await prisma.formSubmission.findFirst({
            where: { formId: id },
        });
        if (formSubmission) {
            throw new Error(t("Form has submissions"));
        }
    }

    // delete fields
    await prisma.formField.deleteMany({
        where: {
            formId: {
                in: ids
            }
        },
    });

    await prisma.form.deleteMany({
        where: {
            id: {
                in: ids
            }
        },
    });

    revalidatePath('/dashboard/form');
}

/**
 * Get forms
 *
 * @param args
 */
export async function getForms(args: QueryArgs = {}) {
    const hasSelect = args.select !== undefined;
    
    if (hasSelect) {
        // If select is used, add _count to the select object
        return prisma.form.findMany({
            ...args,
            select: {
                ...args.select,
                _count: {
                    select: {
                        submissions: true
                    }
                }
            }
        });
    } else {
        // If no select, use include as before
        return prisma.form.findMany({
            ...args,
            include: {
                ...(args.include || {}),
                _count: {
                    select: {
                        submissions: true
                    }
                }
            }
        });
    }
}

/**
 * Get form count
 *
 * @param args
 */
export async function getFormCount(args: object = {}) {
    return prisma.form.count(args);
}

/**
 * Get submissions (original function)
 *
 * @param args - Query arguments including pagination parameters
 */
export async function getSubmissions(args: QueryArgs = {}) {
    const hasSelect = args.select !== undefined;
    
    // Set default orderBy to id desc if not provided
    const defaultOrderBy = { id: 'desc' as const };
    const orderBy = args.orderBy || defaultOrderBy;
    
    if (hasSelect) {
        // If select is used, add form data to the select object
        return prisma.formSubmission.findMany({
            ...args,
            orderBy,
            select: {
                ...args.select,
            }
        });
    } else {
        // If no select, use include as before
        return prisma.formSubmission.findMany({
            ...args,
            orderBy,
            include: {
                ...(args.include || {})
            }
        });
    }
}

/**
 * Get submissions with pagination support
 *
 * @param args - Query arguments including pagination parameters
 */
export async function getSubmissionsWithPagination(args: QueryArgs = {}): Promise<PaginatedResult<any>> {
    const hasSelect = args.select !== undefined;
    
    // Set default orderBy to id desc if not provided
    const defaultOrderBy = { id: 'desc' as const };
    const orderBy = args.orderBy || defaultOrderBy;
    
    // 提取分页参数
    const page = Math.max(1, Math.floor((args.skip || 0) / (args.take || 10)) + 1);
    const pageSize = args.take || 10;
    const skip = args.skip || 0;
    
    // 构建查询条件（不包含分页参数）
    const queryConditions = {
        where: args.where,
        orderBy,
    };
    
    // 并行执行数据查询和总数查询
    const [data, total] = await Promise.all([
        // 获取分页数据
        hasSelect 
            ? prisma.formSubmission.findMany({
                ...queryConditions,
                skip,
                take: pageSize,
                select: {
                    ...args.select,
                }
            })
            : prisma.formSubmission.findMany({
                ...queryConditions,
                skip,
                take: pageSize,
                include: {
                    ...(args.include || {})
                }
            }),
        // 获取总数
        prisma.formSubmission.count({
            where: args.where
        })
    ]);
    
    // 计算分页信息
    const totalPages = Math.ceil(total / pageSize);
    
    return {
        data,
        pagination: {
            total,
            page,
            pageSize,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
}

/**
 * Get submissions count
 *
 * @param args - Query arguments for counting submissions
 */
export async function getSubmissionCount(args: QueryArgs = {}) {
    // Extract only the where clause for count operation
    const countArgs = args.where ? { where: args.where } : undefined;
    return prisma.formSubmission.count(countArgs);
}

/**
 * Get form submissions
 *
 * @param args
 */
export async function getFormSubmissions(args: object = {}) {
    return prisma.formSubmission.findMany(args);
}

/**
 * Get form submission count
 *
 * @param args
 */
export async function getFormSubmissionCount(args: object = {}) {
    return prisma.formSubmission.count(args);
}

/**
 * Get form by id
 *
 * @param id
 */
export async function getFormById(id: number) {
    return prisma.form.findFirst({
        where: {id},
        include: {
            fields: {
                orderBy: {
                    sort: 'asc',
                },
            }
        },
    });
}

/**
 * Get form by uuid
 *
 * @param uuid
 */
export async function getFormByUuid(uuid: string) {
    return prisma.form.findFirst({
        where: { uuid },
        include: {
            fields: {
                orderBy: {
                    sort: 'asc',
                },
            }
        },
    });
}


export async function createSubmission(submission: Submission) {
    // 获取当前表单的版本号
    const form = await prisma.form.findUnique({
        where: { id: submission.formId },
        select: { version: true }
    });

    if (!form) {
        throw new Error("Form not found");
    }

    // validate field values
    // let schema: z.ZodString | z.ZodEffects<z.ZodString, string, string> | z.ZodArray<any, "many"> | null = null
    //
    // submission.data.forEach((field:any) => {
    //     // validate values
    //     switch (field.controlId) {
    //         // input text
    //         case 1: {
    //             schema = z.string().max(field.config.maxLength).min(field.config.minLength);
    //             break;
    //         }
    //         // textarea
    //         case 2: {
    //             schema = z.string().max(field.config.maxLength).min(field.config.minLength);
    //             break;
    //         }
    //         // select
    //         case 3: {
    //             let enumValues = field.config.options.map((option: any) => option.val);
    //             enumValues = z.enum(enumValues);
    //             schema = z.array(enumValues);
    //             break;
    //         }
    //         // checkbox
    //         case 4: {
    //             let enumValues = field.config.options.map((option: any) => option.val);
    //             enumValues = z.enum(enumValues);
    //             schema = z.array(enumValues);
    //             break;
    //         }
    //         // radio
    //         case 5: {
    //             let enumValues = field.config.options.map((option: any) => option.val);
    //             enumValues = z.enum(enumValues);
    //             schema = z.string(enumValues);
    //             break;
    //         }
    //         // date
    //         case 6: {
    //             schema = z.string().refine(value => {
    //                 const parsedDate = parse(value, field.config.dateFormat, new Date());
    //                 return isValid(parsedDate);
    //             }, {
    //                 message: "Invalid date-time format. Expected format: " + field.config.dateFormat
    //             });
    //             break;
    //         }
    //         default:
    //             break;
    //     }
    //
    //     if (schema != null) {
    //         const result = schema.safeParse(field.value)
    //
    //         if (! result.success) {
    //             throw new Error(result.error.errors[0].message)
    //         }
    //     }
    // })

    // 创建提交记录，包含当前表单版本号
    const createSubmission = {
        data: {
            formId: submission.formId,
            data: submission.data as any,
            version: form.version, // 保存提交时的表单版本
        }
    };
    await prisma.formSubmission.create(createSubmission);

    revalidatePath('/form/' + submission.formId);
}

export  async function  getUserByArgs(args: object = {}) {
    return prisma.user.findFirst(args);
}


/**
 * query options
 * @param args
 */
export async function getOptionByArgs(args: object = {}) {
    return prisma.option.findFirst(args);
}

/**
 * update option
 * @param name
 * @param value
 */
export async function updateOption(name:string, value:string) {
    return prisma.option.update({
        where: {
            name: name,
        },
        data: {
            value: value
        },
    })
}

export async function getControlSchemas() {
    const jsonDirectory = path.join(process.cwd(), 'src', 'controls');
    return loadControlsSchemaFiles(jsonDirectory);
}

/**
 * Get control configs
 */
export async function getControlConfigs() {
    const jsonDirectory = path.join(process.cwd(), "src", "controls");
    return CommonService.loadControlsConfigFiles(jsonDirectory);
}

/**
 * Get field components
 * @param fields
 */
export async function getFieldComponents(fields: Field[]) {
    const components: { [key: string]: ComponentType<{ field: Field }> } = {};
    
    for (const field of fields) {
        if (field.controlType) {
            try {
                // Dynamically import the component module based on controlType
                const componentModule = await import(`@/controls/${field.controlType}/component`);
                
                // Store the component with field's uuid as key
                components[field.uuid] = componentModule.default;
            } catch (error) {
                console.error(`Error loading component for field ${field.uuid} with controlType ${field.controlType}:`, error);
            }
        }
    }
    
    return components;
}

/**
 * Get form with all fields and submissions by form id
 * 
 * @param id - The form id
 * @returns Form with fields and submissions, or null if not found
 */
export async function get(id: number) {
    return prisma.form.findFirst({
        where: { id },
        include: {
            fields: {
                orderBy: {
                    sort: 'asc',
                },
            },
        },
    });
}

// 使用示例：
// 
// // 获取第一页数据，每页10条
// const result = await getSubmissionsWithPagination({
//     skip: 0,
//     take: 10,
//     where: { formId: 1 },
//     include: { form: true }
// });
// 
// console.log('数据:', result.data);
// console.log('分页信息:', result.pagination);
// // 输出：
// // 分页信息: {
// //   total: 50,
// //   page: 1,
// //   pageSize: 10,
// //   totalPages: 5,
// //   hasNext: true,
// //   hasPrev: false
// // }
//
// // 获取第二页数据
// const page2 = await getSubmissionsWithPagination({
//     skip: 10,
//     take: 10,
//     where: { formId: 1 }
// });

/**
 * 数据迁移：为现有的提交记录设置版本号
 * 这个函数应该在部署后运行一次，为现有的提交记录设置版本号
 */
export async function migrateSubmissionVersions() {
    try {
        // 获取所有版本号为1的提交记录（默认版本）
        const submissions = await prisma.formSubmission.findMany({
            where: {
                version: 1 // 只处理默认版本
            },
            include: {
                form: {
                    select: { id: true, version: true }
                }
            }
        });

        console.log(`找到 ${submissions.length} 条需要迁移的提交记录`);

        // 为每个提交记录设置对应表单的当前版本号
        for (const submission of submissions) {
            await prisma.formSubmission.update({
                where: { id: submission.id },
                data: { version: (submission as any).form.version }
            });
        }

        console.log(`成功迁移 ${submissions.length} 条提交记录的版本号`);
        return { success: true, migratedCount: submissions.length };
    } catch (error) {
        console.error('迁移提交记录版本号失败:', error);
        return { success: false, error: error };
    }
}

