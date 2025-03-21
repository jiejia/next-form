export type QueryArgs = {
    select?: Record<string, boolean>;
    include?: Record<string, boolean | object>;
    where?: Record<string, unknown>;
    orderBy?: Record<string, string> | Array<Record<string, string>>;
    skip?: number;
    take?: number;
};