import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface DataActionMenuProps {
  formId: string | number;
  placement?: "bottom-end" | "bottom" | "bottom-start";
}

const DataActionMenu: React.FC<DataActionMenuProps> = ({
  formId,
  placement = "bottom-end",
}) => {
  const router = useRouter();

  const handleView = () => {
    console.log(`View form with ID: ${formId}`);
    // Navigate to form detail view
  };

  const handleEdit = () => {
    console.log(`Edit form with ID: ${formId}`);
    // Navigate to form edit page
    router.push(`/dashboard/form/${formId}/edit`);
  };

  const handleDelete = () => {
    console.log(`Delete form with ID: ${formId}`);
    // Show confirmation dialog and delete if confirmed
  };

  return (
    <Dropdown placement={placement}>
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
          onPress={handleView}
        >
          查看详情
        </DropdownItem>
        <DropdownItem
          key="edit"
          description="编辑此表单"
          startContent={<PencilSquareIcon className="h-4 w-4" />}
          onPress={handleEdit}
        >
          编辑表单
        </DropdownItem>
        <DropdownItem
          key="delete"
          description="永久删除此表单"
          color="danger"
          className="text-danger"
          startContent={<TrashIcon className="h-4 w-4" />}
          onPress={handleDelete}
        >
          删除表单
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DataActionMenu;
