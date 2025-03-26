"use client";

import { Selection } from "@heroui/react";
import React from "react";
import { FormService } from "@/modules/form/services/form-service";
import { useState, useEffect } from "react";
import { PageArgs, WhereArgs } from "@/modules/form/types/list";
import { format } from "date-fns";
import {
  PrismaFormResult,
  FormWithSubmissions,
} from "@/modules/form/types/list";
import { columns, initialData } from "@/modules/form/constants/list";
import Action from "./action";
import Paging from "./paging";
import DataTable from "./data-table";
import DataList from "./data-list";
import AdvancedSearchModal from "./advanced-search-modal";

const Index: React.FC = () => {
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
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("grid");

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

  return (
    <div className="grid grid-rows-[56px_1fr_56px] gap-4 h-full">
      <Action
        data={data}
        handleSearch={handleSearch}
        handleSearchSubmit={handleSearchSubmit}
        handleKeyPress={handleKeyPress}
        handleSearchReset={handleSearchReset}
        handleSortChange={handleSortChange}
        setIsFilterOpen={setIsFilterOpen}
        visibleColumns={visibleColumns}
        handleColumnVisibilityChange={handleColumnVisibilityChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {viewMode === "table" ? (
        <DataTable
          data={data}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          visibleColumns={visibleColumns}
        />
      ) : (
        <DataList
          data={data}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      )}
      <Paging
        count={data.count}
        page={data.page}
        perPage={data.perPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
      <AdvancedSearchModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        data={data}
        setData={setData}
        handleSearchReset={handleSearchReset}
        handleFilterSubmit={handleFilterSubmit}
      />
    </div>
  );
};

export default Index;
