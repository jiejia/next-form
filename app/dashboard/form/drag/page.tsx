'use client'

import Link from "next/link";
import Sidenav from "@/app/dashboard/components/sidenav";
import React from 'react';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';

export default function Drag() {

    const initialData = {
        'tasks': {
            'task-1': {id: 'task-1',content: 'Take out the garbage' },
            'task-2': {id: 'task-2',content: 'Watch my favorite show' },
            'task-3': {id: 'task-3',content: 'Charge my phone' },
            'task-4': {id: 'task-4',content: 'Cook dinner' },
        },
        'columns': {
            'column-1': {
                id: 'column-1',
                title: 'To do',
                taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            },
        },
    };



    return (
        <>
            <aside className="col-span-1">
                <Sidenav activeName="Forms"/>
            </aside>
            <main className="col-span-4 relative">
                <div id="nav" className="absolute right-0 top-0">
                    {/*<button className="btn btn-outline btn-sm">*/}
                    {/*    <Link*/}
                    {/*        href="/dashboard/form/create"*/}
                    {/*    >Create</Link>*/}
                    {/*</button>*/}
                </div>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link
                                href="/dashboard/form"
                            >Forms
                            </Link>
                        </li>
                        <li>
                            Drag
                        </li>
                    </ul>
                </div>
                <div>

                </div>
            </main>
        </>
    )
        ;
}
