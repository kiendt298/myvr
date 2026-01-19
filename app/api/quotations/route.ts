import { apiHandler } from '@/app/(common)/_helpers/api-handler';

const { POST } = apiHandler({
	POST: getQuotationsBySearchParams,
});

export { POST };

async function getQuotationsBySearchParams({
    pagination,
    sorting,
    filtering
}: {
	pagination: Record<string, any>;
	sorting: Record<string, any>;
	filtering: string;
}) {
    
}
