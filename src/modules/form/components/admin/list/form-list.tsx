"use client";

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
    Selection,
} from "@heroui/react";
import Block from "@/modules/common/components/shared/block";
import React from "react";
import {Pagination} from "@heroui/react";
import {Input} from "@heroui/react";
import {Select, SelectItem} from "@heroui/react";
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Scroll from "@/modules/common/components/shared/scroll";

interface RowItem {
    key: string;
    id: string;
    name: string;
    created_at: string;
    submissions: number;
    status: string;
    actions?: string;
}

// 修改 generateRows 函数，使用固定的随机数
const generateRows = () => {
    const formTypes = [
        "用户调查问卷",
        "产品反馈表",
        "活动报名表",
        "满意度调查",
        "需求收集表",
    ];
    const statuses = ["active", "paused", "deleted"];

    return Array.from({length: 50}, (_, index) => ({
        key: `${index + 1}`,
        id: `FORM-${String(index + 1).padStart(4, "0")}`,
        name: `${formTypes[index % formTypes.length]} ${index + 1}`,
        created_at: `2024-01-${String(index + 1).padStart(2, "0")}`,
        submissions: (index * 17 + 23) % 1000, // 使用确定性的计算替代随机数
        status: statuses[index % statuses.length],
    }));
};

const FormList: React.FC = () => {
    const [rows] = React.useState(() => generateRows()); // 使用 useState 确保数据只生成一次
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set(["2"])
    );

    const renderCell = React.useCallback(
        (item: RowItem, columnKey: ColumnKey) => {
            const cellValue =
                columnKey === "actions" ? undefined : item[columnKey as keyof RowItem];

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
                                    <EyeIcon className="h-5 w-5"/>
                                </Button>
                            </Tooltip>
                            <Tooltip content="编辑表单">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className="text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <PencilSquareIcon className="h-5 w-5"/>
                                </Button>
                            </Tooltip>
                            <Tooltip content="删除表单" color="danger">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className="text-danger cursor-pointer active:opacity-50"
                                >
                                    <TrashIcon className="h-5 w-5"/>
                                </Button>
                            </Tooltip>
                        </div>
                    );
                case "submissions":
                    return <div className="text-center">{cellValue}</div>;
                case "created_at":
                    return <div className="text-center">{cellValue}</div>;
                case "name":
                    return <div className="text-center">{cellValue}</div>;
                default:
                    return <div className="text-center">{cellValue}</div>;
            }
        },
        []
    );

    const SearchIcon = (props) => {
        return (
            <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="1em"
                role="presentation"
                viewBox="0 0 24 24"
                width="1em"
                {...props}
            >
                <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
        );
    };

    return (
        <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
            <Block className="h-full grid grid-cols-[30%_1fr] pt-3 gap-2">
                <div>
                    <Input label="" type="text" size="sm" startContent={
                        <SearchIcon
                            className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                    }/>
                </div>
                <div>

                </div>
            </Block>
            <Block className="pr-2 h-full">
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
                    <Pagination showControls initialPage={1} total={100} size="sm" loop/>
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
};

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
    },
];

type ColumnKey = keyof RowItem | "actions";

export default FormList;
