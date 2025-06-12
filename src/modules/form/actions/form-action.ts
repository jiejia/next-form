'use server';

import path from "path";
import { CommonService } from "@/modules/common/services/common-service";
import {getTranslations} from 'next-intl/server';
import {Form, Field, Submission} from "@/modules/form/types/form";
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
                create: form.fields
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

    // update form
    await prisma.form.update({
        data: {
            title: form.title,
            description: form.description,
            enabled: form.enabled,
            numberingStyle: form.numberingStyle,
        },
        where: {
            id: form.id
        }
    });

    // query existed fields
    const existedFields = await prisma.formField.findMany({where: {formId: form.id}});

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
                    config: field.config,
                    controlId: field.controlId,
                    controlName: field.controlName,
                    controlType: field.controlType,
                    formId: form.id,
                    sort: field.sort
                }
            });
        } else {
            await prisma.formField.update({
                data: {
                    title: field.title,
                    description: field.description,
                    required: field.required,
                    config: field.config,
                    regex: field.regex,
                    sort: field.sort
                },
                where: {
                    uuid: field.uuid
                }
            });
        }
    }

    // reset page cache
    revalidatePath('/dashboard/form');
    revalidatePath('/dashboard/form/' + form.id + '/[uuid]');
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


export async function createSubmission(submission:Submission) {
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




    const createSubmission = {
        data: {
            formId: submission.formId,
            data: submission.data,
        }
    }
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