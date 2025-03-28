"use client"

import React from "react";
import {Textarea} from "@nextui-org/react";

export default  function Component(props: { field: any }) {

    const handleTextAreaChange = (e:any) => {
        props.field.value = e.target.value;
    }

    return (
        <>
            <Textarea aria-label={props.field.title}
                      placeholder={props.field.config.placeholder != '' ? props.field.config.placeholder : props.field.title}
                      className="max-w-full" name={props.field.uuid} onChange={handleTextAreaChange} value={props.field.value} isRequired={props.field.required} required={props.field.required}
            />
        </>
    );
}