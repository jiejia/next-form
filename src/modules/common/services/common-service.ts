import { Control } from '@/modules/form/types/form';
import fs from "fs";
import path from "path";
import {addToast} from "@heroui/toast";

/**
 * Common service
 */
export class CommonService
{
    /**
     * Load control config files
     *
     * @param directory
     */
    public static loadControlsConfigFiles(directory: string): Control[]
    {
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

    /**
     * Notify message
     *
     * @param message
     * @param color
     * @param description
     */
    public static notify(message: string, color:"default"| "primary"| "secondary"| "success"| "warning"| "danger" = 'success', description: string = ''): void{
        addToast({
            title: message,
            description: description,
            color: color
        });
    }
}