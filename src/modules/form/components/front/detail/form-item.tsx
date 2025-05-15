"use client"

import React from "react";
import dynamic from 'next/dynamic';
import {Field} from "@/modules/form/types/form";

interface ControlComponentProps {
    field: Field;
}

export default  function FormItem (props: { field: Field, index: number }) {

    const ControlComponent = dynamic<ControlComponentProps>(() =>
        import('@/controls/' + props.field.controlType + '/component'), {
        loading: () => <></>,
    });

    return (
        <>
            <ControlComponent field={props.field}/>
        </>
    )
}