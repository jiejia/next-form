import fs from 'fs';
import path from 'path';
import {Control} from "@/modules/form/types/form"

export function loadControlsConfigFiles(directory: string): Control[] {
    const folders = fs.readdirSync(directory);
    const configData: Control[] = [];

    folders.forEach(folder => {
        const folderPath = path.join(directory, folder);
        const stat = fs.statSync(folderPath);

        if (stat.isDirectory()) {
            const configFilePath = path.join(folderPath, 'config.json');

            if (fs.existsSync(configFilePath)) {
                const data = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
                configData.push(data);
            }
        }
    });

    return configData;
}

type CreateSchemaFunction = () => unknown; // 你可能需要根据实际的 schema 结构来调整这个类型

export interface PluginSchema {
    pluginName: string;
    createSchema: CreateSchemaFunction;
}

function requireDynamically(path: string) {
    path = path.split('\\').join('/'); // Normalize windows slashes
    return eval(`require('${path}');`); // Ensure Webpack does not analyze the require statement
}


export async function loadControlsSchemaFiles(pluginsDir: string): Promise<PluginSchema[]> {

    const schemas: PluginSchema[] = [];

    // 读取 plugins/controls 目录
    const pluginFolders = fs.readdirSync(pluginsDir, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const pluginName of pluginFolders) {

        const schemaPath = path.join(pluginsDir, pluginName, 'schema.ts');

        // 检查 schema.ts 文件是否存在
        if (fs.existsSync(schemaPath)) {
            try {
                // 动态导入 schema.ts 文件
                const schemaModule = await import(`@/controls/${pluginName}/schema.ts`)

                // 检查是否存在 createSchema 函数
                if (typeof schemaModule.createSchema === 'function') {
                    schemas.push(<PluginSchema>{
                        pluginName: pluginName,
                        createSchema: schemaModule.createSchema
                    });
                } else {
                    console.warn(`Warning: createSchema function not found in ${schemaPath}`);
                }
            } catch
                (error) {
                console.error(`Error loading schema for plugin ${pluginName}:`, error);
            }
        }
    }

    // console.log(schemas, 'schemas2')


    return schemas;
}