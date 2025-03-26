"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Checkbox,
} from "@heroui/react";
import Block from "@/modules/common/components/shared/block";
import React from "react";
import {
  FunnelIcon,
  TableCellsIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ArrowPathIcon,
  ArrowsUpDownIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { PageArgs } from "@/modules/form/types/list";
import { FormWithSubmissions } from "@/modules/form/types/list";
import { sortOptions, columns } from "@/modules/form/constants/list";

interface ActionProps {
  data: PageArgs<FormWithSubmissions>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchReset: () => void;
  handleSortChange: (sortKey: string) => void;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  visibleColumns: Set<string>;
  handleColumnVisibilityChange: (key: string, isVisible: boolean) => void;
  viewMode: "table" | "grid";
  setViewMode: React.Dispatch<React.SetStateAction<"table" | "grid">>;
}

const Action: React.FC<ActionProps> = ({
  data,
  handleSearch,
  handleSearchSubmit,
  handleKeyPress,
  handleSearchReset,
  handleSortChange,
  setIsFilterOpen,
  visibleColumns,
  handleColumnVisibilityChange,
  viewMode,
  setViewMode,
}) => {
  return (
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
              startContent={<MagnifyingGlassIcon className="h-5 w-5" />}
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
          {viewMode === "table" && (
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
          )}
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
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="text-default-600"
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            title={viewMode === "table" ? "切换到网格视图" : "切换到表格视图"}
          >
            {viewMode === "table" ? (
              <Squares2X2Icon className="h-5 w-5" />
            ) : (
              <ViewColumnsIcon className="h-5 w-5" />
            )}
          </Button>
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
  );
};

export default Action;
