export interface Config {
    placeholder?: string;
    defaultValue?: any;
    length?: number;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    cols?: number;
    options?: object[];
    isMultiple?: boolean;
    dateFormat?: string;
    title: string;
    [propName: string]: any;
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
    data: object[];
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
