"use client"

import React from "react";
import {Select, SelectItem} from "@heroui/react";

export default  function Component(props: { field: any }) {

    const handleSelectChange = (e:any) => {
        props.field.value = e.target.value.split(',');
    }

    return (
        <>
            <Select aria-label={props.field.title}
                    className="max-w-full"
                    placeholder={props.field.config.placeholder != '' ? props.field.config.placeholder : props.field.title} isRequired={props.field.required} required={props.field.required}
                    onChange={handleSelectChange}  value={props.field.value}
                    selectionMode={props.field.config.isMultiple ? 'multiple' : 'single'}
                    name={props.field.uuid}
            >
                {
                    props.field.config.options.map((option:any, k:any) => (
                        <SelectItem key={option.val}>
                            {option.val}
                        </SelectItem>
                    ))
                }
            </Select>
        </>
    );
}