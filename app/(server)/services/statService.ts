import { BRIEF_SERVICES } from "@/app/(common)/_utils/service-info";
import { dbConnect } from "../database/db-connection";
import { getContactStatsForEadHome } from "./contactService";
import { getQuotationStatsForEadHome } from "./quotationService";

export async function getEadHomeStatsTable(months: number) {
  await dbConnect();

  const currentDate = new Date();
  const greaterThan = new Date(currentDate);
  greaterThan.setMonth(currentDate.getMonth() - months);

  const quotationStats: Record<string, any>[] =
    await getQuotationStatsForEadHome(greaterThan);
  const contactStats: Record<string, any>[] =
    await getContactStatsForEadHome(greaterThan);
  const monthData: Record<string, any>[] = [];

  while (currentDate > greaterThan) {
    monthData.push({
      [`${currentDate.getMonth() + 1} / ${currentDate.getFullYear()}`]: [],
    });
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  monthData.forEach((item: Record<string, any>, index: number) => {
    const [month, year] = Object.keys(item)[0].split("/");
    for (const service of BRIEF_SERVICES) {
      const quotationDataByService = quotationStats.find(
        (item) =>
          item._id.month === parseInt(month) &&
          item._id.year === parseInt(year) &&
          item._id.package === service.id,
      );
      const contactDataByService = contactStats.find(
        (item) =>
          item._id.month === parseInt(month) &&
          item._id.year === parseInt(year) &&
          item._id.package === service.id,
      );
      monthData[index][`${month}/${year}`]?.push({
        title: service.title,
        data: {
          newUsers: 10,
          createdQuotations: quotationDataByService?.numOfNewQuotations || 0,
          closedQuotations: quotationDataByService?.numOfClosedQuotations || 0,
          contactForms: contactDataByService?.numOfNewContact || 0,
          totalMoney: quotationDataByService?.totalEstimatedCost || 0,
        },
      });
    }
  });

  return monthData;
}
