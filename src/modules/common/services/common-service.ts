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

    public static notify(message: string, type:string = 'Success') {
        addToast({
            title: message,
            description: type,
            color: 'primary',
        });
    }
}