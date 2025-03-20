export type WhereArgs = {
    title: Contain;
    OR: Array<{enabled: boolean}>;
}

export type Contain = {
    contains: string
}

export type PageArgs = {
    page: number,
    perPage: number,
    items: object[],
    count: number,
    keyword: string,
    sort: string
    status: number[]
}