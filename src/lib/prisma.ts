import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// 创建日志目录
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, 'prisma-queries.log');

// 合并 SQL 语句和参数的函数
function formatSqlWithParams(query: string, params: string): string {
    try {
        const parsedParams = JSON.parse(params);
        let formattedQuery = query;

        // 替换参数占位符 $1, $2, $3...
        parsedParams.forEach((param: any, index: number) => {
            const placeholder = `$${index + 1}`;
            const value = typeof param === 'string' ? `'${param}'` : String(param);
            formattedQuery = formattedQuery.replace(placeholder, value);
        });

        return formattedQuery;
    } catch (error) {
        // 如果解析失败，返回原始查询和参数
        return `${query} -- PARAMS: ${params}`;
    }
}

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

// 监听查询事件并写入完整的 SQL 语句
prisma.$on('query', (e) => {
    const completeSql = formatSqlWithParams(e.query, e.params);
    const logEntry = `[${new Date().toISOString()}] QUERY: ${completeSql} | DURATION: ${e.duration}ms\n`;
    fs.appendFileSync(logFilePath, logEntry);
});

prisma.$on('error', (e) => {
    const logEntry = `[${new Date().toISOString()}] ERROR: ${e.message}\n`;
    fs.appendFileSync(logFilePath, logEntry);
});

prisma.$on('info', (e) => {
    const logEntry = `[${new Date().toISOString()}] INFO: ${e.message}\n`;
    fs.appendFileSync(logFilePath, logEntry);
});

prisma.$on('warn', (e) => {
    const logEntry = `[${new Date().toISOString()}] WARN: ${e.message}\n`;
    fs.appendFileSync(logFilePath, logEntry);
});

export default prisma;