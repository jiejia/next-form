import {z} from "zod";

export const FormSchema = z.object({
    title: z.string().min(1, { message: "Form title can not be empty" }).max(255, { message: "Form title can be up to 255 characters" }),
    description: z.string().max(255),
    enabled: z.boolean(),
    numberingStyle: z.number().int(),
    fields: z.array(z.object({
        uuid: z.string().length(36),
        title: z.string(),
        description: z.string(),
        required: z.boolean(),
        config: z.object({}),
        controlId: z.number().int(),
        controlName: z.string(),
        controlType: z.string(),
        sort: z.number().int(),
    }))
});