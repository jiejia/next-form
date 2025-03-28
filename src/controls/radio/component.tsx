"use client"


import React from "react";
import {Radio, RadioGroup} from "@nextui-org/radio";

export default  function Component(props: { field: any }) {

    const handleRadioChange = (value: string) => {
        props.field.value = value
    }

    return (
        <>
            <RadioGroup orientation="horizontal" onValueChange={handleRadioChange}  value={props.field.value} isRequired={props.field.required}  name={props.field.uuid}
            >
                {
                    props.field.config.options.map((option:any, k:any) => (
                        <Radio value={option.val} key={k} aria-label={props.field.title}>{option.val}</Radio>
                    ))
                }
            </RadioGroup>
        </>
    );
}