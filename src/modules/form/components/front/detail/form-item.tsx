"use client"

import React, { ComponentType } from "react";
import {Field} from "@/modules/form/types/form";


export default  function FormItem (props: { field: Field, index: number, component: ComponentType<{ field: Field }> }) {

    return (
        <>
            <props.component field={props.field}/>
        </>
    )
}