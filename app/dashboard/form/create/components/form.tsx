'use client'

import {initialData} from "../initialData";
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import clsx from "clsx";


export default function Form() {

    const [state, setState] = useState(initialData);

    const [formTab, setFormTab] = useState('attributes')

    const handleFieldChange = (e: any) => {
        e.preventDefault();

    }

    const handleFieldClick = (e: any) => {
        let uuid = e.currentTarget.getAttribute('data-rbd-draggable-id')

        // console.log(uuid)

        // iterate over fields and set active to false
        const updatedFields = state.fields.map((field) => {
            if(field.uuid === uuid) {
                return {...field, active: true}; // 注意：这会把匹配到的field设置为active: true，其他则为false
            } else {
                return {...field, active: false};
            }
        });

        let currentField = state.fields[0];

        state.fields.forEach(item => {
            if (item.uuid == uuid)
                currentField = item
        });

        console.log(currentField)

        setState({ ...state, fields: updatedFields , currentField: currentField});

        setFormTab('attributes');
         // console.log(formTab)
    };

    const onBeforeDragStart = (start: any) => {
        return
    }

    const onDragStart = (start: any) => {
        // console.log(start);
    }

    const onDragEnd = (result: any) => {
        // console.log(result)

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
            const field = {uuid: uuidV4(), id: draggedItem.id, name: draggedItem.name, title : "", active: false, config: draggedItem.config};
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
                               aria-label="Fields"
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
                                                            className={clsx('border border-fuchsia-800 rounded-lg p-2 text-xs relative cursor-pointer', {"outline-double outline-4 outline-yellow-400": element.active})} {...provided.draggableProps}
                                                            ref={provided.innerRef} onClick={handleFieldClick}>
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


                                                            <span className="block leading-loose pl-8">{element.config.title}</span>
                                                            {/*<span>{element.title}</span>*/}
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
                                         {...provided.droppableProps}
                                         className={clsx('mt-4 p-4 text-center rounded-lg', {"bg-red-200 border-dotted": snapshot.isDraggingOver}, {"bg-red-50": !snapshot.isDraggingOver})}>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>

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
                               aria-label="Attributes"
                               defaultChecked={formTab === 'attributes'}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Title</span>
                                </div>
                                <input type="text" placeholder="Title" value={state.currentField.config.title} onChange={handleFieldChange}
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Required</span>
                                    <input type="checkbox" className="toggle" checked={state.currentField.config.required}/>
                                </label>
                            </div>
                        </div>
                        <input type="radio" name="form_tab" role="tab" className="tab"
                               aria-label="Basic"
                               defaultChecked={formTab === 'basic'}/>
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