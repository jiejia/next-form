import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import React from "react";
import { PageArgs } from "@/modules/form/types/list";
import { FormWithSubmissions } from "@/modules/form/types/list";

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PageArgs<FormWithSubmissions>;
  setData: (data: PageArgs<FormWithSubmissions>) => void;
  handleSearchReset: () => void;
  handleFilterSubmit: () => void;
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  data,
  setData,
  handleSearchReset,
  handleFilterSubmit,
}) => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" placement="center">
      <ModalContent>
        <ModalHeader>高级搜索</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="标题和描述"
                size="sm"
                value={data.keyword}
                onChange={(e) => setData({ ...data, keyword: e.target.value })}
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
                onChange={(e) => setData({ ...data, dateFrom: e.target.value })}
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
  );
};

export default AdvancedSearchModal;
