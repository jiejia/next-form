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
import { getSubmissionsWithPagination } from "@/modules/form/actions/form-action";
import { useEffect, useState } from "react";
import { Submission, PaginatedResult, PaginationMeta } from "@/modules/form/types/form";


export default function Index({ form }: { form: Form }) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        pageSize: 20,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [availableVersions, setAvailableVersions] = useState<number[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<number>(1);

    // 获取所有可用版本的函数
    const fetchAvailableVersions = async () => {
        try {
            const result = await getSubmissionsWithPagination({
                where: { formId: form.id },
                select: { version: true },
                orderBy: { version: 'desc' },
            });
            
            const versions = Array.from(new Set(
                result.data.map((item: any) => item.version)
            )).sort((a, b) => b - a); // 按版本号降序排序
            
            setAvailableVersions(versions);
            
            // 设置默认选中最大版本
            if (versions.length > 0) {
                setSelectedVersion(versions[0]);
            }
            
            return versions;
        } catch (error) {
            console.error('获取版本列表失败:', error);
            return [];
        }
    };

    // 获取提交数据的函数
    const fetchSubmissions = async (page: number = 1, pageSize: number = 20, version?: number) => {
        setIsLoading(true);
        try {
            const targetVersion = version !== undefined ? version : selectedVersion;
            
            // 查询指定版本的所有提交记录
            const result = await getSubmissionsWithPagination({
                where: { 
                    formId: form.id,
                    version: targetVersion
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            setSubmissions(result.data as unknown as Submission[]);
            setPagination(result.pagination);
        } catch (error) {
            console.error('获取提交数据失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 处理版本切换
    const handleVersionChange = (version: number) => {
        setSelectedVersion(version);
        fetchSubmissions(1, pagination.pageSize, version);
    };

    useEffect(() => {
        const initializeData = async () => {
            const versions = await fetchAvailableVersions();
            if (versions.length > 0) {
                await fetchSubmissions(1, 20, versions[0]);
            } else {
                await fetchSubmissions(1, 20, 1);
            }
        };
        
        initializeData();
    }, [form.id]);

    console.log(submissions);
    return (
        <div className="grid grid-rows-[56px_1fr_4fr_56px] gap-4 h-full">
            <Block className="h-full pt-3">
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
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
                    <div>
                        <Select
                            size="sm"
                            placeholder="选择版本"
                            className="min-w-[100px]"
                            selectedKeys={[selectedVersion.toString()]}
                            onSelectionChange={(keys) => {
                                const version = parseInt(Array.from(keys)[0] as string);
                                handleVersionChange(version);
                            }}
                            isDisabled={isLoading || availableVersions.length === 0}
                        >
                            {availableVersions.map((version) => (
                                <SelectItem key={version} textValue={`V${version}`}>
                                    V{version}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="grid grid-flow-col gap-2">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="text-default-600"
                            title="刷新数据"
                            isLoading={isLoading}
                            onPress={() => fetchSubmissions(pagination.page, pagination.pageSize, selectedVersion)}
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
                            <span className="text-2xl font-bold text-blue-600">
                                {isLoading ? '...' : pagination.total.toLocaleString()}
                            </span>
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <div className="flex justify-center items-center py-8">
                                            <div className="text-default-500">加载中...</div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : submissions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <div className="flex justify-center items-center py-8">
                                            <div className="text-default-500">暂无提交数据</div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                submissions.map((submission) => (
                                    <TableRow key={submission.id}>
                                        <TableCell>{submission.id}</TableCell>
                                        <TableCell className="p-0">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-default-50">
                                                        {submission.data.map((item, index) => (
                                                            <th key={index} className="px-3 py-2 text-left text-sm font-medium text-default-700 border-r border-default-200 last:border-r-0">{item.title}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {submission.data.map((item, index) => (
                                                            <td key={index} className="px-3 py-2 text-sm text-default-600 border-r border-default-200 last:border-r-0">
                                                                {String(item.value || '')}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </TableCell>
                                        <TableCell>{submission.createdAt.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Scroll>
            </Block>
            <Block className="grid sm:grid-cols-[120px_1fr_120px] grid-cols-[1fr] pt-3 gap-2">
                <div className="hidden sm:block justify-items-center content-center">
                    <span className="text-sm text-default-600">
                        共 {pagination.total} 条
                    </span>
                </div>
                <div className="justify-items-center content-center">
                    <Pagination
                        showControls
                        showShadow
                        color="primary"
                        page={pagination.page}
                        total={pagination.totalPages}
                        size={"sm"}
                        isDisabled={isLoading}
                        onChange={(page) => fetchSubmissions(page, pagination.pageSize, selectedVersion)}
                    />
                </div>
                <div className="hidden sm:block justify-items-center content-center">
                    <Select
                        disallowEmptySelection
                        selectionMode="single"
                        className="max-w-xs"
                        size="sm"
                        selectedKeys={[pagination.pageSize.toString()]}
                        onSelectionChange={(keys) => {
                            const newPageSize = parseInt(Array.from(keys)[0] as string);
                            fetchSubmissions(1, newPageSize, selectedVersion);
                        }}
                        isDisabled={isLoading}
                    >
                        {[10, 20, 50, 100].map((size) => (
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