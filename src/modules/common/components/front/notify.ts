import {addToast} from "@heroui/toast";

/**
 * Notify message
 *
 * @param message
 * @param color
 * @param description
 */
export const notify = function (message: string, color:"default"| "primary"| "secondary"| "success"| "warning"| "danger" = 'success', description: string = ''): void{
    addToast({
        title: message,
        description: description,
        color: color
    });
}