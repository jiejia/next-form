"use client"

import {Checkbox} from "@heroui/react";
import React from "react";
import {CheckboxGroup} from "@heroui/checkbox";

export default  function Component(props: { field: any }) {

    const handleCheckboxChange = (value: string[]) => {
        props.field.value = value
    }

    return (
        <>
            <CheckboxGroup
                defaultValue={[]}
                orientation="horizontal"
                onChange={handleCheckboxChange}  value={props.field.value} isRequired={props.field.required}
                name={props.field.uuid}
            >
                {
                    props.field.config.options.map((option:any, k:any) => (
                        <Checkbox value={option.val} key={k} aria-label={props.field.title}>{option.val}</Checkbox>
                    ))
                }
            </CheckboxGroup>
        </>
    );
}