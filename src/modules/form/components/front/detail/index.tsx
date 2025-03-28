"use client"

import Block from "@/modules/common/components/shared/block";
import React, {useState, useEffect} from "react";
import {FormService} from "@/modules/form/services/form-service";


export default function Index({uuid}: {uuid:string }) {

    useEffect(() => {
        init();
    }, []);

    const [form, setForm] = useState<any>({
        title: "Loading..."
    });

    const init = async () => {
        const form = await FormService.getFormByUuid(uuid);
        if (form) {
            setForm(form);
        } else {
        }
    }


    return (
        <div className="py-4 px-4 h-screen">
            <Block className="min-h-full mx-auto max-w-5xl">
                <div>{form.title}</div>
            </Block>
        </div>
    );
}