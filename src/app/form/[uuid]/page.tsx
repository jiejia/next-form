import Index from "@/modules/form/components/front/detail";


export default function Uuid({ params }: { params: { uuid: string } }) {
  return (
    <>
        <Index uuid={params.uuid}/>
    </>
  );
}
