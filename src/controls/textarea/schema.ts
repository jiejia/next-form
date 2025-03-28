"use server";

import {z} from "zod";

export async function createSchema(field:any) {
    return z.string().max(field.config.maxLength).min(field.config.minLength);
}