import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Selection,
} from "@heroui/react";
import Block from "@/modules/common/components/shared/block";
import React from "react";
import Scroll from "@/modules/common/components/shared/scroll";
import { FormWithSubmissions } from "@/modules/form/types/list";
import {
  statusColorMap,
  statusTextMap,
  columns,
} from "@/modules/form/constants/list";
import DataActionMenu from "./data-action-menu";
import { PageArgs } from "@/modules/form/types/list";
import Link from "next/link";

interface DataTableProps {
  data: PageArgs<FormWithSubmissions>;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  visibleColumns: Set<string>;
  updateData: (updatedData: Partial<PageArgs<FormWithSubmissions>>) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  selectedKeys,
  setSelectedKeys,
  visibleColumns,
  updateData,
}) => {
  const renderCell = React.useCallback(
    (item: FormWithSubmissions, columnKey: string) => {
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
              <DataActionMenu
                formId={item.id}
                updateData={updateData}
                listData={data}
              />
            </div>
          );
        case "submissions":
          return (
            <div className="text-center">
              <Link
                href={`/dashboard/form/${item.id}/detail`}
                className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-3 py-1 rounded-full transition-colors duration-200 text-sm font-medium inline-block"
              >
                {String(cellValue)}
              </Link>
            </div>
          );
        case "created_at":
          return <div className="text-center">{String(cellValue)}</div>;
        case "title":
          return (
            <div className="text-center">
              <Link
                href={`/form/${item.uuid}`}
                target="_blank"
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                {String(cellValue)}
              </Link>
            </div>
          );
        default:
          return <div className="text-center">{String(cellValue)}</div>;
      }
    },
    [data, updateData]
  );

  // 获取可见列配置，确保ID和actions列始终可见
  const visibleColumnsArray = columns.filter(
    (col) =>
      visibleColumns.has(col.key) || col.key === "id" || col.key === "actions"
  );

  return (
    <Block className="pr-2 h-full">
      <Scroll>
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
      </Scroll>
    </Block>
  );
};

export default DataTable;
