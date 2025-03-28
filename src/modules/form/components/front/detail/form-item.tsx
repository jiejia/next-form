"use client"

import React from "react";
import dynamic from 'next/dynamic';

interface ControlComponentProps {
    field: any;
}

export default async function FormItem (props: { field: any, index: any }) {

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