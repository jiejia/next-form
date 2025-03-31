import Index from "@/modules/form/components/front/detail";
import {FormService} from "@/modules/form/services/form-service";


export default async function Uuid({params}: { params: { uuid: string } }) {
    const schemas = await FormService.getControlSchemas();
    const form = await FormService.getFormByUuid(params.uuid);

    return (
        <>
            <Index form={form} schemas={schemas}/>
        </>
    );
}
