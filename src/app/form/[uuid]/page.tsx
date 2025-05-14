import Index from "@/modules/form/components/front/detail";
import {FormService} from "@/modules/form/services/form-service";
import {notFound} from "next/navigation";
import {Form as FormType} from "@/modules/form/types/form";


export default async function Uuid({params}: { params: { uuid: string } }) {
    const schemas = await FormService.getControlSchemas();
    const form = await FormService.getFormByUuid(params.uuid);

    if (!form) {
        notFound();
    }

    // Ensure fields exists as an array
    if (!form.fields) {
        form.fields = [];
    }

    return (
        <>
            <Index form={form as FormType} schemas={schemas}/>
        </>
    );
}
