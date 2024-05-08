interface config {
    title: string;
    required: boolean;
    placeholder?: string;
    defaultValue?: any;
    length?: number;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    cols?: number;
    regex?: string;
    options?: object[];
    isMultiple?: boolean;
    [propName: string]: any;
}
interface component {
    id: number;
    name: string;
    config: config;
}

interface field {
    uuid: string;
    id: number;
    name: string;
    active: boolean;
    config: config;
}

const components: component[] = [
    {
        id: 1, name: "Input Text", config: {
            title: "Title",
            placeholder: "please type",
            maxLength: 20,
            minLength: 20,
            regex: "",
            required: true
        }
    },
    {
        id: 2, name: "Textarea", config: {
            title: "Title",
            placeholder: "please type",
            rows: 3,
            cols: 20,
            maxLength: 100,
            minLength: 0,
            required: false
        }
    },
    {
        id: 3, name: "Select", config: {
            title: "Title",
            options: [
                {"k": 0, "v": "choose one"},
            ],
            defaultValue: [0],
            required: false,
            isMultiple: false
        }
    },
    {
        id: 4, name: "Checkbox", config: {
            title: "Title",
            options: [
                {"k": 0, "v": "choose one"},
            ],
            defaultValue: [],
            required: false,
        }
    },
    {
        id: 5, name: "Radio", config: {
            title: "Title",
            options: [
                {"k": 0, "v": "choose one"},
            ],
            defaultValue: [],
            required: false,
        }
    }
];

let fields: field[] = [
    {
        uuid: "f3216f83-f6d8-4859-a388-aa7683a61251",
        id: 1,
        name: "Input Text",
        active: true,
        config: {
            title: "Title",
            placeholder: "please type",
            length: 20,
            maxLength: 20,
            minLength: 20,
            regex: "",
            required: true
        }
    },
];

export const initialData = {
    components: components,
    fields: fields,
    currentField: fields[0]
};
