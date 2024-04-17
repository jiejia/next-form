'use client'

import {elementData} from "../elementData";
import { DragDropContext } from 'react-beautiful-dnd';
import React from 'react';

export default function Form() {
    const onDragEnd = () => {

    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 overflow-y-auto">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="components_tab" role="tab" className="tab"
                               aria-label="Components" defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-6">
                            <ul className="grid gap-2">
                                {
                                    elementData.map((element) =>
                                            <li key={element.id}
                                                className="border border-fuchsia-800 rounded-lg p-2 text-xs">
                                                <span>{element.name}</span>
                                            </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>


                </div>
                <div className="col-span-2">
                    <div role="tablist" className="tabs tabs-boxed">
                        <input type="radio" name="design_tab" role="tab" className="tab"
                               aria-label="Fields Area"
                               defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">
                            <ul>

                            </ul>
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