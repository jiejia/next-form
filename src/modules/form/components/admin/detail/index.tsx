'use client'

import { Form } from "@prisma/client";
import Block from "@/modules/common/components/shared/block";
import { Button, Input, Pagination, Select, SelectItem } from "@heroui/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import Scroll from "@/modules/common/components/shared/scroll";

import {
    FunnelIcon,
    PauseIcon,
    PlayIcon,
    ArrowPathIcon,
    EllipsisVerticalIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { Database, Plus, Clock, BarChart3 } from "lucide-react";

export default function Index({ form }: { form: Form }) {

    return (
        <div className="grid grid-rows-[56px_1fr_4fr_56px] gap-4 h-full">
            <Block className="h-full pt-3">
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                    <div>
                        <form >
                            <Input
                                label=""
                                type="text"
                                size="sm"
                                placeholder="搜索表单提交数据..."
                            />
                        </form>
                    </div>
                    <div className="grid grid-flow-col gap-2">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="text-default-600"
                            title="重置搜索"
                        >
                            <ArrowPathIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="text-default-600"
                            title="高级搜索"
                        >
                            <FunnelIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Block>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4">
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">总提交数</span>
                            <span className="text-2xl font-bold text-blue-600">1,247</span>
                            <span className="text-green-500 text-xs">↑ 18% 较上周</span>
                        </div>
                        <Database className="text-blue-500 h-6 w-6 place-self-center" />
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">今日提交</span>
                            <span className="text-2xl font-bold text-green-600">89</span>
                            <span className="text-green-500 text-xs">↑ 12% 较昨日</span>
                        </div>
                        <Plus className="text-green-500 h-6 w-6 place-self-center" />
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">平均完成时间</span>
                            <span className="text-2xl font-bold text-orange-600">3.2分钟</span>
                            <span className="text-red-500 text-xs">↓ 8% 较上周</span>
                        </div>
                        <Clock className="text-orange-500 h-6 w-6 place-self-center" />
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">完成率</span>
                            <span className="text-2xl font-bold text-purple-600">87.5%</span>
                            <span className="text-green-500 text-xs">↑ 5% 较上周</span>
                        </div>
                        <BarChart3 className="text-purple-500 h-6 w-6 place-self-center" />
                    </div>
                </Block>
            </div>
            <Block className="pr-2 h-full">
                <Scroll>
                    <Table
                        removeWrapper
                        aria-label="Example static collection table"
                        selectionMode="single"
                        classNames={{
                            tr: "hover:bg-default-50 transition-colors cursor-pointer",
                            tbody: "[&>tr]:border-b [&>tr]:border-default-200 [&>tr:first-child]:border-t [&>tr:first-child]:border-default-200",
                            td: "border-r border-default-200 last:border-r-0",
                        }}
                    >
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>data</TableColumn>
                            <TableColumn>created at</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>100</TableCell>
                                <TableCell className="p-0">
                                   <table className="w-full border-collapse">
                                                                         <thead>
                                         <tr className="bg-default-50">
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段1</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段2</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段3</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段4</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段5</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段6</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段7</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段8</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段9</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段10</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值1</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值2</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值3</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值4</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值5</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值6</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值7</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值8</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值9</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值10</td>
                                        </tr>
                                    </tbody>
                                   </table>
                                </TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>99</TableCell>
                                <TableCell className="p-0">
                                <table className="w-full border-collapse">
                                                                         <thead>
                                         <tr className="bg-default-50">
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段1</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段2</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段3</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段4</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段5</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段6</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段7</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段8</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段9</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段10</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值1</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值2</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值3</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值4</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值5</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值6</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值7</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值8</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值9</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值10</td>
                                        </tr>
                                    </tbody>
                                   </table>
                                </TableCell>
                                <TableCell>Paused</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>98</TableCell>
                                <TableCell className="p-0">
                                <table className="w-full border-collapse">
                                                                         <thead>
                                         <tr className="bg-default-50">
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段1</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段2</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段3</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段4</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段5</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段6</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段7</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段8</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段9</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段10</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值1</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值2</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值3</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值4</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值5</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值6</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值7</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值8</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值9</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值10</td>
                                        </tr>
                                    </tbody>
                                   </table>
                                </TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>98</TableCell>
                                <TableCell className="p-0">
                                <table className="w-full border-collapse">
                                                                         <thead>
                                         <tr className="bg-default-50">
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段1</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段2</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段3</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段4</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段5</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段6</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段7</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段8</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段9</th>
                                            <th className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">字段10</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值1</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值2</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值3</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值4</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值5</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值6</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值7</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值8</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值9</td>
                                            <td className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">值10</td>
                                        </tr>
                                    </tbody>
                                   </table>
                                </TableCell>
                                <TableCell>Vacation</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Scroll>
            </Block>
            <Block className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
                <div className="hidden sm:block justify-items-center content-center">
                    Total 100
                </div>
                <div className="justify-items-center content-center">
                    <Pagination
                        showControls
                        showShadow
                        color="primary"
                        page={1}
                        total={100}
                        size={"sm"}
                    />
                </div>
                <div className="hidden sm:block justify-items-center content-center">
                    <Select
                        disallowEmptySelection
                        selectionMode="single"
                        className="max-w-xs"
                        size="sm"
                    >
                        {[20, 30, 50, 100].map((size) => (
                            <SelectItem key={size} textValue={size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </Block>
        </div>
    );
}