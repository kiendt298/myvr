import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPlus,
  faUsers,
  faUserPlus,
  faFileInvoice,
  faCalendarPlus,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { BRIEF_SERVICES } from "@/app/(common)/_utils/service-info";
import Link from "next/link";
import { getEadHomeStatsTable } from "@/app/(server)/services/statService";
import MonthSelect from "./MonthSelect";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const monthQuery = searchParams?.["month"] || "3";
  console.log(searchParams);
  const monthData = (await getEadHomeStatsTable(
    parseInt(monthQuery as string),
  )) as MonthData[];

  const formatCurrency = (value?: number) => {
    return value ? new Intl.NumberFormat("vi-VN").format(value) : 0;
  };

  const formatDate = (month: string) => {
    const [mm, yyyy] = month.split(" / ");
    return `Tháng ${mm} ${yyyy}`;
  };

  const truncateText = (text: string) => {
    const words = text.split(" ");
    let leftPart = words[0] + " " + words[1];
    let rightPart = words[words.length - 2] + " " + words[words.length - 1];
    return `<span class="font-semibold text-gray-500">${leftPart} ... <br>${rightPart}<span>`;
  };

  return (
    <>
      <div className="w-full bg-gray-100 text-center mt-16">
        <h1 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light">
          WELCOME ADMIN!
        </h1>
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Tác vụ */}
          <div className="bg-gradient-to-b to-gray-100 from-gray-300 rounded-lg p-8 w-full md:w-1/4">
            <h2 className="text-center text-3xl font-bold main-color mb-3">
              Tác vụ
            </h2>
            <div className="space-y-6">
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#8d817a] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/quotations"}
              >
                <span className="text-lg">Danh sách báo giá</span>
                <FontAwesomeIcon
                  icon={faFileInvoice}
                  className="text-white w-4 h-4"
                />
              </Link>
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#7a8d7f] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/create-quotation"}
              >
                <span className="text-lg">Tạo báo giá</span>
                <FontAwesomeIcon
                  icon={faCalendarPlus}
                  className="text-white w-4 h-4"
                />
              </Link>
              <hr />
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#8d817a] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/users"}
              >
                <span className="text-lg">Danh sách User</span>
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-white w-4 h-4"
                />
              </Link>
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#7a8d7f] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/create-user"}
              >
                <span className="text-lg">Tạo User</span>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-white w-4 h-4"
                />
              </Link>
              <hr />
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#8d817a] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/posts"}
              >
                <span className="text-lg">Danh sách bài viết</span>
                <FontAwesomeIcon icon={faList} className="text-white w-4 h-4" />
              </Link>
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#7a8d7f] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/create-post"}
              >
                <span className="text-lg">Tạo bài viết</span>
                <FontAwesomeIcon icon={faPlus} className="text-white w-4 h-4" />
              </Link>
              <hr />
              <Link
                className="flex items-center justify-between w-full py-3 px-4 bg-[#8d817a] text-white rounded-md shadow-md hover:bg-[#546488] transition"
                href={"/ead/contacts"}
              >
                <span className="text-lg">Danh sách liên hệ</span>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-white w-4 h-4"
                />
              </Link>
            </div>
          </div>

          {/* Right Column - Số liệu */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-3/4">
            <h2 className="text-center text-3xl font-bold main-color mb-3">
              Số liệu tổng kết
            </h2>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 w-36 text-center text-sm font-semibold text-gray-700">
                    Time
                  </th>
                  <th className="px-4 py-2 w-36 text-left text-sm font-semibold text-gray-700">
                    Dịch vụ
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                    Người dùng mới
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                    Báo giá tạo mới
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                    Báo giá đã đóng
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                    Form liên hệ
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                    Doanh thu
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthData.map((monthData, index) => {
                  const month = Object.keys(monthData)[0];
                  const services = monthData[month];
                  const rowSpanCount = services.length;
                  const totalRevenue = services.reduce(
                    (acc, service) => acc + (service.data.totalMoney || 0),
                    0,
                  );

                  return (
                    <React.Fragment key={index}>
                      {services.map((service, serviceIndex) => (
                        <tr
                          key={serviceIndex}
                          className={`${
                            serviceIndex === 4 ? "border-b border-gray-400" : ""
                          }`}
                        >
                          {serviceIndex === 0 && (
                            <td
                              rowSpan={rowSpanCount}
                              className="px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-white"
                            >
                              {formatDate(month)}
                              <br />
                              <br />
                              Tổng: <br />
                              <b>{formatCurrency(totalRevenue)}</b>
                            </td>
                          )}
                          <td
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                            dangerouslySetInnerHTML={{
                              __html: truncateText(service.title || ""),
                            }}
                          ></td>
                          <td className="px-4 py-2 text-sm text-center text-gray-700 hover:bg-orange-100">
                            {service.data.newUsers}
                          </td>
                          <td className="px-4 py-2 text-sm text-center text-gray-700 hover:bg-orange-100">
                            {service.data.createdQuotations}
                          </td>
                          <td className="px-4 py-2 text-sm text-center text-gray-700 hover:bg-orange-100">
                            {service.data.closedQuotations}
                          </td>
                          <td className="px-4 py-2 text-sm text-center text-gray-700 hover:bg-orange-100">
                            {service.data.contactForms}
                          </td>
                          <td className="px-4 py-2 text-sm text-right font-medium text-gray-700 hover:bg-orange-100">
                            {formatCurrency(service.data.totalMoney)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <MonthSelect param={monthQuery as string}>
              <option key="last-3-months" value={3}>
                3 tháng trước
              </option>
              <option key="last-6-months" value={6}>
                6 tháng trước
              </option>
              <option key="last-9-months" value={9}>
                9 tháng trước
              </option>
              <option key="last-year" value={12}>
                1 năm trước
              </option>
            </MonthSelect>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

interface Service {
  title: string;
}

interface ServiceData {
  newUsers: number;
  createdQuotations: number;
  closedQuotations: number;
  contactForms: number;
  totalMoney: number;
}

interface ServiceWithData {
  title?: string;
  data: ServiceData;
}

interface MonthData {
  [month: string]: ServiceWithData[];
}

const mockData: MonthData[] = [
  {
    "10 / 2024": [
      {
        title: BRIEF_SERVICES[0]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 100000000,
        },
      },
      {
        title: BRIEF_SERVICES[1]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 10000000,
        },
      },
      {
        title: BRIEF_SERVICES[2]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 100000000,
        },
      },
      {
        title: BRIEF_SERVICES[3]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 10000000,
        },
      },
    ],
  },
  {
    "09 / 2024": [
      {
        title: BRIEF_SERVICES[0]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 200000000,
        },
      },
      {
        title: BRIEF_SERVICES[1]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 200000000,
        },
      },
      {
        title: BRIEF_SERVICES[2]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 20000000,
        },
      },
      {
        title: BRIEF_SERVICES[3]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 200000000,
        },
      },
    ],
  },
  {
    "08 / 2024": [
      {
        title: BRIEF_SERVICES[0]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 300000000,
        },
      },
      {
        title: BRIEF_SERVICES[1]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 300000000,
        },
      },
      {
        title: BRIEF_SERVICES[2]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 30000000,
        },
      },
      {
        title: BRIEF_SERVICES[3]?.title,
        data: {
          newUsers: 10,
          createdQuotations: 15,
          closedQuotations: 20,
          contactForms: 80,
          totalMoney: 30000000,
        },
      },
    ],
  },
];
