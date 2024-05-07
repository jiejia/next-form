'use client'

import {initialData} from "../initialData";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import React from 'react';
import {useState} from 'react';
import {useImmer} from 'use-immer'
import {v4 as uuidV4} from 'uuid';
import clsx from "clsx";
import _ from "lodash";


export default function Form() {

    const [fields, setFields] = useState(initialData.fields);
    const [currentField, setCurrentField] = useState(initialData.currentField);
    const [formTab, setFormTab] = useState('attributes')

    const handleFieldTitleChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.title = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                title: e.target.value
            }
        });
    }

    const handleFieldPlaceholderChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.placeholder = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                placeholder: e.target.value
            }
        });
    }

    const handleFieldDefaultValueChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.defaultValue = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                defaultValue: e.target.value
            }
        });
    }

    const handleFieldLengthChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.length = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                length: e.target.value
            }
        });
    }

    const handleFieldMaxLengthChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.maxLength = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                maxLength: e.target.value
            }
        });
    }

    const handleFieldMinLengthChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.minLength = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                minLength: e.target.value
            }
        });
    }

    const handleFieldRowsChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.rows = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                rows: e.target.value
            }
        });
    }

    const handleFieldColsChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.cols = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                cols: e.target.value
            }
        });
    }

    const handleFieldRegexChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.regex = e.currentTarget.value;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                regex: e.target.value
            }
        });
    }


    const handleFieldRequiredChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.required = e.currentTarget.checked;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                required: e.currentTarget.checked
            }
        });
    }

    const handleFieldIsMultipleChange = (e: any) => {
        const uuid = currentField.uuid;

        fields.forEach(item => {
            if (item.uuid == uuid) {
                item.config.isMultiple = e.currentTarget.checked;
            }
        });

        setFields(fields)

        setCurrentField({
            ...currentField,
            config: {
                ...currentField.config,
                isMultiple: e.currentTarget.checked
            }
        });
    }

    const handleFieldClick = (e: any) => {
        let uuid = e.currentTarget.getAttribute('data-rbd-draggable-id')

        // console.log(uuid)

        // iterate over fields and set active to false
        const updatedFields = fields.map((field) => {
            if (field.uuid === uuid) {
                return {...field, active: true}; // 注意：这会把匹配到的field设置为active: true，其他则为false
            } else {
                return {...field, active: false};
            }
        });


        fields.forEach(item => {
            if (item.uuid == uuid)
                setCurrentField(item)
        });

        setFields(updatedFields);
        setFormTab('attributes');
        // console.log(formTab)
    };

    const handleFieldOptionClick = (e: any) => {
        // const uuid = currentField.uuid;
        //
        // fields.forEach(item => {
        //     if (item.uuid == uuid && item.config.options !== undefined) {
        //         item.config.options.push({"k": "", "v": ""});
        //     }
        // });
        //
        // setFields(fields)
        //
        // if (currentField.options !== undefined) {
        //     currentField.options.push({"k": "", "v": ""});
        // }
        // console.log(currentField)
        //
        // setCurrentField(currentField);

    }

    const onBeforeDragStart = (start: any) => {
        return
    }

    const onDragStart = (start: any) => {
        // console.log(start);
    }

    const onDragEnd = (result: any) => {
        // console.log(result)

        if (!result.destination || (result.destination.droppableId == result.source.droppableId && result.destination.index === result.source.index)) {
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
            const draggedItem = _.cloneDeep(initialData.components[result.source.index]);
            // console.log(draggedItem)
            const field = {
                uuid: uuidV4(),
                id: draggedItem.id,
                name: draggedItem.name,
                active: false,
                config: draggedItem.config
            };
            fields.splice(result.destination.index, 0, field);
            console.log(initialData.components);
            setFields(fields)
        }

        // change order
        if (result.source.droppableId === "fields" && result.destination.droppableId === "fields") {
            const draggedItem = fields[result.source.index];
            fields.splice(result.source.index, 1);
            fields.splice(result.destination.index, 0, draggedItem);
            setFields(fields)
        }

        // remove field
        if (result.source.droppableId === "fields" && result.destination.droppableId === "remove") {
            fields.splice(result.source.index, 1);
            setFields(fields)
        }
    };

    // @ts-ignore
    // @ts-ignore
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
                                            initialData.components.map((element, index) =>
                                                <Draggable draggableId={"component-" + element.id} index={index}
                                                           key={index} isDragDisabled={false}>
                                                    {(provided, snapshot) => (
                                                        <>
                                                            <li
                                                                className={clsx('border border-fuchsia-800 rounded-lg p-2 text-xs select-none', {"border-dotted": snapshot.isDragging})} {...provided.draggableProps} {...provided.dragHandleProps}
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
                                    <ul className={clsx('grid gap-2 rounded-lg p-4', {"bg-yellow-100": snapshot.isDraggingOver}, {"bg-yellow-50": !snapshot.isDraggingOver})}
                                        ref={provided.innerRef}  {...provided.droppableProps}>
                                        {
                                            fields.map((element, index) =>
                                                    <Draggable draggableId={element.uuid} key={element.uuid} index={index}>
                                                        {(provided, snapshot) => (
                                                            <li
                                                                className={clsx('border border-fuchsia-800 rounded-lg p-1 text-xs relative cursor-pointer grid grid-cols-9', {"outline-double outline-4 outline-yellow-400": element.active})} {...provided.draggableProps}
                                                                ref={provided.innerRef} onClick={handleFieldClick}>
                                                            <span
                                                                className="block absolute p-1" {...provided.dragHandleProps}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
     className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
</svg>

                                                            </span>


                                                                <span
                                                                    className="block leading-loose pl-8 col-span-2">{element.name}</span>
                                                                <span
                                                                    className="block leading-loose col-span-7">{element.config.title}</span>
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
                            <Droppable droppableId={"remove"}>
                                {(provided, snapshot) => (
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
                                    <span className="label-text">uuid</span>
                                </div>
                                <input type="text" placeholder="Title" value={currentField.uuid}
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Title</span>
                                </div>
                                <input type="text" placeholder="Title" value={currentField.config.title}
                                       onChange={handleFieldTitleChange} maxLength={255}
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Required</span>
                                    <input type="checkbox" className="toggle"
                                           checked={currentField.config.required}
                                           onChange={handleFieldRequiredChange}/>
                                </label>
                            </div>
                            {
                                (currentField.config.placeholder !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Placeholder</span>
                                        </div>
                                        <input type="text" placeholder="Title" value={currentField.config.placeholder}
                                               onChange={handleFieldPlaceholderChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.defaultValue !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Default Value</span>
                                        </div>
                                        <input type="text" placeholder="Title" value={currentField.config.defaultValue}
                                               onChange={handleFieldDefaultValueChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.length !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Length</span>
                                        </div>
                                        <input type="number" placeholder="Title" value={currentField.config.length}
                                               onChange={handleFieldLengthChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.maxLength !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Max Length</span>
                                        </div>
                                        <input type="number" placeholder="Title" value={currentField.config.maxLength}
                                               onChange={handleFieldMaxLengthChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.minLength !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Min Length</span>
                                        </div>
                                        <input type="number" placeholder="Title" value={currentField.config.minLength}
                                               onChange={handleFieldMinLengthChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.rows !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Rows</span>
                                        </div>
                                        <input type="number" placeholder="Title" value={currentField.config.rows}
                                               onChange={handleFieldRowsChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.cols !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Cols</span>
                                        </div>
                                        <input type="text" placeholder="Title" value={currentField.config.cols}
                                               onChange={handleFieldColsChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.regex !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Regex</span>
                                        </div>
                                        <input type="text" placeholder="Title" value={currentField.config.regex}
                                               onChange={handleFieldRegexChange} maxLength={255}
                                               className="input input-bordered input-sm w-full max-w-xs"/>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.options !== undefined) ? (
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label grid grid-cols-5 gap-2">
                                            <span className="label-text col-span-2">Options</span>
                                            <button className="btn btn-sm col-start-5 col-span-1" onClick={handleFieldOptionClick}>+</button>
                                        </div>
                                        <ul>
                                            {
                                                currentField.config.options.map((option:any, index:any) => (
                                                    <li key={index} className="grid grid-cols-5 gap-2">
                                                        <input type="text" value={option.k}
                                                               className="input input-bordered input-sm col-span-1 text-center"/>
                                                        <input type="text" value={option.v}
                                                               className="input input-bordered input-sm  col-span-3"/>
                                                        <button className="btn btn-sm col-span-1">-</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </label>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                (currentField.config.isMultiple !== undefined) ? (
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Is Multiple</span>
                                            <input type="checkbox" className="toggle"
                                                   checked={currentField.config.isMultiple}
                                                   onChange={handleFieldIsMultipleChange}/>
                                        </label>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
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