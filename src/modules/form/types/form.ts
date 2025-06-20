export interface Config {
    placeholder?: string;
    defaultValue?: unknown;
    length?: number;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    cols?: number;
    options?: object[];
    isMultiple?: boolean;
    dateFormat?: string;
    title?: string;
    [propName: string]: unknown;
}

export interface Control {
    id: number;
    name: string;
    type: string;
    required: boolean;
    config: Config;
    icon: string;
}

export interface Field {
    id?: number;
    uuid: string;
    title: string;
    description: string;
    regex: string;
    required: boolean;
    published?: boolean;
    config: Config;
    formId?: number;
    controlId: number;
    controlName: string;
    controlType: string;
    active?: boolean;
    sort?: number;
    value?: unknown;
}

export interface Form {
    id?: number;
    title: string;
    description: string;
    enabled: boolean;
    numberingStyle: number;
    fields?: Field[];
}

export interface Submission {
    id?: number;
    formId: number;
    data: SubmissionData[];
    createdAt: Date;
    version?: number;
}

export interface SubmissionData {
    title: string;
    value: unknown;
    controlId: number;
    fieldId: number;
}

export interface InitialData {
    fields: Field[],
    currentField: Field,
    form : Form
}

export interface DraggableItem {
    id: number;
    area: string;
}

// 分页相关类型定义
export interface PaginationMeta {
    total: number;          // 总记录数
    page: number;           // 当前页码（从1开始）
    pageSize: number;       // 每页记录数
    totalPages: number;     // 总页数
    hasNext: boolean;       // 是否有下一页
    hasPrev: boolean;       // 是否有上一页
}

export interface PaginatedResult<T> {
    data: T[];              // 数据列表
    pagination: PaginationMeta;  // 分页信息
}
