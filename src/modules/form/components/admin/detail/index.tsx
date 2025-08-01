'use client'

import {Form} from "@prisma/client";
import Block from "@/modules/common/components/shared/block";
import {Button, Input, Pagination, Select, SelectItem} from "@heroui/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import Scroll from "@/modules/common/components/shared/scroll";
import {
    FunnelIcon,
    ArrowPathIcon,

} from "@heroicons/react/24/outline";
import {Database, Plus, Clock, BarChart3, Download} from "lucide-react";
import {
    getSubmissionsWithPagination,
    getList,
    getSubmissionFieldTitles
} from "@/modules/form/actions/submission-action";
import {useEffect, useState} from "react";
import {Submission, PaginationMeta} from "@/modules/form/types/form";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";


export function Index({form}: { form: Form }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


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
    const [fieldTitles, setFieldTitles] = useState<string[]>([]);
    const [searechConditions, setSearchConditions] = useState<object[]>([{
        field: "all",
        operator: "contains",
        value: []
    }]);
    const [keyword, setKeyword] = useState<string>('');

    const handleKeywordChange = (value: string) => {
        setKeyword(value);
        fetchSubmissions(1, pagination.pageSize, selectedVersion, value);

    };

    const fetchFieldTitles = async (formId: number, version: number) => {
        const titles = await getSubmissionFieldTitles(formId, version);
        setFieldTitles(titles);
        console.log("title", titles);
    }

    // 获取所有可用版本的函数
    const fetchAvailableVersions = async () => {
        try {
            const result = await getSubmissionsWithPagination({
                where: {formId: form.id},
                select: {version: true},
                orderBy: {version: 'desc'},
            });

            const versions = Array.from(new Set(
                result.data.map((item: { version: number }) => item.version)
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
    const fetchSubmissions = async (page: number = 1, pageSize: number = 20, version: number, keyword: string = '') => {
        setIsLoading(true);
        try {
            const result = await getList(version, form.id, keyword, page, pageSize)

            setSubmissions(result.data as unknown as Submission[]);
            setPagination(result.pagination);
            console.log("result", result);

        } catch (error) {
            console.error('获取提交数据失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 处理版本切换
    const handleVersionChange = (version: number) => {
        setSelectedVersion(version);
        fetchSubmissions(1, pagination.pageSize, version, keyword);
    };

    useEffect(() => {
        const initializeData = async () => {
            const versions = await fetchAvailableVersions();
            if (versions.length > 0) {
                await fetchSubmissions(1, 20, versions[0]);
                await fetchFieldTitles(form.id, versions[0]);
            } else {
                await fetchSubmissions(1, 20, 1);
                await fetchFieldTitles(form.id, 1);
            }
        };

        initializeData();

    }, [form.id]);

    console.log(submissions);
    return (
        <div className="grid md:grid-rows-[56px_1fr_4fr_56px] grid-rows-[56px_2fr_3fr_56px] gap-4 h-full">
            <Block className="h-full pt-3">
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
                    <div>
                        <form>
                            <Input
                                label=""
                                type="text"
                                size="sm"
                                placeholder="搜索表单提交数据..."
                                value={keyword}
                                onValueChange={handleKeywordChange}
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
                            <ArrowPathIcon className="h-5 w-5"/>
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="text-default-600"
                            title="导出数据"
                            isDisabled={isLoading || submissions.length === 0}
                        >
                            <Download className="h-5 w-5"/>
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="text-default-600"
                            title="高级搜索"
                            onPress={onOpen}
                        >
                            <FunnelIcon className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>
            </Block>
            <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr] gap-4">
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">总提交数</span>
                            <span className="text-2xl font-bold text-blue-600">
                                {isLoading ? '...' : pagination.total.toLocaleString()}
                            </span>
                            <span className="text-green-500 text-xs">↑ 18% 较上周</span>
                        </div>
                        <Database className="text-blue-500 h-6 w-6 place-self-center"/>
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">今日提交</span>
                            <span className="text-2xl font-bold text-green-600">89</span>
                            <span className="text-green-500 text-xs">↑ 12% 较昨日</span>
                        </div>
                        <Plus className="text-green-500 h-6 w-6 place-self-center"/>
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">平均完成时间</span>
                            <span className="text-2xl font-bold text-orange-600">3.2分钟</span>
                            <span className="text-red-500 text-xs">↓ 8% 较上周</span>
                        </div>
                        <Clock className="text-orange-500 h-6 w-6 place-self-center"/>
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">完成率</span>
                            <span className="text-2xl font-bold text-purple-600">87.5%</span>
                            <span className="text-green-500 text-xs">↑ 5% 较上周</span>
                        </div>
                        <BarChart3 className="text-purple-500 h-6 w-6 place-self-center"/>
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
                            {isLoading ? (
                                <>
                                    <TableColumn>加载中 ... </TableColumn>
                                </>
                            ) : submissions.length === 0 ? (
                                <>
                                    <TableColumn>提交数据</TableColumn>
                                </>
                            ) : (
                                <>
                                    {submissions[0].data.map((item, index) => (
                                        <TableColumn key={index}>{item.title}</TableColumn>
                                    ))}
                                </>
                            )}
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
                                        {[
                                            <TableCell key="id">{submission.id}</TableCell>,
                                            ...submission.data.map((item, i) => (
                                                <TableCell key={i}>
                                                    {item.value?.toString() ?? '无数据'}
                                                </TableCell>
                                            )),
                                            <TableCell key="created">{submission.createdAt.toLocaleString()}</TableCell>
                                        ]}
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Advanced Search</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus

                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <Input

                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                />
                                <Select
                                    className="max-w-xs"
                                    label="Select country"
                                    placement="bottom"
                                    size="md"
                                    variant="bordered"
                                >
                                    <SelectItem key="argentina">Argentina</SelectItem>
                                    <SelectItem key="venezuela">Venezuela</SelectItem>
                                    <SelectItem key="brazil">Brazil</SelectItem>
                                </Select>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}