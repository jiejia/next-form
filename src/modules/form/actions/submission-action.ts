'use server';

import prisma from "@/lib/prisma";
import {QueryArgs} from "@/modules/common/types/prisma";
import {PaginatedResult, SearchConditions} from "@/modules/form/types/form";

/**
 * 根据表单ID和版本号获取提交记录的数据字段元素数量
 * @param formId - 表单ID
 * @param version - 表单版本号
 * @returns 数据字段元素数量，如果记录不存在返回0
 */
export async function getSubmissionDataElementCount(formId: number, version: number): Promise<number> {
    try {
        const submission = await prisma.formSubmission.findFirst({
            where: {
                formId: formId,
                version: version
            },
            select: {
                data: true
            }
        });

        if (!submission || !submission.data) {
            return 0;
        }

        // 检查data是否为数组
        if (Array.isArray(submission.data)) {
            return submission.data.length;
        }

        // 如果data是对象，返回对象属性数量
        if (typeof submission.data === 'object') {
            return Object.keys(submission.data).length;
        }

        // 其他情况返回0
        return 0;
    } catch (error) {
        console.error('获取提交记录数据元素数量失败:', error);
        return 0;
    }
}

/**
 * Get submissions with pagination support
 *
 * @param args - Query arguments including pagination parameters
 */
export async function getSubmissionsWithPagination(args: QueryArgs = {}): Promise<PaginatedResult> {
    const hasSelect = args.select !== undefined;

    // Set default orderBy to id desc if not provided
    const defaultOrderBy = { id: 'desc' as const };
    const orderBy = args.orderBy || defaultOrderBy;

    // 提取分页参数
    const page = Math.max(1, Math.floor((args.skip || 0) / (args.take || 10)) + 1);
    const pageSize = args.take || 10;
    const skip = args.skip || 0;

    // 构建查询条件（不包含分页参数）
    const queryConditions = {
        where: args.where,
        orderBy,
    };

    // 并行执行数据查询和总数查询
    const [data, total] = await Promise.all([
        // 获取分页数据
        hasSelect
            ? prisma.formSubmission.findMany({
                ...queryConditions,
                skip,
                take: pageSize,
                select: {
                    ...args.select,
                }
            })
            : prisma.formSubmission.findMany({
                ...queryConditions,
                skip,
                take: pageSize,
                include: {
                    ...(args.include || {})
                }
            }),
        // 获取总数
        prisma.formSubmission.count({
            where: args.where
        })
    ]);

    // 计算分页信息
    const totalPages = Math.ceil(total / pageSize);

    return {
        data,
        pagination: {
            total,
            page,
            pageSize,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
}

/**
 * List submissions with optional keyword search and pagination
 *
 * @param keyword
 * @param version
 * @param formId
 * @param page
 * @param pageSize
 */
export async function getList(version: number, formId: number, keyword?: string, page: number = 1, pageSize: number = 20)
{
    const elementCount = await getSubmissionDataElementCount(formId, version);

    // 构建 where 条件
    const whereCondition: SearchConditions = {
        formId: formId,
        version: version
    };

    if (keyword && keyword.trim()) {
        const searchConditions = [];

        for (let i = 0; i < elementCount; i++) {
            searchConditions.push({
                data: {
                    path: [i.toString(), 'value'],
                    string_contains: keyword.trim()
                }
            });
        }

        whereCondition.OR = searchConditions;
    }

    console.log('whereCondition', whereCondition);

    return await getSubmissionsWithPagination({
        where: whereCondition,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
}

/**
 * Get field titles from submission data by form ID and version
 * @param formId - Form ID
 * @param version - Form version number
 * @returns Array of field titles, returns empty array if no record exists
 */
export async function getSubmissionFieldTitles(formId: number, version: number): Promise<string[]> {
    try {
        const submission = await prisma.formSubmission.findFirst({
            where: {
                formId: formId,
                version: version
            },
            select: {
                data: true
            }
        });

        if (!submission || !submission.data) {
            return [];
        }

        // Check if data is an array
        if (Array.isArray(submission.data)) {
            // Extract title field from each element
            return submission.data
                .map((item: any) => item?.title)
                .filter((title: any): title is string => typeof title === 'string' && title.trim() !== '');
        }

        // Return empty array if data is not an array
        return [];
    } catch (error) {
        console.error('Failed to get submission field titles:', error);
        return [];
    }
}