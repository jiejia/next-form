"use client";

import FormItem from "./form-item";
import { Button } from "@heroui/react";
import React, {ComponentType, useEffect} from "react";
import { FormService } from "@/modules/form/services/form-service";
import { notify } from "@/modules/common/components/front/notify";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PluginSchema } from "@/lib/control";
import {Form as FormType, Field, Submission} from "@/modules/form/types/form";


interface FormProps {
  form: FormType;
  schemas: PluginSchema[];
  components: {[key: string]: ComponentType<{ field: Field }>}
}


export default function Form(props: FormProps) {
  const t = useTranslations("Front");

  const [validationFunctions, setValidationFunctions] = useState<
    PluginSchema[]
  >([]);
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

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // validate form
    const form = document.getElementById("form") as HTMLFormElement;
    if (form) {
      // Manual validation
      if (!form.checkValidity()) {
        return;
      }
    }

    setIsDisabled(true);
    console.log(form);

    // Uncomment and fix the rest of your form submission logic as needed
    // without using async/await inside the client component
    

    // get and validate field values
    const data: object[] = [];
    const fieldErrors: string[] = [];
    props.form.fields?.map((field: Field) => {
      // validate values' requisite
      if (field.required) {
        if (field.value == undefined || field.value == "") {
          fieldErrors.push(t("Please fill in the") + field.title);
        }
      }

      // // get schema function from schemas
      // const schemaObj = props.schemas.find(
      //   (obj: PluginSchema) => obj.pluginName === field.controlType
      // );
      //
      // const schemaPromise = schemaObj
      //   ? schemaObj.createSchema(field)
      //   : Promise.resolve(null);
      // console.log("schemaPromise is", schemaPromise);
      //
      // return schemaPromise.then((schema: any) => {
      //   data.push({
      //     title: field.title,
      //     value: field.value,
      //     controlId: field.controlId,
      //     fieldId: field.id,
      //   });
      //
      //   console.log("schema is", schema);
      //
      //   if (schema != null) {
      //     try {
      //       const result = schema.safeParse(field.value);
      //       console.log(schema);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //     // if (! result.success) {
      //     //     fieldErrors.push(result.error.errors[0].message)
      //     // }
      //   }
      // });

          data.push({
            title: field.title,
            value: field.value,
            controlId: field.controlId,
            fieldId: field.id,
          });
    });

    if (fieldErrors.length > 0) {
      notify(fieldErrors[0], "danger");
      setIsDisabled(false);
      return;
    }

    const submission = {
      formId: props.form.id,
      data: data,
    };

    FormService.createSubmission(submission as Submission)
      .then(() => {
        notify("提交成功", "success");
        // 只有在成功后的延迟刷新时，不重置按钮状态
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // reset form
      })
      .catch((error) => {
        if (error instanceof Error) {
          notify(error.message, "danger");
        } else {
          notify("An unknown error occurred", "danger");
        }
        // 在出错时立即重置按钮状态
        setIsDisabled(false);
      });
  };

  const handleResetForm = () => {};

  const getNumberingStyle = (numberingStyle: number, index: number) => {
    if (numberingStyle == 0) {
      return <span>&nbsp;</span>;
    } else if (numberingStyle == 1) {
      return <span>{index + 1}.</span>;
    }
  };

  return (
    <>
      <form id="form">
        <ul className="grid grid-flow-row gap-y-6">
          {props.form?.fields?.map((field, index) => (
            <li key={index} className="grid grid-flow-row gap-y-3">
              <label className="text-base" htmlFor={field.uuid}>
                {getNumberingStyle(props.form.numberingStyle, index)}{" "}
                {field.title}{" "}
                {field.required ? (
                  <span className="text-red-400">*</span>
                ) : (
                  <></>
                )}
              </label>
              <FormItem field={field} index={index} component={props.components[field.uuid]} />
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-flow-col gap-x-2">
          <Button
              type="button"
              color="primary"
            variant="shadow"
            onClick={handleSubmitForm}
            isDisabled={isDisabled}
          >
            {t("Submit")}
          </Button>
          <Button color="primary" variant="flat" onClick={handleResetForm}>
            {t("Reset")}
          </Button>
        </div>
      </form>
    </>
  );
}
