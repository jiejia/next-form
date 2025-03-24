export const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
    true: "success",
    false: "danger",
};

export const statusTextMap: Record<string, string> = {
    true: "已开启",
    false: "已关闭",
};

export const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "title",
        label: "表单名称",
    },
    {
        key: "createdAt",
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

export const initialData = {
    perPage: 20,
    sort: "id_desc",
    status: [0, 1],
};

export const sortOptions = [
    { key: "id_desc", text: "按ID/创建时间倒序" },
    { key: "id_asc", text: "按ID/创建时间顺序" },
    { key: "title_desc", text: "按名称倒序" },
    { key: "title_asc", text: "按名称顺序" },
    { key: "submissions_desc", text: "按提交数倒序" },
    { key: "submissions_asc", text: "按提交数顺序" },
    { key: "enabled_desc", text: "按状态倒序" },
    { key: "enabled_asc", text: "按状态顺序" },
];