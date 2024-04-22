'use client'

import Link from "next/link";
import Sidenav from "@/app/dashboard/components/sidenav";
import React from 'react';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';


// function Column(column: string, tasks: string[])
// {
//     return (
//       <>
//         <h2>{column.title}</h2>
//
//       </>
//     );
// }

export default function Drag() {


    interface InitialData {
        columns: { [key: string]: any };
        tasks: { [key: string]: any };
        columnOrder: string[];
    }

    const initialData : InitialData = {
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
        // facilitate reordering of the columns
        'columnOrder': ['column-1'],
    };

    // @ts-ignore
    return (
        <>
            <Sidenav activeName="Forms"/>
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
                    {/*{*/}
                    {/*    initialData.columnOrder.map((columnId:string) => {*/}
                    {/*            const column = initialData.columns[columnId] ;*/}
                    {/*            const tasks = column.taskIds.map((taskId: string | number) => initialData.tasks[taskId]);*/}

                    {/*            return  <Column key={column.id} column={column} tasks={tasks} />;*/}
                    {/*    });*/}
                    {/*}*/}
                </div>
            </main>
        </>
    )
        ;
}
