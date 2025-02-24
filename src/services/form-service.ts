'use server';

import path from "path";
import { CommonService } from "@/services/common-service";

/**
 * Get control configs
 */
export async function getControlConfigs() {
    const jsonDirectory = path.join(process.cwd(), "src", "controls");
    return CommonService.loadControlsConfigFiles(jsonDirectory);
}