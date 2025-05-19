"use client"

import React from "react";
import {Field} from "@/modules/form/types/form";


export default  function FormItem (props: { field: Field, index: number, component: any }) {

    return (
        <>
            <props.component field={props.field}/>
        </>
    )
}