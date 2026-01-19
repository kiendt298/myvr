"use client";

import QuotationDetail from "@/app/(common)/_components/Quotations/QuotationDetail";
import useTableFetchData from "@/app/(common)/_hooks/useTableFetchData";
import {
  getModalStyle,
  QUOTATION_STATUSES,
} from "@/app/(common)/_utils/constant";
import { IQuotation } from "@/app/(server)/database/models/Quotation";
import {
  getQuotationsBySearchParams,
  removeQuotationById,
} from "@/app/(server)/services/quotationService";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faHomeAlt,
  faPlus,
  faSearch,
  faSortAmountDown,
  faSortAmountUpAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { searchParamsTransform, toDateString } from "../../_helpers/transform";
import DebouncedInput from "../DebounceInput";
import { BRIEF_SERVICES } from "../../_utils/service-info";
import { toast } from "react-toastify";

const QuotationsTable = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const pathName = usePathname();

  // Action Handlers
  const [selectedQuotation, setSelectedQuotation] = useState<IQuotation | null>(
    null,
  );
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [quotationToDelete, setQuotationToDelete] = useState<string | null>(
    null,
  );

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const viewQuotation = (id: string | null) => {
    const quotation = data.find((quote) => quote.id === id);
    if (!quotation) return;

    setSelectedQuotation(quotation);
  };

  const deleteQuotation = (id: string | null) => {
    setQuotationToDelete(id);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    if (quotationToDelete !== null) {
      try {
        await removeQuotationById(quotationToDelete);
        fetchData();
        toast.success("Xóa báo giá thành công");
      } catch (error: any) {
        toast.error(error.message ?? "Đã có lỗi xảy ra. Vui lòng thử lại");
      }
      setDeleteConfirmationVisible(false);
      setQuotationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
    setQuotationToDelete(null);
  };

  const handleCreateQuotation = () => {
    router.push("/ead/create-quotation");
  };

  // Pagination logic
  const page = useMemo(
    () =>
      searchParams?.page && parseInt(searchParams.page as string)
        ? (searchParams.page as string)
        : "1",
    [searchParams],
  );
  const size = useMemo(
    () => (searchParams?.size ? (searchParams.size as string) : "10"),
    [searchParams],
  );

  const limit = useMemo(
    () => (searchParams?.size ? (searchParams.size as string) : "10"),
    [searchParams],
  );
  const skip = useMemo(
    () => (parseInt(page) - 1) * parseInt(size),
    [page, size],
  );

  const order = useMemo(
    () => searchParams?.sortDirection || "DESC",
    [searchParams],
  );
  const field = useMemo(() => searchParams?.sortBy || "date", [searchParams]);

  const search = useMemo(() => searchParams?.search || "", [searchParams]);
  const briefService = useMemo(
    () => searchParams?.briefService || "",
    [searchParams],
  );
  const status = useMemo(() => searchParams?.status || "", [searchParams]);

  const paginationParams = useMemo(
    () => ({ limit: parseInt(limit), skip }),
    [searchParams],
  );
  const sortingParams = useMemo(() => ({ order, field }), [searchParams]);

  const [count, data, loading, error, fetchData] = useTableFetchData({
    action: getQuotationsBySearchParams,
    pagination: paginationParams,
    sorting: sortingParams,
    filtering: search as string,
    briefServiceTitle: briefService,
    quotationStatus:
      QUOTATION_STATUSES[status as keyof typeof QUOTATION_STATUSES],
  }) as [
    count: number,
    data: IQuotation[],
    loading: boolean,
    error: any,
    fetchData: () => Promise<void>,
  ];

  const numOfPages = useMemo(
    () => Math.ceil(count / Number(limit)),
    [count, limit],
  );

  const onPageChange = (page: number) => {
    router.push(
      `${pathName}?${searchParamsTransform(searchParamsHook, {
        page: page === 1 ? undefined : page,
      })}`,
      { scroll: false },
    );
  };

  // Sorting logic
  const handleSort = ({
    sortBy,
    sortDirection,
  }: {
    sortBy: string;
    sortDirection: "ASC" | "DESC";
  }) => {
    router.push(
      `${pathName}?${searchParamsTransform(searchParamsHook, {
        sortBy,
        sortDirection,
      })}`,
      { scroll: false },
    );
  };

  const handleBriefServiceChange = (event: any) => {
    router.push(
      `${pathName}?${searchParamsTransform(searchParamsHook, {
        briefService: event?.currentTarget?.value,
      })}`,
      { scroll: false },
    );
  };

  const handleQuotationStatusChange = (event: any) => {
    router.push(
      `${pathName}?${searchParamsTransform(searchParamsHook, {
        status: event?.currentTarget?.value,
      })}`,
      { scroll: false },
    );
  };

  const handleFilter = (event: any) => {
    router.push(
      `${pathName}?${searchParamsTransform(searchParamsHook, {
        search: event,
        page: event.length ? 1 : parseInt(page) === 1 ? undefined : page,
      })}`,
      { scroll: false },
    );
  };

  const removeFilter = () => {
    router.push(pathName);
  };

  // Render Table Rows
  const renderRows = () =>
    data.map((quote) => (
      <tr key={quote.id}>
        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white hover:bg-orange-100">
          {quote.simplified_id || ""}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {quote.customer_name}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {quote.phone}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {quote.place}
        </td>

        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white hover:bg-orange-100">
          {BRIEF_SERVICES.find((s) => s.id === quote.package)?.title}
        </td>
        <td className="px-4 py-2 text-sm text-right text-gray-700 bg-white hover:bg-orange-100">
          {quote?.estimated_cost?.toLocaleString()}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {quote.status}
        </td>
        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white hover:bg-orange-100">
          {toDateString(quote.date || "")}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {quote.saler}
        </td>
        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white">
          <button
            onClick={() => viewQuotation(quote?.id || null)}
            className="px-2 py-1 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
          >
            Xem
          </button>
          <a
            href={`/ead/create-quotation?id=${quote?.id || ""}`}
            className="px-2 py-1 mr-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition duration-150"
          >
            Sửa
          </a>
          <button
            onClick={() => deleteQuotation(quote?.id || null)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150"
          >
            Xóa
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <h1 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light text-center mt-8 mb-4">
        WELCOME ADMIN!
      </h1>
      <>
        <div className="flex items-center mb-4" id="modals">
          <a
            href="/ead/home"
            className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors mr-4 py-2 px-3"
          >
            <FontAwesomeIcon icon={faHomeAlt} className="w-4 h-4" />
          </a>
          <h2 className="text-3xl font-extrabold text-gray-600 uppercase font-sans">
            DANH SÁCH BÁO GIÁ
          </h2>
        </div>

        {/* Sort & Filter & Add */}
        <div className="flex flex-wrap items-center justify-between my-6 pb-4 border-b border-gray-400 border-dashed">
          <div className="inline-flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <DebouncedInput
                type="text"
                placeholder="Tìm theo từ khoá bất kỳ..."
                onChange={(e) => handleFilter(e)}
              />
              <button
                className="bg-white p-2 px-4 text-gray-500 transition-colors"
                disabled
              >
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
              </button>
            </div>

            <select
              className="px-4 py-3 border border-gray-300 rounded-lg text-black max-w-[15rem]"
              onChange={(e) => handleBriefServiceChange(e)}
              value={briefService}
            >
              <option value="" key={"default"}>
                Tất cả gói
              </option>
              {BRIEF_SERVICES.map((item) => {
                return (
                  <option value={item?.id} key={item?.id}>
                    {item?.title}
                  </option>
                );
              })}
            </select>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg text-black"
              onChange={(e) => handleQuotationStatusChange(e)}
              value={status}
            >
              <option key="default" value="">
                Tất cả status
              </option>
              {Object.entries(QUOTATION_STATUSES).map((item) => {
                const [key, value] = item;
                return (
                  <option value={key} key={key}>
                    {value}
                  </option>
                );
              })}
            </select>

            <button
              className="flex items-center px-4 py-2 bg-blue-100 text-gray-600 font-semibold rounded-lg hover:bg-blue-200 focus:outline-none transition-colors"
              onClick={() =>
                handleSort({
                  sortBy: "date",
                  sortDirection:
                    field === "date"
                      ? order === "ASC"
                        ? "DESC"
                        : "ASC"
                      : "DESC",
                })
              }
            >
              <FontAwesomeIcon
                icon={
                  field === "date" && order === "ASC"
                    ? faSortAmountUpAlt
                    : faSortAmountDown
                }
                className="mr-2 w-4 h-4"
              />
              Thời gian
            </button>

            <button
              className="flex items-center px-4 py-2 bg-blue-100 text-gray-600 font-semibold rounded-lg hover:bg-blue-200 focus:outline-none transition-colors"
              onClick={() =>
                handleSort({
                  sortBy: "estimated_cost",
                  sortDirection:
                    field === "estimated_cost"
                      ? order === "ASC"
                        ? "DESC"
                        : "ASC"
                      : "DESC",
                })
              }
            >
              <FontAwesomeIcon
                icon={
                  field === "estimated_cost" && order === "ASC"
                    ? faSortAmountUpAlt
                    : faSortAmountDown
                }
                className="mr-2 w-4 h-4"
              />
              Giá tiền
            </button>

            <button
              className="flex items-center px-4 py-2 text-red-600 border-red-600 border-2 font-semibold rounded-lg focus:outline-none transition-colors"
              onClick={removeFilter}
            >
              Xóa filter
            </button>
          </div>

          <button
            onClick={handleCreateQuotation}
            className="flex items-center px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 w-4 h-4" />
            Tạo báo giá
          </button>
        </div>

        {/* Table */}
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-blue-100 border-b border-gray-400">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Khách hàng
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                SĐT
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Địa chỉ
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Gói dịch vụ
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                Giá tiền
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Trạng thái
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Thời gian
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Saler
              </th>
              <th className="px-4 w-48 py-2 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            {/* First Button */}
            <button
              onClick={() => onPageChange(1)}
              disabled={parseInt(page) === 1}
              className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => onPageChange(parseInt(page) - 1)}
              disabled={parseInt(page) === 1}
              className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {/* Page Numbers */}
            {Array.from({
              length: numOfPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`px-3 py-2 rounded ${
                  index + 1 === parseInt(page)
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => onPageChange(parseInt(page) + 1)}
              disabled={parseInt(page) === numOfPages}
              className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>

            {/* Last Button */}
            <button
              onClick={() => onPageChange(numOfPages)}
              disabled={parseInt(page) === numOfPages}
              className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>

          <div>
            <select
              className="text-base text-black p-4"
              value={size}
              onChange={(e) => {
                router.push(
                  `${pathName}?${searchParamsTransform(searchParamsHook, {
                    size: Number(e.target.value),
                  }).toString()}`,
                  { scroll: false },
                );
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Hiển thị {pageSize}
                </option>
              ))}
            </select>
          </div>

          {/* Back to admin home */}
          <a
            href="/ead/home"
            className="text-right mt-4 text-blue-500 underline"
          >
            Quay lại admin home
          </a>
        </div>
      </>
      {/* Quotation Detail Modal */}
      <Modal
        isOpen={!!selectedQuotation}
        onRequestClose={() => setSelectedQuotation(null)}
        contentLabel="Quotation Detail"
        style={getModalStyle("medium")}
      >
        <QuotationDetail
          data={selectedQuotation}
          htmlContent={selectedQuotation?.content}
        />
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmationVisible}
        onRequestClose={cancelDelete}
        contentLabel="Delete Confirmation"
        style={getModalStyle("small")}
      >
        <h4 className="text-xl font-semibold text-center">Xóa báo giá</h4>
        <p className="text-gray-700 text-center">
          Bạn có chắc chắn muốn xóa báo giá này?
        </p>
        <div className="flex justify-center space-x-4 mt-4 ">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Xóa
          </button>
          <button
            onClick={cancelDelete}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </Modal>
    </>
  );
};

export default QuotationsTable;
