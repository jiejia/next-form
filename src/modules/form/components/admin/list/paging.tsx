import { Pagination, Select, SelectItem } from "@heroui/react";
import Block from "@/modules/common/components/shared/block";
import clsx from "clsx";

interface PagingProps {
  count: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Paging: React.FC<PagingProps> = ({
  count,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  return (
    <Block className="grid sm:grid-cols-[80px_1fr_80px] grid-cols-[1fr] pt-3 gap-2">
      <div className="hidden sm:block justify-items-center content-center">
        Total {count}
      </div>
      <div className="justify-items-center content-center">
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.max(1, Math.ceil(count / perPage))}
          onChange={(page) => onPageChange(page)}
          size={"sm"}
          className={clsx("", {
            invisible: Math.ceil(count / perPage) == 0,
          })}
        />
      </div>
      <div className="hidden sm:block justify-items-center content-center">
        <Select
          disallowEmptySelection
          selectionMode="single"
          className="max-w-xs"
          size="sm"
          defaultSelectedKeys={[perPage.toString()]}
          onChange={onPerPageChange}
        >
          {[20, 30, 50, 100].map((size) => (
            <SelectItem key={size} textValue={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </Select>
      </div>
    </Block>
  );
};

export default Paging;
