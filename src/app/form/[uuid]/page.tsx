import Index from "@/modules/form/components/front/detail";
import {FormService} from "@/modules/form/services/form-service";
import {notFound} from "next/navigation";
import {Form as FormType} from "@/modules/form/types/form";


export default async function Uuid({params}: { params: { uuid: string } }) {
    const schemas = await FormService.getControlSchemas();
    let form = await FormService.getFormByUuid(params.uuid);

    if (! form) {
        notFound();
    } else {
        form = form as FormType;
    }

    return (
        <>
            <Index form={form} schemas={schemas}/>
        </>
    );
}
