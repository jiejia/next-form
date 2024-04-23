'use client'

import {initialData} from "../initialData";
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import clsx from "clsx";


export default function Form() {

    const [state, setState] = useState(initialData);


    const onBeforeDragStart = (start: any) => {
        return
    }

    const onDragStart = (start: any) => {
        // console.log(start);
    }

    const onDragEnd = (result: any) => {
        console.log(result)

        if (!result.destination ||  (result.destination.droppableId == result.source.droppableId  && result.destination.index === result.source.index)) {
            return;
        }

        // 如果拖拽结束后，处于拖拽状态，则复制一个元素
        // if (result.reason === 'DROP' && result.mode === 'FLUID' && result.snapshot.isDragging) {
        //     const draggedItem = state.components[result.source.index];
        //     // newItems.splice(destination.index, 0, { ...draggedItem });
        //     // setItems(newItems);
        //     console.log(draggedItem);
        // }

        // clone
        if (result.source.droppableId === "components" && result.destination.droppableId === "fields") {
            const draggedItem = state.components[result.source.index];
            // console.log(draggedItem)
            const field = {uuid: uuidV4(), id: draggedItem.id, name: draggedItem.name};
            state.fields.splice(result.destination.index, 0, field);
            // console.log(result.source.index, draggedItem);
        }

        // change order
        if (result.source.droppableId === "fields" && result.destination.droppableId === "fields") {
            const draggedItem = state.fields[result.source.index];
            state.fields.splice(result.source.index, 1);
            state.fields.splice(result.destination.index, 0, draggedItem);
        }

        // remove field
        if (result.source.droppableId === "fields" && result.destination.droppableId === "remove") {
            state.fields.splice(result.source.index, 1);
        }

        setState(state)
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="col-span-1 overflow-y-auto">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="components_tab" role="tab" className="tab"
                               aria-label="Components" defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-6">
                            <Droppable droppableId={"components"} isDropDisabled={true}>
                                {(provided, snapshot) => (
                                    <ul className="grid gap-2" ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            state.components.map((element, index) =>
                                                <Draggable draggableId={"component-" + element.id} index={index} key={index} isDragDisabled={false}>
                                                    {(provided, snapshot) => (
                                                        <>
                                                            <li
                                                                className={clsx('border border-fuchsia-800 rounded-lg p-2 text-xs select-none', {"border-dotted": snapshot.isDragging })} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                ref={provided.innerRef}>
                                                                <span>{element.name}</span>
                                                            </li>
                                                            {snapshot.isDragging && (
                                                                <>
                                                                    <li
                                                                        className={clsx('border border-fuchsia-800 rounded-lg p-2 text-xs select-none', {"block": snapshot.isDragging})}>
                                                                        <span>{element.name}</span>
                                                                    </li>
                                                                </>
                                                            )}
                                                        </>

                                                    )}
                                                </Draggable>
                                            )
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </div>
                    </div>


                </div>
                <div className="xl:col-span-2 col-span-1">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="design_tab" role="tab" className="tab"
                               aria-label="Fields Area"
                               defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">
                            <Droppable droppableId={"fields"}>
                                {(provided, snapshot) => (
                                    <ul className={clsx('grid gap-2 rounded-lg p-4', {"bg-yellow-100": snapshot.isDraggingOver}, {"bg-yellow-50": ! snapshot.isDraggingOver})} ref={provided.innerRef}  {...provided.droppableProps}>
                                        {
                                            state.fields.map((element,index) =>
                                                <Draggable draggableId={element.uuid}  key={element.uuid} index={index}>
                                                    {(provided, snapshot) => (
                                                        <li
                                                            className="border border-fuchsia-800 rounded-lg p-2 text-xs relative cursor-pointer outline	 outline-2 outline-green-700	" {...provided.draggableProps}
                                                            ref={provided.innerRef}>
                                                            <span className="block absolute" {...provided.dragHandleProps}>
                                                                                                                  <svg
                                                                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                                                                      fill="none"
                                                                                                                      viewBox="0 0 24 24"
                                                                                                                      strokeWidth={1.5}
                                                                                                                      stroke="currentColor"
                                                                                                                      className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                                            </svg>
                                                            </span>


                                                            <span className="block leading-loose pl-8">{element.name}</span>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                            <Droppable droppableId={"remove"} >
                                {(provided,snapshot) => (
                                    <div ref={provided.innerRef}
                                    {...provided.droppableProps} className={clsx('mt-4 p-4 text-center rounded-lg', {"bg-red-200 border-dotted": snapshot.isDraggingOver}, {"bg-red-50": ! snapshot.isDraggingOver})}>
                                        Remove
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <input type="radio" name="design_tab" role="tab" className="tab"
                               aria-label="Json"/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-6">

                        </div>

                    </div>
                </div>
                <div className="col-span-1">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="form_tab" role="tab" className="tab"
                               aria-label="Attributes"/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">

                        </div>
                        <input type="radio" name="form_tab" role="tab" className="tab"
                               aria-label="Basic"
                               defaultChecked={true}/>
                        <div role="tabpanel"
                             className="tab-content bg-base-100 border-base-300  p-6">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input type="text" placeholder="Name"
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea className="textarea textarea-bordered textarea-sm h-24"
                                          placeholder="Description"></textarea>
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Opened</span>
                                    <input type="checkbox" className="toggle" defaultChecked/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}