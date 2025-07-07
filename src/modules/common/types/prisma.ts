import {SearchConditions} from "@/modules/form/types/form";

export type QueryArgs = {
    select?: Record<string, boolean>;
    include?: Record<string, boolean | object>;
    where?: SearchConditions;
    orderBy?: Record<string, string> | Array<Record<string, string>>;
    skip?: number;
    take?: number;
};