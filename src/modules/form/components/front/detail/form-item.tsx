"use client"

import React from "react";
import dynamic from 'next/dynamic';
import {Field} from "@/modules/form/types/form";

interface ControlComponentProps {
    field: Field;
}

export default  function FormItem (props: { field: Field, index: number, component: any }) {

    return (
        <>
            <props.component field={props.field}/>
        </>
    )
}