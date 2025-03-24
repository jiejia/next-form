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
  ArrowPathIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import Scroll from "@/modules/common/components/shared/scroll";
import { FormService } from "@/modules/form/services/form-service";
import { useState, useEffect } from "react";
import { PageArgs, WhereArgs } from "@/modules/form/types/list";
import { format } from "date-fns";
import clsx from "clsx";
import { PrismaFormResult, FormWithSubmissions } from "@/modules/form/types/list";
import { statusColorMap, statusTextMap , columns, initialData, sortOptions} from "@/modules/form/constants/list";


const FormList: React.FC = () => {


  const [data, setData] = useState<PageArgs<FormWithSubmissions>>({
    page: 1,
    perPage: initialData.perPage,
    items: [],
    count: 0,
    keyword: "",
    sort: initialData.sort,
    status: initialData.status,
    submissionMin: 0,
    submissionMax: 0,
    dateFrom: "",
    dateTo: "",
  });

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["2"])
  );
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(columns.map((col) => col.key))
  );

  // Handle sort selection
  const handleSortChange = (sortKey: string) => {
    setData({ ...data, sort: sortKey });
    pageForms(
      1,
      data.keyword,
      data.perPage,
      sortKey,
      data.status,
      data.submissionMin,
      data.submissionMax,
      data.dateFrom,
      data.dateTo
    );
  };

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
    (item: FormWithSubmissions, columnKey: string) => {
      // Define a type for cellValue that accepts any index key
      // This approach is safer than using 'any' without compromising type checking
      type ItemKey = keyof FormWithSubmissions;
      const cellValue =
        columnKey === "actions" ? undefined : item[columnKey as ItemKey];

      switch (columnKey) {
        case "id":
          return (
            <div className="text-center font-mono text-xs text-gray-500">
              {String(cellValue)}
            </div>
          );
        case "enabled":
          return (
            <div className="flex justify-center">
              <Chip
                className="capitalize"
                color={statusColorMap[String(cellValue)]}
                size="sm"
                variant="flat"
              >
                {statusTextMap[String(cellValue)]}
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
          return <div className="text-center">{String(cellValue)}</div>;
        case "created_at":
          return <div className="text-center">{String(cellValue)}</div>;
        case "title":
          return <div className="text-center">{String(cellValue)}</div>;
        default:
          return <div className="text-center">{String(cellValue)}</div>;
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
            <TableRow key={row.id}>
              {visibleColumnsArray.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(row, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  useEffect(() => {
    pageForms(
      data.page,
      data.keyword,
      data.perPage,
      data.sort,
      data.status,
      data.submissionMin,
      data.submissionMax,
      data.dateFrom,
      data.dateTo
    );
  }, []);

  const pageForms = async (
    page: number = 1,
    keyword: string = "",
    perPage: number = data.perPage,
    sort: string = data.sort,
    status: number[] = data.status,
    submissionMin: number = data.submissionMin,
    submissionMax: number = data.submissionMax,
    dateFrom: string = data.dateFrom,
    dateTo: string = data.dateTo
  ) => {
    // search conditions
    const where: WhereArgs = {
      title: {
        contains: "",
      },
      OR: [],
    };

    // Simple search with keyword (top search bar)
    if (keyword !== "") {
      where.title.contains = keyword;
      // Also search in description when keyword is provided
      where.description = {
        contains: keyword,
      };
    }

    // Date range filter
    if (dateFrom !== "" || dateTo !== "") {
      where.createdAt = {};

      if (dateFrom !== "") {
        where.createdAt.gte = new Date(dateFrom);
      }

      if (dateTo !== "") {
        // Set time to end of day for the "to" date
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        where.createdAt.lte = toDate;
      }
    }

    // Check if we need to sort by submissions count
    const isSubmissionSort =
      sort === "submissions_desc" || sort === "submissions_asc";

    // Define prisma sorts
    const sorts: Record<string, object> = {
      id_desc: {
        id: "desc",
      },
      id_asc: {
        id: "asc",
      },
      title_desc: {
        title: "desc",
      },
      title_asc: {
        title: "asc",
      },
      enabled_desc: {
        enabled: "desc",
      },
      enabled_asc: {
        enabled: "asc",
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

    const statusWhere: { enabled: boolean }[] = [];

    for (const [key, value] of Object.entries(conditions)) {
      if (status.includes(Number(key))) {
        statusWhere.push(value as { enabled: boolean });
      }
    }

    where.OR = statusWhere;

    let rows;

    // Special handling for submission count sorting
    if (isSubmissionSort) {
      // For submission count sorting, we need to get all records first
      rows = (await FormService.getForms({
        select: {
          id: true,
          uuid: true,
          title: true,
          description: true,
          enabled: true,
          numberingStyle: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
        where: where,
      })) as PrismaFormResult[];

      // Convert data to the format needed
      let formattedRows: FormWithSubmissions[] = rows.map((row) => ({
        id: row.id,
        uuid: row.uuid,
        title: row.title,
        description: row.description,
        numberingStyle: row.numberingStyle,
        createdAt: format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss"),
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
        enabled: String(row.enabled),
        submissions: row._count.submissions,
      }));

      // Sort by submission count
      formattedRows.sort((a: FormWithSubmissions, b: FormWithSubmissions) => {
        const valueA = a.submissions;
        const valueB = b.submissions;

        return sort === "submissions_desc"
          ? valueB - valueA // descending
          : valueA - valueB; // ascending
      });

      // Apply pagination manually after sorting
      const startIndex = perPage * (page - 1);
      formattedRows = formattedRows.slice(startIndex, startIndex + perPage);

      // Apply submission count filtering
      if (submissionMin > 0 || submissionMax > 0) {
        formattedRows = formattedRows.filter((row: FormWithSubmissions) => {
          const submissionCount = row.submissions;

          if (submissionMin > 0 && submissionMax > 0) {
            return (
              submissionCount >= submissionMin &&
              submissionCount <= submissionMax
            );
          } else if (submissionMin > 0) {
            return submissionCount >= submissionMin;
          } else if (submissionMax > 0) {
            return submissionCount <= submissionMax;
          }

          return true;
        });
      }

      // Set the data
      setData({
        ...data,
        count: rows.length,
        items: formattedRows,
        page: page,
        perPage: perPage,
        keyword: keyword,
        sort: sort,
        status: status,
        submissionMin: submissionMin,
        submissionMax: submissionMax,
        dateFrom: dateFrom,
        dateTo: dateTo,
      });

      return;
    }

    // Standard sorting (not by submission count)
    rows = (await FormService.getForms({
      select: {
        id: true,
        uuid: true,
        title: true,
        description: true,
        enabled: true,
        numberingStyle: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: [sorts[sort] || sorts["id_desc"]],
      where: where,
      skip: perPage * (page - 1),
      take: perPage,
    })) as PrismaFormResult[];

    // 转换数据格式以匹配RowItem接口
    let formattedRows: FormWithSubmissions[] = rows.map((row) => ({
      id: row.id,
      uuid: row.uuid,
      title: row.title,
      description: row.description,
      numberingStyle: row.numberingStyle,
      createdAt: format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      enabled: String(row.enabled),
      submissions: row._count.submissions,
    }));

    // 获取符合查询条件的总记录数（不含提交数筛选）
    const baseCount = await FormService.getFormCount({
      where: where,
    });

    // 应用提交数筛选到当前页数据
    if (submissionMin > 0 || submissionMax > 0) {
      formattedRows = formattedRows.filter((row: FormWithSubmissions) => {
        const submissionCount = row.submissions;

        if (submissionMin > 0 && submissionMax > 0) {
          return (
            submissionCount >= submissionMin && submissionCount <= submissionMax
          );
        } else if (submissionMin > 0) {
          return submissionCount >= submissionMin;
        } else if (submissionMax > 0) {
          return submissionCount <= submissionMax;
        }

        return true;
      });
    }

    // 设置数据状态
    setData({
      ...data,
      count: baseCount, // 使用未经提交数筛选的总记录数，确保分页显示正确
      items: formattedRows,
      page: page,
      perPage: perPage,
      keyword: keyword,
      sort: sort,
      status: status,
      submissionMin: submissionMin,
      submissionMax: submissionMax,
      dateFrom: dateFrom,
      dateTo: dateTo,
    });
  };

  // Handle pagination page change
  const handlePageChange = (newPage: number) => {
    pageForms(
      newPage,
      data.keyword,
      data.perPage,
      data.sort,
      data.status,
      data.submissionMin,
      data.submissionMax,
      data.dateFrom,
      data.dateTo
    );
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, keyword: e.target.value });
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pageForms(
      1,
      data.keyword,
      data.perPage,
      data.sort,
      data.status,
      data.submissionMin,
      data.submissionMax,
      data.dateFrom,
      data.dateTo
    );
  };

  // Handle key press on search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      pageForms(
        1,
        data.keyword,
        data.perPage,
        data.sort,
        data.status,
        data.submissionMin,
        data.submissionMax,
        data.dateFrom,
        data.dateTo
      );
    }
  };

  const handlePerPageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await pageForms(
      1,
      data.keyword,
      parseInt(e.target.value),
      data.sort,
      data.status,
      data.submissionMin,
      data.submissionMax,
      data.dateFrom,
      data.dateTo
    );
  };

  // Handle filter form submission
  const handleFilterSubmit = () => {
    pageForms(
      1,
      data.keyword,
      data.perPage,
      data.sort,
      data.status,
      data.submissionMin,
      data.submissionMax,
      data.dateFrom,
      data.dateTo
    );
    setIsFilterOpen(false);
  };

  // Handle filter form reset and search
  const handleSearchReset = () => {
    setData({
      ...data,
      keyword: "",
      submissionMin: 0,
      submissionMax: 0,
      dateFrom: "",
      dateTo: "",
      status: [0, 1],
    });

    pageForms(
      1,
      "",
      initialData.perPage,
      initialData.sort,
      initialData.status,
      0,
      0,
      "",
      ""
    );
  };

  // Handle status selection
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newStatus: number[] = [];

    switch (e.target.value) {
      case "all":
        newStatus = [0, 1];
        break;
      case "enabled":
        newStatus = [1];
        break;
      case "disabled":
        newStatus = [0];
        break;
      default:
        newStatus = [0, 1];
    }

    setData({ ...data, status: newStatus });
  };

  // Get current status value for select
  const getCurrentStatusValue = () => {
    if (data.status.includes(0) && data.status.includes(1)) return "all";
    if (data.status.includes(1) && !data.status.includes(0)) return "enabled";
    if (data.status.includes(0) && !data.status.includes(1)) return "disabled";
    return "all";
  };

  return (
    <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
      <Block className="h-full pt-3">
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <div>
            <form onSubmit={handleSearchSubmit}>
              <Input
                label=""
                type="text"
                size="sm"
                placeholder="搜索表单..."
                value={data.keyword}
                onChange={handleSearch}
                onKeyDown={handleKeyPress}
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </form>
          </div>
          <div className="grid grid-flow-col gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="text-default-600"
              onClick={handleSearchReset}
              title="重置搜索"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="text-default-600"
              onClick={() => setIsFilterOpen(true)}
              title="高级搜索"
            >
              <FunnelIcon className="h-5 w-5" />
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="text-default-600"
                  title="排序方式"
                >
                  <ArrowsUpDownIcon className="h-5 w-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="排序选项">
                {sortOptions.map((option) => (
                  <DropdownItem
                    key={option.key}
                    textValue={option.text}
                    onPress={() => handleSortChange(option.key)}
                    className={data.sort === option.key ? "bg-primary-100" : ""}
                  >
                    {option.text}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end" closeOnSelect={false}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="text-default-600"
                  title="显示列设置"
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
          Total {data.count}
        </div>
        <div className="justify-items-center content-center">
          <Pagination
            showControls
            showShadow
            color="primary"
            page={data.page}
            total={Math.max(1, Math.ceil(data.count / data.perPage))}
            onChange={(page) => handlePageChange(page)}
            size={"sm"}
            className={clsx("", {
              invisible: Math.ceil(data.count / data.perPage) == 0,
            })}
          />
        </div>
        <div className="hidden sm:block justify-items-center content-center">
          <Select
            disallowEmptySelection
            selectionMode="single"
            className="max-w-xs"
            size="sm"
            defaultSelectedKeys={[data.perPage.toString()]}
            onChange={handlePerPageChange}
          >
            {[20, 30, 50, 100].map((size) => (
              <SelectItem key={size} textValue={size.toString()}>
                {size}
              </SelectItem>
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
              <div className="col-span-2">
                <Input
                  label="标题和描述"
                  size="sm"
                  value={data.keyword}
                  onChange={(e) =>
                    setData({ ...data, keyword: e.target.value })
                  }
                />
              </div>
              <Select
                label="状态"
                placeholder="请选择状态"
                size="sm"
                selectedKeys={[getCurrentStatusValue()]}
                onChange={handleStatusChange}
              >
                <SelectItem key="all">所有</SelectItem>
                <SelectItem key="enabled">已开启</SelectItem>
                <SelectItem key="disabled">已禁用</SelectItem>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="创建日期从"
                  type="date"
                  size="sm"
                  value={data.dateFrom}
                  onChange={(e) =>
                    setData({ ...data, dateFrom: e.target.value })
                  }
                />
                <Input
                  label="到"
                  type="date"
                  size="sm"
                  value={data.dateTo}
                  onChange={(e) => setData({ ...data, dateTo: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="最小提交数"
                  type="number"
                  placeholder="最小提交数"
                  size="sm"
                  value={data.submissionMin.toString()}
                  onChange={(e) =>
                    setData({
                      ...data,
                      submissionMin: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  label="最大提交数"
                  type="number"
                  placeholder="最大提交数"
                  size="sm"
                  value={data.submissionMax.toString()}
                  onChange={(e) =>
                    setData({
                      ...data,
                      submissionMax: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleSearchReset}>
              重置
            </Button>
            <Button color="primary" onPress={handleFilterSubmit}>
              搜索
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormList;
