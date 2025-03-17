'use server';

import { Control } from '@/modules/form/types/form';
import { promises as fs } from 'fs';
import path from "path";

/**
 * 加载控件配置文件
 *
 * @param directory
 */
export async function loadControlsConfigFiles(directory: string): Promise<Control[]> {
    const folders = await fs.readdir(directory);
    const configData: Control[] = [];

    for (const folder of folders) {
        const folderPath = path.join(directory, folder);
        const stat = await fs.stat(folderPath);

        if (stat.isDirectory()) {
            const configFilePath = path.join(folderPath, 'config.json');

            try {
                const fileExists = await fs.access(configFilePath)
                    .then(() => true)
                    .catch(() => false);

                if (fileExists) {
                    const fileContent = await fs.readFile(configFilePath, 'utf8');
                    const data = JSON.parse(fileContent);
                    configData.push(data);
                }
            } catch (error) {
                console.error(`Error reading config file ${configFilePath}:`, error);
            }
        }
    }

    return configData;
}