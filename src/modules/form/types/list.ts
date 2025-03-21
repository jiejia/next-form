export type WhereArgs = {
    title: Contain;
    description?: Contain;
    OR: Array<{enabled: boolean}>;
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
    submissions?: {
        gte?: number;
        lte?: number;
    };
}

export type Contain = {
    contains: string
}

export type PageArgs<T = object> = {
    page: number,
    perPage: number,
    items: T[],
    count: number,
    keyword: string,
    sort: string,
    status: number[],
    submissionMin: number,
    submissionMax: number,
    dateFrom: string,
    dateTo: string
}