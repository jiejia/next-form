"use server";

import {z} from "zod";
import {isValid, parse} from "date-fns";
import {useTranslations} from "next-intl";

export async function createSchema(field:any) {
    const t = useTranslations('Front');

    return z.string().refine(value => {
        const parsedDate = parse(value, field.config.dateFormat, new Date());
        return isValid(parsedDate);
    }, {
        message: t("Invalid date-time format. Expected format: ") + field.config.dateFormat
    });
}