import {
  cn,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import React from "react";
import type { Form } from "@/types/form";

export default function Form({
  form,
  setForm,
}: {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}) {
  const handleTitleChange = (e: any) => {
    setForm({
      ...form,
      title: e.currentTarget.value,
    });
  };

  const handleDescriptionChange = (e: any) => {
    setForm({
      ...form,
      description: e.currentTarget.value,
    });
  };

  const handleNumberingStyleChange = (e: any) => {
    setForm({
      ...form,
      numberingStyle: parseInt(e.target.value),
    });
    console.log(form);
  };

  const handleEnabledChange = (e: any) => {
    setForm({
      ...form,
      enabled: e.currentTarget.checked,
    });
  };

  return (
    <div className="grid grid-flow-row gap-3 content-start">
      <Input
        isRequired
        type="text"
        label="Title"
        placeholder=" "
        className="max-w-full"
        size="sm"
        value={form.title}
        onChange={handleTitleChange}
      />
      <Textarea
        label="Description"
        placeholder=" "
        className="max-w-full"
        size="sm"
        value={form.description}
        onChange={handleDescriptionChange}
      />
      <Select
        label="Sequential numbering style"
        placeholder=""
        className="max-w-full"
        selectedKeys={[form.numberingStyle.toString()]}
        onChange={handleNumberingStyleChange}
      >
        <SelectItem key={0} value={0}>
          None
        </SelectItem>
        <SelectItem key={1} value={1}>
          Arabic numerals
        </SelectItem>
      </Select>
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content2 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 px-3 py-3 border-2 border-transparent",
            "data-[selected=true]:border-primary max-w-full"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            //selected
            "group-data-[selected=true]:ml-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4"
          ),
        }}
        size="md"
        isSelected={form.enabled}
        onChange={handleEnabledChange}
      >
        <div className="flex flex-col gap-1">
          <p className="text-tiny text-default-600">Required</p>
        </div>
      </Switch>
    </div>
  );
}
