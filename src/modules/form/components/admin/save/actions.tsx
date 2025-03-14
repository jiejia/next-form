import { Button } from "@heroui/react";
import React, { useState } from "react";
import { Form, Field } from "@/modules/form/types/form";
import { FormService } from "@/modules/form/services/form-service";
import { CommonService } from "@/modules/common/services/common-service";
import { useTranslations } from "next-intl";
import { notFound, useRouter, usePathname } from "next/navigation";

export default function Actions({
  form,
  fields,
}: {
  form: Form;
  fields: Field[];
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const t = useTranslations("Dashboard");
  const router = useRouter();

  // handle submit form
  const handleSubmitSaveForm = async (e: any) => {
    // validate form form
    const formForm = document.getElementById("form-form") as HTMLFormElement;
    if (formForm) {
      // 手动触发提交事件
      if (!formForm.checkValidity()) {
        return;
      }
    }

    // validate property
    const propertyForm = document.getElementById(
      "property-form"
    ) as HTMLFormElement;
    if (propertyForm) {
      // 手动触发提交事件
      if (!propertyForm.checkValidity()) {
        return;
      }
    }

    setIsDisabled(!isDisabled);
    form.fields = fields;

    if (!form.id) {
      // create form
      try {
        await FormService.createForm(form);
        CommonService.notify(t("Form created successfully"), "success");
        router.push("/dashboard/form");
      } catch (error) {
        if (error instanceof Error) {
          CommonService.notify(error.message, "error");
        } else {
          CommonService.notify(t("An unknown error occurred"), "error");
        }
      }
    } else {
      // update form
      try {
        await FormService.updateForm(form);
        CommonService.notify(t("Form updated successfully"), "success");
        router.push("/dashboard/form");
      } catch (error) {
        if (error instanceof Error) {
          CommonService.notify(error.message, "error");
        } else {
          CommonService.notify(t("An unknown error occurred"), "error");
        }
      }
    }

    setIsDisabled(false);
  };

  return (
    <>
      <Button color="primary" size="sm" variant="shadow" radius="sm">
        Create
      </Button>{" "}
      <Button color="primary" radius="sm" size="sm" variant="flat">
        Reset
      </Button>
    </>
  );
}
