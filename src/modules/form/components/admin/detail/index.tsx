import { Form } from "@prisma/client";
import Block from "@/modules/common/components/shared/block";


export default function Index({form}: {form: Form}) {

    return (
        <div className="grid grid-rows-[1fr_1fr_4fr_56px] gap-4 h-full">
            <Block>
&nbsp;
            </Block>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4">
                <Block>
                &nbsp;
                </Block>
                <Block>
                &nbsp;
                </Block>
                <Block>
                &nbsp;
                </Block>
                <Block>
                &nbsp;
                </Block>
            </div>
            <Block>
            &nbsp;
            </Block>
            <Block>
            &nbsp;
            </Block>
        </div>
    );
}