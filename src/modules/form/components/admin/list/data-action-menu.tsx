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
import { useTranslations } from "next-intl";
import { notify } from "@/modules/common/components/admin/notify";
import { FormService } from "@/modules/form/services/form-service";
import { PageArgs, FormWithSubmissions } from "@/modules/form/types/list";

interface DataActionMenuProps {
  formId: string | number;
  placement?: "bottom-end" | "bottom" | "bottom-start";
  updateData?: (updatedData: Partial<PageArgs<FormWithSubmissions>>) => void;
  listData?: PageArgs<FormWithSubmissions>;
}

const DataActionMenu: React.FC<DataActionMenuProps> = ({
  formId,
  placement = "bottom-end",
  updateData,
  listData,
}) => {
  const router = useRouter();

  const t = useTranslations("Dashboard");

  const handleView = () => {
    if (listData) {
      // Find the form in the listData
      const form = listData.items.find((item) => item.id === Number(formId));
      if (form) {
        // Open in a new tab
        window.open(`/form/${form.uuid}`, "_blank");
      }
    }
  };

  const handleEdit = () => {
    console.log(`Edit form with ID: ${formId}`);
    // Navigate to form edit page
    router.push(`/dashboard/form/${formId}/edit`);
  };

  const handleDeleteForm = async (id: number) => {
    if (confirm(t("Are you sure to delete it?"))) {
      try {
        await FormService.deleteForms([id]);
        notify(t("Delete successfully"), "success");

        // If updateData prop exists, update local state instead of reloading page
        if (updateData && listData) {
          const updatedItems = listData.items.filter((item) => item.id !== id);
          updateData({
            items: updatedItems,
            count: listData.count - 1,
          });
        } else {
          // Fall back to reloading if updateData isn't provided
          window.location.reload();
        }
      } catch (error) {
        if (error instanceof Error) {
          notify(error.message, "danger");
        } else {
          notify(t("An unknown error occurred"), "danger");
        }
      }
    }
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
          onPress={() => handleDeleteForm(Number(formId))}
        >
          删除表单
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DataActionMenu;
