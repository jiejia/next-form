"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Selection,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
} from "@heroui/react";
import Block from "@/modules/common/components/shared/block";
import React from "react";
import { Pagination } from "@heroui/react";
import { Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  FunnelIcon,
  TableCellsIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Scroll from "@/modules/common/components/shared/scroll";
import { FormService } from "@/modules/form/services/form-service";
import { useState, useEffect } from "react";
import { PageArgs, WhereArgs } from "@/modules/form/types/list";

interface RowItem {
  key: string;
  id: string;
  name: string;
  created_at: string;
  submissions: number;
  status: string;
  actions?: string;
}

type ColumnKey = keyof RowItem | "actions";

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
    key: "title",
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
    key: "enabled",
    label: "状态",
  },
  {
    key: "actions",
    label: "操作",
  },
];

const FormList: React.FC = () => {
  const initialData = {
    perPage: 5,
    sort: "id_desc",
    status: [0, 1],
  };

  const [data, setData] = useState<PageArgs>({
    page: 0,
    perPage: initialData.perPage,
    items: [],
    count: 0,
    keyword: "",
    sort: initialData.sort,
    status: initialData.status,
  });

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["2"])
  );
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(columns.map((col) => col.key))
  );

  // 处理列显示状态变化
  const handleColumnVisibilityChange = (key: string, isVisible: boolean) => {
    // 如果是ID或actions列，且尝试隐藏它们，则不允许
    if ((key === "id" || key === "actions") && !isVisible) {
      return;
    }

    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  };

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
            <div className="flex justify-center">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-default-400 cursor-pointer active:opacity-50"
                  >
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="表单操作">
                  <DropdownItem
                    key="view"
                    description="查看此表单的详细信息"
                    startContent={<EyeIcon className="h-4 w-4" />}
                  >
                    查看详情
                  </DropdownItem>
                  <DropdownItem
                    key="edit"
                    description="编辑此表单"
                    startContent={<PencilSquareIcon className="h-4 w-4" />}
                  >
                    编辑表单
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    description="永久删除此表单"
                    color="danger"
                    className="text-danger"
                    startContent={<TrashIcon className="h-4 w-4" />}
                  >
                    删除表单
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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

  const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
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

  // 渲染表格
  const renderTable = () => {
    // 获取可见列配置，确保ID和actions列始终可见
    const visibleColumnsArray = columns.filter(
      (col) =>
        visibleColumns.has(col.key) || col.key === "id" || col.key === "actions"
    );

    return (
      <Table
        removeWrapper
        aria-label="表单列表"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          {visibleColumnsArray.map((column) => (
            <TableColumn
              key={column.key}
              align="center"
              className="text-center"
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.items.map((row) => (
            <TableRow key={row.key}>
              {visibleColumnsArray.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(row, column.key as ColumnKey)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  useEffect(() => {
    pageForms();
  }, []); // 空依赖数组确保仅在组件挂载时执行一次

  const pageForms = async (
    page: number = 1,
    keyword: string = "",
    perPage: number = initialData.perPage,
    sort: string = initialData.sort,
    status: number[] = initialData.status
  ) => {
    // search conditions
    let where: WhereArgs = {
      title: {
        contains: "",
      },
      OR: [],
    };

    if (keyword != "") {
      where.title.contains = keyword;
    }

    const sorts: object = {
      id_desc: {
        id: "desc",
      },
      id_asc: {
        id: "asc",
      },
    };

    const conditions = {
      0: {
        enabled: false,
      },
      1: {
        enabled: true,
      },
    };

    let statusWhere: object[] = [];

    for (const [key, value] of Object.entries(conditions)) {
      if (key in status) {
        statusWhere.push(value);
      }
    }

    where.OR = statusWhere;

    // console.log(statusWhere)

    const rows = await FormService.getForms({
      select: {
        id: true,
        title: true,
        description: true,
        enabled: true,
        createdAt: true,
      },
      orderBy: [sorts[sort.toString()]],
      where: where,
      skip: perPage * (page - 1),
      take: perPage,
    });

    const formCount = await FormService.getFormCount({
      where: where,
    });

    // console.log(where, formCount)

    setData({
      ...data,
      count: formCount,
      items: rows,
      page: page,
      perPage: perPage,
      keyword: keyword,
      sort: sort,
      status: status,
    });
    console.log(data);
  };

  return (
    <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
      <Block className="h-full pt-3">
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <div>
            <Input
              label=""
              type="text"
              size="sm"
              placeholder="搜索表单..."
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="grid grid-flow-col gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="text-default-600"
              onClick={() => setIsFilterOpen(true)}
            >
              <FunnelIcon className="h-5 w-5" />
            </Button>
            <Dropdown placement="bottom-end" closeOnSelect={false}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="text-default-600"
                >
                  <TableCellsIcon className="h-5 w-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="显示列设置">
                {columns.map((column) => (
                  <DropdownItem key={column.key} textValue={column.label}>
                    <Checkbox
                      isSelected={visibleColumns.has(column.key)}
                      onValueChange={(checked) =>
                        handleColumnVisibilityChange(column.key, checked)
                      }
                      isDisabled={
                        column.key === "id" || column.key === "actions"
                      }
                    >
                      {column.label}
                      {(column.key === "id" || column.key === "actions") &&
                        " (必选)"}
                    </Checkbox>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="text-default-600"
                >
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="批量操作">
                <DropdownItem
                  key="delete"
                  description="删除选中的表单"
                  color="danger"
                  className="text-danger"
                  startContent={<TrashIcon className="h-4 w-4" />}
                >
                  批量删除
                </DropdownItem>
                <DropdownItem
                  key="pause"
                  description="暂停选中的表单"
                  startContent={<PauseIcon className="h-4 w-4" />}
                >
                  批量暂停
                </DropdownItem>
                <DropdownItem
                  key="activate"
                  description="激活选中的表单"
                  startContent={<PlayIcon className="h-4 w-4" />}
                >
                  批量激活
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="primary"
              as="a"
              href="/dashboard/form/create"
            >
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Block>
      <Block className="pr-2 h-full">
        <Scroll>{renderTable()}</Scroll>
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
              <SelectItem key={size}>{size}</SelectItem>
            ))}
          </Select>
        </div>
      </Block>
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        size="2xl"
        placement="center"
      >
        <ModalContent>
          <ModalHeader>高级搜索</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input label="表单ID" placeholder="请输入表单ID" size="sm" />
              <Input label="表单名称" placeholder="请输入表单名称" size="sm" />
              <Select label="状态" placeholder="请选择状态" size="sm">
                <SelectItem key="active">进行中</SelectItem>
                <SelectItem key="paused">已暂停</SelectItem>
                <SelectItem key="deleted">已删除</SelectItem>
              </Select>
              <Input label="创建时间" type="date" size="sm" />
              <Input
                label="最小提交数"
                type="number"
                placeholder="请输入最小提交数"
                size="sm"
              />
              <Input
                label="最大提交数"
                type="number"
                placeholder="请输入最大提交数"
                size="sm"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsFilterOpen(false)}
            >
              取消
            </Button>
            <Button color="primary" onPress={() => setIsFilterOpen(false)}>
              搜索
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormList;
