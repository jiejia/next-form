"use client";

import React, { useState, useEffect } from "react";
import Block from "@/components/shared/block";
import { Tabs, Tab } from "@nextui-org/react";
import Scroll from "@/components/shared/scroll";

import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { v4 as uuidV4 } from "uuid";
import { DraggableItem, Control, Field } from "@/types/form";
import { getControlConfigs } from "@/services/form-service";
import Controls from "@/components/ui/form/controls";
import Fields from "@/components/ui/form/fields";
import Property from "@/components/ui/form/property";
import Form from "@/components/ui/form/form";
import Recycle from "@/components/ui/form/recycle";
import DndWrapper from "@/components/shared/dnd-wrapper";
import Overlay from "@/components/ui/form/overlay";
import Actions from "@/components/ui/form/actions";
import {formData} from "@/data/form";
import _ from "lodash";


export default function SaveForm() {
  useEffect(() => {
    getControl();
  }, []);

  const formDataClone = _.cloneDeep(formData);


  const [currentField, setCurrentField] = useState<Field | null>(formDataClone.currentField);
  const [selected, setSelected] = useState<string | number>("form");
  const [activeItem, setActiveItem] = useState<DraggableItem | null>(null);
  const [overItem, setOverItem] = useState<DraggableItem | null>(null);
  const [controls, setControls] = useState<Control[]>([]);
  const [fields, setFields] = useState<Field[]>(formDataClone.fields);

  const getControl = async () => {
    const controls = await getControlConfigs();
    setControls(controls);
    // console.log(controls)
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    const { active } = event;

    const currentActiveItem = getDraggableItem(active.id.toString());
    setActiveItem(currentActiveItem);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

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
        const newFiledItems = [...fields];
        newFiledItems.splice(currentActiveItem.id, 1);
        setFields(newFiledItems);
      }
    }
  }

  function handleDragMove(event: DragMoveEvent) {}

  return (
    <div className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
      <DndWrapper
        handleDragEnd={handleDragEnd}
        handleDragStart={handleDragStart}
        handleDragMove={handleDragMove}
      >
        <Block className="xl:grid hidden xl:grid-rows-[40px_1fr]">
          <Tabs fullWidth size="md" aria-label="Controls" className="pr-4">
            <Tab key="controls" title="Controls" className="!px-0 pb-0">
              <Scroll>
                <Controls controls={controls} />
              </Scroll>
            </Tab>
          </Tabs>
        </Block>
        <Block className="pr-2">
          <div className="grid grid-rows-[1fr_50px] gap-2 h-full">
            <Scroll>
              <Fields fields={fields} />
            </Scroll>
            <Recycle />
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
                <Controls controls={controls} />
              </Scroll>
            </Tab>
            <Tab key="form" title="Form" className="px-0 pb-0">
              <Scroll>
                <Form />
              </Scroll>
            </Tab>
            <Tab key="property" title="Property" className="px-0 pb-0">
              <Scroll>
                <Property />
              </Scroll>
            </Tab>
          </Tabs>
        </Block>
        <Block
          className={"col-span-1 sm:col-span-2 xl:col-span-3 text-center pt-3"}
        >
          <Actions />
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
