import {v4 as uuidV4} from 'uuid';

import {Field, Form} from "@/types/form"

const fields: Field[] = [
    {
        uuid: uuidV4(),
        controlId: 1,
        controlName: "Input Text",
        controlType: "input-text",
        active: true,
        title: "请输入题目标题",
        description: "请输入描述",
        regex: "",
        required: true,
        config: {
            placeholder: "please type",
            length: 255,
            maxLength: 255,
            minLength: 0,
            title: ""
        }
    }
];

const form: Form = {
    title: "",
    description: "",
    enabled: true,
    numberingStyle: 1
}

export const formData = {
    fields: fields,
    currentField: fields[0],
    form : form
};
