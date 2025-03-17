import { Form } from "@/modules/form/types/form";
import {
    getControlConfigs as getControlConfigsAction,
    createForm as createFormAction,
    updateForm as updateFormAction,
    deleteForms as deleteFormsAction,
    getForms as getFormsAction,
    getFormCount as getFormCountAction,
    getFormSubmissions as getFormSubmissionsAction,
    getFormSubmissionCount as getFormSubmissionCountAction,
    getFormById as getFormByIdAction
} from "@/modules/form/actions/form-action";

/**
 * Form service
 */
export class FormService {
    /**
     * Get control configs
     */
    public static async getControlConfigs() {
        return getControlConfigsAction();
    }

    /**
     * Create form
     *
     * @param form
     */
    public static async createForm(form: Form) {
        return createFormAction(form);
    }

    /**
     * Update form
     *
     * @param form
     */
    public static async updateForm(form: Form) {
        return updateFormAction(form);
    }

    /**
     * Delete forms
     *
     * @param ids
     */
    public static async deleteForms(ids: number[]) {
        return deleteFormsAction(ids);
    }

    /**
     * Get forms
     *
     * @param args
     */
    public static async getForms(args: object = {}) {
        return getFormsAction(args);
    }

    /**
     * Get form count
     *
     * @param args
     */
    public static async getFormCount(args: object = {}) {
        return getFormCountAction(args);
    }

    /**
     * Get form submissions
     *
     * @param args
     */
    public static async getFormSubmissions(args: object = {}) {
        return getFormSubmissionsAction(args);
    }

    /**
     * Get form submission count
     *
     * @param args
     */
    public static async getFormSubmissionCount(args: object = {}) {
        return getFormSubmissionCountAction(args);
    }

    /**
     * Get form by id
     *
     * @param id
     */
    public static async getFormById(id: number) {
        return getFormByIdAction(id);
    }
}