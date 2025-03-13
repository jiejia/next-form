import React, { ChangeEvent } from "react";
import type { Field } from "@/modules/form/types/form";
import { Slider, Input, Button, Checkbox, Switch, cn } from "@heroui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface FieldOption {
  val: string;
  selected: boolean;
}

export default function Property({
  currentField,
  setCurrentField,
  fields,
  setFields,
}: {
  currentField: Field;
  setCurrentField: (field: Field) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
}) {
  const t = useTranslations("Dashboard");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.title = e.currentTarget.value;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.description = e.target.value;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      description: e.target.value,
    });
  };

  const handleRegexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.regex = e.target.value;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      regex: e.target.value,
    });
  };

  const handlePlaceholderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.placeholder = e.currentTarget.value;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        placeholder: e.target.value,
      },
    });
  };
  const handleDefaultValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.defaultValue = e.currentTarget.value;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        defaultValue: e.target.value,
      },
    });
  };

  const handleRequiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.required = e.currentTarget.checked;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      required: e.currentTarget.checked,
    });
  };

  const handleLengthChange = (value: number | number[]) => {
    const uuid = currentField.uuid;
    const numValue = Array.isArray(value) ? value[0] : value;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.length = numValue;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        length: numValue,
      },
    });
  };

  const handleRowsChange = (value: number | number[]) => {
    const uuid = currentField.uuid;
    const numValue = Array.isArray(value) ? value[0] : value;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.rows = numValue;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        rows: numValue,
      },
    });
  };

  const handleColsChange = (value: number | number[]) => {
    const uuid = currentField.uuid;
    const numValue = Array.isArray(value) ? value[0] : value;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.cols = numValue;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        cols: numValue,
      },
    });
  };

  const handleLengthRangeChange = (value: number | number[]) => {
    const uuid = currentField.uuid;
    const [min, max] = Array.isArray(value) ? value : [value, value];

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.minLength = min;
        item.config.maxLength = max;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        minLength: min,
        maxLength: max,
      },
    });
  };

  const handleIsMultipleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid) {
        item.config.isMultiple = e.currentTarget.checked;
      }
    });

    setFields(fields);

    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        isMultiple: e.currentTarget.checked,
      },
    });
  };

  const handleOptionAddClick = (index: number) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid && item.config.options !== undefined) {
        item.config.options.splice(index + 1, 0, {
          val: "option",
          selected: false,
        });

        setCurrentField({
          ...currentField,
          config: {
            ...currentField.config,
            options: item.config.options,
          },
        });
      }
    });

    setFields(fields);

    console.log(currentField.config.options);
  };

  const handleOptionCheckClick = (key: number) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid && item.config.options !== undefined) {
        const options = item.config.options as FieldOption[];
        options.forEach((option, index) => {
          if (index === key) {
            options[index].selected = !options[index].selected;
          }
        });

        setCurrentField({
          ...currentField,
          config: {
            ...currentField.config,
            options: options,
          },
        });
      }
    });

    setFields(fields);

    console.log(currentField.config.options);
  };

  const handleOptionValChange = (
    key: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid && item.config.options !== undefined) {
        const options = item.config.options as FieldOption[];
        options.forEach((option, index) => {
          if (index === key) {
            options[index].val = e.target.value;
          }
        });

        setCurrentField({
          ...currentField,
          config: {
            ...currentField.config,
            options: options,
          },
        });
      }
    });

    setFields(fields);

    console.log(currentField.config.options);
  };

  const handleOptionRemoveClick = (key: number) => {
    const uuid = currentField.uuid;

    fields.forEach((item: Field) => {
      if (item.uuid == uuid && item.config.options !== undefined) {
        // remove option from options
        const options = item.config.options as FieldOption[];
        options.forEach((option, index) => {
          if (index === key) {
            options.splice(index, 1);
          }
        });

        // setState
        setCurrentField({
          ...currentField,
          config: {
            ...currentField.config,
            options: options,
          },
        });
        console.log("remove");
      }
    });

    setFields(fields);

    // console.log(currentField.config.options)
  };

  return (
    <div className="grid grid-flow-row gap-3 content-start">
      <form className="grid grid-flow-row-dense gap-4">
        <Input
          isRequired
          isReadOnly
          label="UUID"
          value={currentField.uuid}
          className="hidden"
          type="text"
        />
        <Input
          isRequired
          label={t("Title")}
          placeholder={t("Enter field Title")}
          type="text"
          onChange={handleTitleChange}
          value={currentField.title}
        />
        <Input
          isRequired
          label={t("Description")}
          placeholder={t("Enter field Description")}
          type="text"
          onChange={handleDescriptionChange}
          value={currentField.description}
        />
        <Input
          label={t("Regex")}
          placeholder={t("Enter field Regex")}
          type="text"
          onChange={handleRegexChange}
          value={currentField.regex}
        />

        <Switch
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
              "justify-between cursor-pointer rounded-lg gap-2 px-3 py-4 border-2 border-transparent"
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
          isSelected={currentField.required}
          onChange={handleRequiredChange}
        >
          <div className="flex flex-col gap-1">
            <p className="text-tiny text-default-600">{t("Required")}</p>
          </div>
        </Switch>
        {currentField.config.placeholder !== undefined ? (
          <Input
            label={t("Placeholder")}
            placeholder={t("Enter field Placeholder")}
            value={currentField.config.placeholder}
            onChange={handlePlaceholderChange}
            maxLength={255}
            type="text"
          />
        ) : (
          <></>
        )}

        {currentField.config.defaultValue !== undefined ? (
          <Input
            label={t("Default Value")}
            placeholder={t("Enter field Default Value")}
            value={currentField.config.defaultValue}
            onChange={handleDefaultValueChange}
            maxLength={255}
            type="text"
          />
        ) : (
          <></>
        )}

        {currentField.config.length !== undefined ? (
          <Slider
            label={t("Length")}
            step={1}
            maxValue={255}
            minValue={0}
            value={currentField.config.length}
            onChange={handleLengthChange}
            className="max-w-full overflow-hidden"
            classNames={{
              label: "text-tiny text-default-600",
              value: "text-tiny text-default-600",
            }}
            size="md"
            showSteps={false}
          />
        ) : (
          <></>
        )}

        {currentField.config.maxLength !== undefined &&
        currentField.config.minLength !== undefined ? (
          <Slider
            label={t("Length Min-Max")}
            step={1}
            minValue={0}
            maxValue={255}
            onChange={handleLengthRangeChange}
            value={[
              currentField.config.minLength,
              currentField.config.maxLength,
            ]}
            className="max-w-full overflow-hidden"
            classNames={{
              label: "text-tiny text-default-600",
              value: "text-tiny text-default-600",
            }}
            size="md"
            showSteps={false}
          />
        ) : (
          <></>
        )}

        {currentField.config.rows !== undefined ? (
          <Slider
            label={t("Rows")}
            step={1}
            maxValue={255}
            minValue={0}
            onChange={handleRowsChange}
            value={currentField.config.rows}
            className="max-w-full overflow-hidden"
            classNames={{
              label: "text-tiny text-default-600",
              value: "text-tiny text-default-600",
            }}
            size="md"
            showSteps={false}
          />
        ) : (
          <></>
        )}
        {currentField.config.cols !== undefined ? (
          <Slider
            label={t("Cols")}
            step={1}
            maxValue={255}
            minValue={0}
            onChange={handleColsChange}
            value={currentField.config.cols}
            className="max-w-full overflow-hidden"
            classNames={{
              label: "text-tiny text-default-600",
              value: "text-tiny text-default-600",
            }}
            size="md"
            showSteps={false}
          />
        ) : (
          <></>
        )}
        {currentField.config.isMultiple !== undefined ? (
          <Switch
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                "justify-between cursor-pointer rounded-lg gap-2 px-3 py-4 border-2 border-transparent"
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
            isSelected={currentField.config.isMultiple}
            onChange={handleIsMultipleChange}
          >
            <div className="flex flex-col gap-1">
              <p className="text-tiny text-default-600">{t("Multiple")}</p>
              {/*<p className="text-tiny text-default-400">*/}
              {/*  Get access to new features before they are released.*/}
              {/*</p>*/}
            </div>
          </Switch>
        ) : (
          <></>
        )}
        {currentField.config.options !== undefined ? (
          <>
            <div className="group relative touch-none tap-highlight-transparent  w-full max-w-full bg-content2 hover:bg-content2  cursor-pointer rounded-lg gap-2 px-3 py-0.5 border-2 border-transparent data-[selected=true]:border-primary">
              <div className="grid grid-flow-row">
                <p className="text-tiny text-default-600 py-1">
                  {t("Options")}
                </p>
              </div>
            </div>
            <ul className="max-w-full bg-white grid grid-flow-row gap-2">
              {(currentField.config.options as FieldOption[] | undefined)?.map(
                (option: FieldOption, index: number) => (
                  <li
                    className="max-w-full flex items-center gap-1"
                    key={index}
                  >
                    <Checkbox
                      isSelected={option.selected}
                      onChange={() => handleOptionCheckClick(index)}
                      radius="full"
                      className="flex-shrink-0"
                    ></Checkbox>
                    <Input
                      size="sm"
                      type="text"
                      label=""
                      maxLength={255}
                      minLength={0}
                      value={option.val}
                      onChange={(e) => handleOptionValChange(index, e)}
                      className="flex-grow min-w-0"
                    />
                    <Button
                      isIconOnly
                      radius="full"
                      size="sm"
                      color="primary"
                      aria-label="Plus"
                      onClick={() => handleOptionAddClick(index)}
                      variant="flat"
                      className="flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                    <Button
                      isIconOnly
                      radius="full"
                      size="sm"
                      className={clsx("flex-shrink-0", {
                        invisible: index === 0,
                      })}
                      color="primary"
                      aria-label="Minus"
                      onClick={() => handleOptionRemoveClick(index)}
                      variant="flat"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </li>
                )
              )}
            </ul>
          </>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
