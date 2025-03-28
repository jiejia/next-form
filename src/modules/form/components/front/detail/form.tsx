"use client"

import FormItem from "./form-item";
import {Button} from "@heroui/react";
import React, {useEffect} from "react";
import {FormService} from "@/modules/form/services/form-service";
import {notify} from "@/modules/common/components/front/notify";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {PluginSchema} from "@/lib/control";

export default function Form (props: { form: any, schemas: any}) {
    const t = useTranslations('Front');

    const [validationFunctions, setValidationFunctions] = useState<PluginSchema[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // const getSchema = async () => {
        //     const schemas = await getControlSchemas()
        //     setValidationFunctions(schemas)
        //     console.log(validationFunctions)
        // }
        // getSchema()
        console.log(props.schemas, "schemas");
    }, []);


    const handleSubmitForm = async (e: any) => {
        // validate form form
        const form = document.getElementById("form") as HTMLFormElement;
        if (form) {
            // 手动触发提交事件
            if(! form.checkValidity()) {
                return
            }
        }

        setIsDisabled(!isDisabled)

        // get and validate field values
        let data: object[] = [];
        let fieldErrors: string[] = [];
        props.form.fields.map( (field: any, index: any) => {
            // validate values' requisitelet schema = schemaObj ? await schemaObj.createSchema() : null;
            if (field.required) {
                if (field.value == undefined || field.value == '') {
                    fieldErrors.push(t("Please fill in the") + field.title)
                }
            }

            // get schema function from schemas
            let schemaObj = props.schemas.find((obj: PluginSchema) => obj.pluginName === field.controlType)

            let schemaPromise = schemaObj ? schemaObj.createSchema(field) : Promise.resolve(null);
            console.log("schemaPromise is", schemaPromise)


            return schemaPromise.then((schema: any) => {
                data.push({
                    title: field.title,
                    value: field.value,
                    controlId: field.controlId,
                    fieldId: field.id,
                });

                console.log("schema is", schema)

                if (schema != null) {
                    try {
                        const result = schema.safeParse(field.value)
                        console.log(schema)
                    } catch (error) {
                        console.log(error)
                    }
                    // if (! result.success) {
                    //     fieldErrors.push(result.error.errors[0].message)
                    // }
                }
            });
        })


        if (fieldErrors.length > 0) {
            notify(fieldErrors[0], 'error')
            setIsDisabled(false)
            return
        }

        let submission = {
            formId: props.form.id,
            data: data,
        }

        try {
            await FormService.createSubmission(submission);
            // router.push('/form/' + props.form.id)
            notify("提交成功", 'success')
            window.location.reload()
        } catch (error) {
            if (error instanceof Error) {
                notify(error.message, 'danger')
            } else {
                notify('An unknown error occurred', 'danger')
            }
        }

        setIsDisabled(false)

    }

    const handleResetForm = (e: any) => {

    }

    const  getNumberingStyle = (numberingStyle:number, index:number) => {
        if (numberingStyle == 0) {
            return <span>&nbsp;</span>
        } else if (numberingStyle == 1) {
            return <span>{index + 1}.</span>
        }
    }

    return (
        <>
            <form id="form">
                <ul className="grid grid-flow-row gap-y-6">
                    {
                        props.form.fields.map((field: any, index: any) =>
                            <li key={index} className="grid grid-flow-row gap-y-3">
                                <label className="text-base" htmlFor={field.uuid}>{getNumberingStyle(props.form.numberingStyle, index)} {field.title} {field.required ? <span className="text-red-400">*</span> : <></>}</label>
                                <FormItem field={field} index={index}/>
                            </li>
                        )
                    }
                </ul>
                <div className="mt-8 grid grid-flow-col gap-x-2">
                    <Button color="primary" variant="shadow" onClick={handleSubmitForm} isDisabled={isDisabled}>
                        {t('Submit')}
                    </Button>
                    <Button color="primary" variant="flat" onClick={handleResetForm}>
                        {t('Reset')}
                    </Button>
                </div>
            </form>
        </>
    )
}

