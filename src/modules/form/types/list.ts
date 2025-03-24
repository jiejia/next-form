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

// Type for Prisma form result with count
export type PrismaFormResult =  {
    id: number;
    uuid: string;
    title: string;
    description: string;
    enabled: boolean;
    numberingStyle: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: {
        submissions: number;
    };
}

// Type for form rows with submissions count
export type FormWithSubmissions = {
    id: number;
    uuid: string;
    title: string;
    description: string;
    numberingStyle: number;
    createdAt: string;
    updatedAt: Date;
    deletedAt: Date | null;
    enabled: string;
    submissions: number;
}