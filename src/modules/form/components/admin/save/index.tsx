"use client";

import React, {useState, useEffect} from "react";
import {Tabs, Tab} from "@heroui/react";
import {
    DragStartEvent,
    DragEndEvent,
    DragMoveEvent,
} from "@dnd-kit/core";
import {v4 as uuidV4} from "uuid";
import _ from "lodash";
import type {DraggableItem, Control, Field} from "@/modules/form/types/form";
import Block from "@/modules/common/components/shared/block";
import Scroll from "@/modules/common/components/shared/scroll";
import DndWrapper from "@/modules/common/components/shared/dnd-wrapper";
import Controls from "@/modules/form/components/admin/save/controls";
import Fields from "@/modules/form/components/admin/save/fields";
import Property from "@/modules/form/components/admin/save/property";
import Form from "@/modules/form/components/admin/save/form";
import Recycle from "@/modules/form/components/admin/save/recycle";
import Overlay from "@/modules/form/components/admin/save/overlay";
import Actions from "@/modules/form/components/admin/save/actions";

import {formData} from "@/modules/form/data/form";
import {FormService} from "@/modules/form/services/form-service";
import {isNotEmpty} from "@/lib/utils";
import {notFound } from 'next/navigation'


export default function Index(props:any) {
    useEffect(() => {
        getControl();
        initData();
    }, []);

    const initData = async () => {
        // console.log(isNotEmpty(props.id))
        if (isNotEmpty(props.id)) {
            const formData = await FormService.getFormById(parseInt(props.id));
            if (! formData) {
                notFound();
            }
            const newInitialData = {
                fields: formData.fields as Field[],
                currentField: formData.fields[0] as Field,
                form : {
                    id: formData.id,
                    title: formData.title,
                    description: formData.description,
                    enabled: formData.enabled,
                    numberingStyle: formData.numberingStyle
                }
            }
            newInitialData.currentField.active = true

            setFields(newInitialData.fields)
            setCurrentField(newInitialData.currentField)
            setForm(newInitialData.form)
        } else {
            const uuid = uuidV4()
            const newInitialData = _.cloneDeep(formData);

            newInitialData.currentField.uuid = uuid
            newInitialData.fields[0].uuid = uuid

            setFields(newInitialData.fields)
            setCurrentField(newInitialData.currentField)
            setForm(newInitialData.form)
        }
    }


    const formDataClone = _.cloneDeep(formData);

    const [currentField, setCurrentField] = useState<Field>(
        formDataClone.currentField
    );
    const [form, setForm] = useState(formDataClone.form);
    const [fields, setFields] = useState<Field[]>(formDataClone.fields);

    const [selected, setSelected] = useState<string | number>("form");
    const [activeItem, setActiveItem] = useState<DraggableItem | null>(null);
    const [overItem, setOverItem] = useState<DraggableItem | null>(null);
    const [controls, setControls] = useState<Control[]>([]);

    const getControl = async () => {
        const controls = await FormService.getControlConfigs();
        setControls(controls);
        // console.log(controls)
    };


    // get draggable item
    const getDraggableItem = (currentId: string): DraggableItem => {
        let area = null;
        if (currentId.toString().includes("field")) {
            area = "field";
        } else if (currentId.toString().includes("control")) {
            area = "control";
        } else if (currentId.toString().includes("recycle")) {
            area = "recycle";
        }

        let id = currentId.split("-").pop();

        if (!id) {
            id = "0";
        }

        return {
            id: parseInt(id),
            area: area,
        };
    };

    const getInsertPosition = (activeRect: DOMRect, overRect: DOMRect) => {
        if (activeRect.bottom <= overRect.bottom) {
            return "before";
        }
        if (activeRect.top >= overRect.top) {
            return "after";
        }
        return "after";
    };

    function handleDragStart(event: DragStartEvent) {
        // get active item
        const {active} = event;

        const currentActiveItem = getDraggableItem(active.id.toString());
        setActiveItem(currentActiveItem);
    }

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        const currentActiveItem = getDraggableItem(active.id.toString());
        setActiveItem(currentActiveItem);

        if (over) {
            const currentOverItem = getDraggableItem(over.id.toString());
            setOverItem(currentOverItem);
            console.log(currentActiveItem, currentOverItem);

            const activeRect = active.rect.current.translated;
            const overRect = over.rect;

            // drag control to field
            if (
                currentActiveItem.area == "control" &&
                currentOverItem.area == "field"
            ) {
                if (activeRect && overRect) {
                    const insertPosition = getInsertPosition(activeRect, overRect);
                    console.log(insertPosition);

                    const newFiledItems = [...fields];

                    const field: Field = {
                        uuid: uuidV4(),
                        controlId: controls[currentActiveItem.id].id,
                        controlName: controls[currentActiveItem.id].name,
                        controlType: controls[currentActiveItem.id].type,
                        active: false,
                        title: controls[currentActiveItem.id].config.title,
                        description: "",
                        required: controls[currentActiveItem.id].required,
                        regex: "",
                        config: controls[currentActiveItem.id].config,
                    };

                    if (insertPosition === "before") {
                        newFiledItems.splice(currentOverItem.id, 0, field);
                    } else {
                        newFiledItems.splice(currentOverItem.id + 1, 0, field);
                    }
                    setFields(newFiledItems);
                }
            }

            // drag field to field
            if (
                currentActiveItem.area == "field" &&
                currentOverItem.area == "field" &&
                currentActiveItem.id != currentOverItem.id
            ) {
                if (activeRect && overRect) {
                    const insertPosition = getInsertPosition(activeRect, overRect);
                    const newFiledItems = [...fields];
                    const [removed] = newFiledItems.splice(currentActiveItem.id, 1);
                    if (insertPosition === "before") {
                        if (currentActiveItem.id < currentOverItem.id) {
                            newFiledItems.splice(currentOverItem.id - 1, 0, removed);
                        } else {
                            newFiledItems.splice(currentOverItem.id, 0, removed);
                        }
                    } else {
                        if (currentActiveItem.id < currentOverItem.id) {
                            newFiledItems.splice(currentOverItem.id, 0, removed);
                        } else {
                            newFiledItems.splice(currentOverItem.id + 1, 0, removed);
                        }
                    }
                    setFields(newFiledItems);
                }
            }

            // drag field to recycle(remove field)
            if (
                currentActiveItem.area == "field" &&
                currentOverItem.area == "recycle"
            ) {
                // Prevent deletion if only one element remains
                if (fields.length <= 1) {
                    return; // Return directly, skip deletion
                }

                const newFiledItems = [...fields];
                const removedField = newFiledItems[currentActiveItem.id];
                newFiledItems.splice(currentActiveItem.id, 1);

                // If the deleted field was active, activate the first field
                if (removedField.active && newFiledItems.length > 0) {
                    newFiledItems[0] = {...newFiledItems[0], active: true};
                    setCurrentField(newFiledItems[0]);
                }

                setFields(newFiledItems);
            }
        }
    }

    function handleDragMove(event: DragMoveEvent) {
    }

    return (
        <div
            className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
            <DndWrapper
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDragMove={handleDragMove}
            >
                <Block className="xl:grid hidden xl:grid-rows-[40px_1fr]">
                    <Tabs fullWidth size="md" aria-label="Controls" className="pr-4">
                        <Tab key="controls" title="Controls" className="!px-0 pb-0">
                            <Scroll>
                                <Controls controls={controls}/>
                            </Scroll>
                        </Tab>
                    </Tabs>
                </Block>
                <Block className="pr-2">
                    <div className="grid grid-rows-[1fr_50px] gap-2 h-full">
                        <Scroll>
                            <Fields
                                fields={fields}
                                form={form}
                                setFields={setFields}
                                setCurrentField={setCurrentField}
                                setSelected={setSelected}
                            />
                        </Scroll>
                        <Recycle/>
                    </div>
                </Block>
                <Block className="grid grid-rows-[40px_1fr]">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Options"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        className="pr-4"
                    >
                        <Tab
                            key="controls"
                            title="Controls"
                            className="px-0 xl:hidden block pb-0"
                        >
                            <Scroll>
                                <Controls controls={controls}/>
                            </Scroll>
                        </Tab>
                        <Tab key="form" title="Form" className="px-0 pb-0">
                            <Scroll>
                                <Form form={form} setForm={setForm}/>
                            </Scroll>
                        </Tab>
                        <Tab key="property" title="Property" className="px-0 pb-0">
                            <Scroll>
                                <Property currentField={currentField} setCurrentField={setCurrentField}
                                          fields={fields}
                                          setFields={setFields}
                                />
                            </Scroll>
                        </Tab>
                    </Tabs>
                </Block>
                <Block
                    className={"col-span-1 sm:col-span-2 xl:col-span-3 flex justify-center gap-2  pt-3"}
                >
                    <Actions form={form} fields={fields}/>
                </Block>
                {activeItem && (
                    <Overlay
                        activeItem={activeItem}
                        fields={fields}
                        controls={controls}
                    />
                )}
            </DndWrapper>
        </div>
    );
}
