"use client"


import {CalendarDate, DatePicker} from "@heroui/react";
import React from "react";
import {CalendarDateTime, ZonedDateTime} from "@internationalized/date";

export default  function Component(props: { field: any }) {

    const handleDateChange = (value: ZonedDateTime | CalendarDate | CalendarDateTime) => {
        props.field.value = value.toString();
    }

    return (
        <>
            <DatePicker aria-label={props.field.title} className="max-w-full" onChange={handleDateChange} value={props.field.value} isRequired={props.field.required}  name={props.field.uuid}/>
        </>
    );
}