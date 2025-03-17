import { Control } from '@/modules/form/types/form';
import {loadControlsConfigFiles} from '@/modules/common/actions/common-action';
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
    public static async loadControlsConfigFiles(directory: string): Promise<Control[]> {
        return loadControlsConfigFiles(directory);
    }
}