import React from "react";
import { FormWithSubmissions } from "@/modules/form/types/list";
import { PageArgs } from "@/modules/form/types/list";
import {
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { Selection } from "@heroui/react";
import Block from "@/modules/common/components/shared/block";
import Scroll from "@/modules/common/components/shared/scroll";
import { Checkbox } from "@heroui/react";
import DataActionMenu from "./data-action-menu";

interface DataListProps {
  data: PageArgs<FormWithSubmissions>;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
}

const DataList: React.FC<DataListProps> = ({
  data,
  selectedKeys,
  setSelectedKeys,
}) => {
  const handleSelect = (id: string) => {
    const newSelectedKeys = new Set(selectedKeys as Set<string>);
    if (newSelectedKeys.has(id)) {
      newSelectedKeys.delete(id);
    } else {
      newSelectedKeys.add(id);
    }
    setSelectedKeys(newSelectedKeys as Selection);
  };

  const isSelected = (id: string) => {
    return (selectedKeys as Set<string>).has(id);
  };

  // 检查是否全选
  const isAllSelected = () => {
    if (data.items.length === 0) return false;
    const selectedCount = (selectedKeys as Set<string>).size;
    return selectedCount === data.items.length;
  };

  // 全选或取消全选
  const toggleSelectAll = () => {
    if (isAllSelected()) {
      // 如果已全选，则清空选择
      setSelectedKeys(new Set() as Selection);
    } else {
      // 否则选择所有项
      const allIds = data.items.map((item) => String(item.id));
      setSelectedKeys(new Set(allIds) as Selection);
    }
  };

  // 用于阻止事件冒泡，防止点击操作按钮时触发选中
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Block className="pr-2 h-full">
      <Scroll>
        <div className="relative p-0 z-30">
          <div className="z-30 sticky top-0 left-0 bg-gray-50 p-2 mb-4 rounded-lg flex items-center w-full">
            <Checkbox
              isSelected={isAllSelected()}
              onValueChange={toggleSelectAll}
              size="sm"
            >
              <span className="ml-2 text-sm font-medium">全选</span>
            </Checkbox>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data.items.map((form) => (
              <div
                key={form.id}
                className={`relative bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow duration-200 min-h-[180px] cursor-pointer ${
                  isSelected(String(form.id))
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200"
                }`}
                onClick={() => handleSelect(String(form.id))}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-base font-medium text-gray-600">
                            #{form.id}
                          </span>
                          <span className="text-gray-400 mx-1">·</span>
                          <h3 className="text-lg font-medium text-gray-900 truncate max-w-[160px]">
                            {form.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {form.enabled === "true" ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                      <input
                        type="checkbox"
                        checked={isSelected(String(form.id))}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelect(String(form.id));
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        onClick={stopPropagation}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                    {form.description || "无表单描述"}
                  </p>

                  <div className="flex flex-col space-y-2 text-sm text-gray-500 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">提交数:</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {form.submissions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">创建于:</span>
                      <span className="text-xs">{form.createdAt}</span>
                    </div>
                  </div>

                  <div
                    className="mt-4 pt-3 border-t flex justify-end"
                    onClick={stopPropagation}
                  >
                    <DataActionMenu formId={form.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scroll>
    </Block>
  );
};

export default DataList;
