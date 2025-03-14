'use server';

import path from "path";
import { CommonService } from "@/modules/common/services/common-service";
import {getTranslations} from 'next-intl/server';
import {Form, Field} from "@/modules/form/types/form";
import {revalidatePath} from 'next/cache';
import {v4 as uuidV4} from 'uuid';
import {FormSchema} from "@/modules/form/validators/form";

/**
 * Form service
 */
export class FormService {
    /**
     * Get control configs
     */
    static async getControlConfigs() {
        const jsonDirectory = path.join(process.cwd(), "src", "controls");
        return CommonService.loadControlsConfigFiles(jsonDirectory);
    }

    static async createForm(form: Form) {
        const t = await getTranslations('Message');

        // delete unnecessary fields' properties
        if (! form.fields) {
            form.fields = []
        }
        form.fields.forEach((field: Field, index:any) => {
            delete field.active
            field.sort = index
        })

        // validate fields' types
        const result = FormSchema.safeParse(form)
        if (! result.success) {
            throw new Error(t(result.error.errors[0].message))
        }

        // validate title's uniqueness
        const formWithTitle = await prisma.form.findFirst({where: {title: form.title}})
        if (formWithTitle) {
            throw new Error(t("Form with this title already exists"))
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
        }
        // console.log(createForm)
        await prisma.form.create(createForm);

        // reset page cache
        revalidatePath('/dashboard/form');
        revalidatePath('/dashboard/form/create');
    }

    static async updateForm(form: Form) {
        // delete unnecessary fields' properties
        if (! form.fields) {
            form.fields = []
        }
        form.fields.forEach((field: Field, index:any) => {
            delete field.active
            field.sort = index
        })

        console.log(form.fields)

        // validate fields' types
        const result = FormSchema.safeParse(form)
        if (! result.success) {
            throw new Error(result.error.errors[0].message)
        }


        // validate title's uniqueness
        const formWithTitle = await prisma.form.findFirst({where: {title: form.title, id: {not: form.id}}})
        if (formWithTitle) {
            throw new Error("Form with this title already exists")
        }

        // update form
        const updateForm = {
            data: {
                title: form.title,
                description: form.description,
                enabled: form.enabled,
                numberingStyle: form.numberingStyle,
            },
            where: {
                id: form.id
            }
        }
        await prisma.form.update(updateForm);

        // query existed fields
        const existedFields = await prisma.field.findMany({where: {formId: form.id}})

        // delete fields
        for (const existedField of existedFields) {
            const field = form.fields.find((field) => field.uuid === existedField.uuid)
            if (! field) {
                await prisma.field.delete({where: {uuid: existedField.uuid}})
            }
        }

        // update and create fields
        for (const field of form.fields) {
            // if field is new
            if (! existedFields.find((existedField) => existedField.uuid === field.uuid)) {
                const createField: any = {
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
                }
                await prisma.field.create(createField);
            } else {
                const updateField:any = {
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
                }
                await prisma.field.update(updateField);
            }
        }

        // reset page cache
        revalidatePath('/dashboard/form');
        revalidatePath('/dashboard/form/' + form.id + '/edit');
    }

    static async deleteForms(ids: number[]) {
        const t = await getTranslations('Message');

        for (const id of ids) {
            // validate if form id is existed
            let form = await prisma.form.findUnique({
                where: {
                    id: id,
                },
            })
            if (! form) {
                throw new Error("Form id does not exists")
            }

            // validate if form has submissions
            let formSubmission = await prisma.formSubmission.findFirst({
                where: {
                    formId: id,
                },
            })
            if (formSubmission) {
                throw new Error(t("Form has submissions"))
            }
        }

        // delete fields
        await prisma.field.deleteMany({
            where: {
                formId: {
                    in: ids
                }
            },
        })


        await prisma.form.deleteMany({
            where: {
                id: {
                    in: ids
                }
            },
        });

        revalidatePath('/dashboard/form');
    }

    static async getForms(args: object = {}) {
        return prisma.form.findMany(args);
    }

    static async getFormCount(args: object = {}) {
        return prisma.form.count(args);
    }

    static async getFormSubmissions(args: object = {}) {
        return prisma.formSubmission.findMany(args);
    }

    static async getFormSubmissionCount(args: object = {}) {
        return prisma.formSubmission.count(args);
    }

    static async getFormById(id: number) {
        return prisma.form.findFirst({
            where: {id: id},
            include: {
                fields: {
                    orderBy: {
                        sort: 'asc',
                    },
                }
            },
        });
    }
}
