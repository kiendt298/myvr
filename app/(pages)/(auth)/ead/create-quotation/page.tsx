import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import QuotationForm from "@/app/(common)/_components/Quotations/QuotationForm";
import { IQuotation } from "@/app/(server)/database/models/Quotation";
import { getQuotationDetailById } from "@/app/(server)/services/quotationService";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function CreateQuotationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(options);

  if (!session) return <LoadingOrUnauthenticated status="unauthenticated" />;

  let quotationDetail: IQuotation | undefined = undefined;
  const { id } = searchParams;
  try {
    if (id) quotationDetail = await getQuotationDetailById(id as string);
  } catch (error) {
    return <></>;
  }

  return <QuotationForm quotationDetail={quotationDetail} />;
}
