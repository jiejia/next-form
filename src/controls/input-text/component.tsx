"use client"

import {Input} from "@heroui/react";
import React from "react";

export default  function Component(props: { field: any }) {

    const handleTextChange = (e:any) => {
        props.field.value = e.target.value;
    }

    return (
        <>
            <Input
                type="text" aria-label={props.field.title}
                placeholder={props.field.config.placeholder != '' ? props.field.config.placeholder : props.field.title}
                labelPlacement="outside" name={props.field.uuid} onChange={handleTextChange} value={props.field.value} isRequired={props.field.required} required={props.field.required}
            />
        </>
    );
}