"use client";

import Block from "@/modules/common/components/shared/block";
import React from "react";
import Form from "./form";
import {Form as FormType} from "@/modules/form/types/form";
import { PluginSchema } from "@/lib/control";


export default function Index({form, schemas, components}: {
    form: FormType;
  schemas: PluginSchema[];
  components: { [key: string]: any };
}) {

  return (
    <div className="py-4 px-4 h-screen">
      <Block className="min-h-full mx-auto max-w-5xl">
        <h1 className="text-center font-bold text-xl py-4">{form.title}</h1>
        <Form form={form} schemas={schemas} components={components} />
      </Block>
    </div>
  );
}
