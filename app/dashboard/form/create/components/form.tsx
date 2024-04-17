'use client'

import {elementData} from "../elementData";
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import React from 'react';
import {resultData} from "@/app/dashboard/form/create/resultData";

export default function Form() {
    const state = elementData;

    const onDragEnd = () => {
            const {destination  , source, draggableId} = resultData;
            if (! destination) {
                return;
            }
            if (destination.index === source.index && destination.droppableId === source.droppableId) {
                return;
            }

            const newComponentIds = Array.from(['component-1', 'component-2', 'component-3', 'component-4', 'component-5']);
            newComponentIds.splice(source.index, 1);
            newComponentIds.splice(destination.index, 0, draggableId);

    };

    // @ts-ignore
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 overflow-y-auto">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="components_tab" role="tab" className="tab"
                               aria-label="Components" defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-6">
                            <Droppable droppableId={"components"}>
                                {(provided) => (
                                    <ul className="grid gap-2" ref={provided.innerRef}  {...provided.droppableProps}>
                                        {
                                            elementData.map((element) =>
                                                <Draggable draggableId={"component-" + element.id} index={element.id} key={element.id}>
                                                    {(provided) => (
                                                        <li
                                                            className="border border-fuchsia-800 rounded-lg p-2 text-xs" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <span>{element.name}</span>
                                                        </li>
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
                <div className="col-span-2">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="design_tab" role="tab" className="tab"
                               aria-label="Fields Area"
                               defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">
                            <Droppable droppableId={"fields"}>
                                {(provided) => (
                                    <ul className="grid gap-2" ref={provided.innerRef}  {...provided.droppableProps}>
                                        {provided.placeholder}
                                    </ul>
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