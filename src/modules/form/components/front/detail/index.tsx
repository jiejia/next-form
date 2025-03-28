"use client"

import Block from "@/modules/common/components/shared/block";
import React, {useState, useEffect} from "react";
import {FormService} from "@/modules/form/services/form-service";
import Form from "./form";


export default function Index({uuid}: {uuid:string }) {

    useEffect(() => {
        init();
    }, []);

    const [form, setForm] = useState<any>({
        title: "Loading..."
    });
    const [schemas, setSchemas] = useState<any>([]);

    const init = async () => {
        const form = await FormService.getFormByUuid(uuid);
        const schemas = await FormService.getControlSchemas();
        setSchemas(schemas)
        if (form) {
            setForm(form);
        } else {

        }
    }


    return (
        <div className="py-4 px-4 h-screen">
            <Block className="min-h-full mx-auto max-w-5xl">
                <h1 className="text-center font-bold text-xl py-4">{form.title}</h1>
                <Form form={form} schemas={schemas}/>
            </Block>
        </div>
    );
}