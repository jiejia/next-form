"use server";


import {z} from "zod";

export async function createSchema(field:any) {
    let enumValues = field.config.options.map((option: any) => option.val);
    enumValues = z.enum(enumValues);
    return z.array(enumValues);
}