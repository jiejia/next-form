'use client'

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    Button,
    Selection
} from "@nextui-org/react";
import Block from "@/components/shared/block";
import React from "react";
import {Pagination} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Scroll from "@/components/shared/scroll";

interface RowItem {
    key: string;
    id: string;
    name: string;
    created_at: string;
    submissions: number;
    status: string;
    actions?: string;
}

// 生成更多测试数据
const generateRows = () => {
    const formTypes = ['用户调查问卷', '产品反馈表', '活动报名表', '满意度调查', '需求收集表'];
    const statuses = ['active', 'paused', 'deleted'];
    
    return Array.from({ length: 50 }, (_, index) => {
        const date = new Date(2024, 0, index + 1);
        return {
            key: `${index + 1}`,
            id: `FORM-${String(index + 1).padStart(4, '0')}`,
            name: `${formTypes[index % formTypes.length]} ${index + 1}`,
            created_at: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
            submissions: Math.floor(Math.random() * 1000) + 1,
            status: statuses[index % statuses.length],
        };
    });
};

const rows = generateRows();

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "name",
        label: "表单名称",
    },
    {
        key: "created_at",
        label: "创建时间",
    },
    {
        key: "submissions",
        label: "提交数",
    },
    {
        key: "status",
        label: "状态",
    },
    {
        key: "actions",
        label: "操作",
    }
];

const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
    active: "success",
    paused: "warning",
    deleted: "danger",
};

const statusTextMap = {
    active: "进行中",
    paused: "已暂停",
    deleted: "已删除",
};

type ColumnKey = keyof RowItem | "actions";

export default function FormList() {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["2"]));

    const renderCell = React.useCallback((item: RowItem, columnKey: ColumnKey) => {
        const cellValue = columnKey === 'actions' ? undefined : item[columnKey as keyof RowItem];

        switch (columnKey) {
            case "id":
                return (
                    <div className="text-center font-mono text-xs text-gray-500">
                        {cellValue}
                    </div>
                );
            case "status":
                return (
                    <div className="flex justify-center">
                        <Chip
                            className="capitalize"
                            color={statusColorMap[cellValue as keyof typeof statusColorMap]}
                            size="sm"
                            variant="flat"
                        >
                            {statusTextMap[cellValue as keyof typeof statusTextMap]}
                        </Chip>
                    </div>
                );
            case "actions":
                return (
                    <div className="flex justify-center gap-2">
                        <Tooltip content="查看详情">
                            <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                className="text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EyeIcon className="h-5 w-5" />
                            </Button>
                        </Tooltip>
                        <Tooltip content="编辑表单">
                            <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                className="text-default-400 cursor-pointer active:opacity-50"
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                            </Button>
                        </Tooltip>
                        <Tooltip content="删除表单" color="danger">
                            <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                className="text-danger cursor-pointer active:opacity-50"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </Button>
                        </Tooltip>
                    </div>
                );
            case "submissions":
                return (
                    <div className="text-center">{cellValue}</div>
                );
            case "created_at":
                return (
                    <div className="text-center">{cellValue}</div>
                );
            case "name":
                return (
                    <div className="text-center">{cellValue}</div>
                );
            default:
                return <div className="text-center">{cellValue}</div>;
        }
    }, []);

    return (
        <div className="grid grid-rows-[65px_1fr_56px] gap-4 h-full">
            <Block className="grid grid-cols-[1fr_80px] gap-2">
                <Input placeholder="搜索表单" type="text" size="sm" className="indent-8"/>
                <Button color="primary" size="sm">搜索</Button>
            </Block>
            <Block className="pr-2">
                <Scroll>
                    <Table
                        removeWrapper
                        aria-label="表单列表"
                        selectedKeys={selectedKeys}
                        selectionMode="multiple"
                        onSelectionChange={setSelectedKeys}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn 
                                    key={column.key}
                                    align="center"
                                    className="text-center"
                                >
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(item, columnKey as ColumnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Scroll>
            </Block>
            <Block className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
                <div className="hidden sm:block justify-items-center content-center">
                    Total 100
                </div>
                <div className="justify-items-center content-center">
                    <Pagination showControls initialPage={1} total={100} size="sm" loop />
                </div>
                <div className="hidden sm:block justify-items-center content-center">
                    <Select
                        isRequired
                        className="max-w-xs"
                        placeholder="每页条数"
                        size="sm"
                        defaultSelectedKeys={["20"]}
                    >
                        {[20, 30, 50, 100].map((size) => (
                            <SelectItem key={size} value={size}>
                                {size}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </Block>
        </div>
    );
}