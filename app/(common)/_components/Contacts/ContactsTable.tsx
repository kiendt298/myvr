"use client";

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faSortAmountDown,
  faSortAmountUpAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DebouncedInput from "../DebounceInput";
import { BRIEF_SERVICES } from "../../_utils/service-info";
import { CONTACT_STATUSES, getModalStyle } from "../../_utils/constant";
import { IContactRequest } from "@/app/(server)/database/models/ContactRequest";
import {
  getContactsBySearchParams,
  removeContactRequestById,
} from "@/app/(server)/services/contactService";
import useTableFetchData from "../../_hooks/useTableFetchData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParamsTransform, toDateString } from "../../_helpers/transform";
import { toast } from "react-toastify";

const ContactsTable = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const pathName = usePathname();

  // State management
  const [selectedContact, setSelectedContact] =
    useState<IContactRequest | null>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const viewContact = (id: string | undefined) => {
    const contact = data.find((item) => item.id === id) || null;
    if (!contact) return;

    setSelectedContact(contact);
    setOpenModal(true);
  };

  const deleteContact = (id: string | undefined) => {
    if (!id) return;

    setContactToDelete(id);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete !== null) {
      try {
        await removeContactRequestById(contactToDelete);
        fetchData();
        toast.success("Xóa liên hệ thành công");
      } catch (error: any) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
      }

      setDeleteConfirmationVisible(false);
      setContactToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
    setContactToDelete(null);
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
  const status = useMemo(() => searchParams?.status || "", [searchParams]);
  const briefService = useMemo(
    () => searchParams?.briefService || "",
    [searchParams],
  );

  const paginationParams = useMemo(
    () => ({ limit: parseInt(limit), skip }),
    [searchParams],
  );
  const sortingParams = useMemo(() => ({ order, field }), [searchParams]);

  const [count, data, loading, error, fetchData] = useTableFetchData({
    action: getContactsBySearchParams,
    pagination: paginationParams,
    sorting: sortingParams,
    filtering: search as string,
    briefServiceId: briefService,
    status: CONTACT_STATUSES[status as keyof typeof CONTACT_STATUSES],
  }) as [
    count: number,
    data: IContactRequest[],
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

  const handlePostStatusChange = (event: any) => {
    router.push(
      `${pathName}?${searchParamsTransform(searchParamsHook, {
        status: event?.currentTarget?.value,
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

  // Render rows
  const renderRows = () =>
    data.map((contact) => (
      <tr key={contact.id}>
        <td className="px-4 py-2 text-sm text-gray-700">
          {contact.simplified_id}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{contact.name}</td>
        <td className="px-4 py-2 text-sm text-gray-700">
          {BRIEF_SERVICES.find((s) => s.id === contact.package_id)?.title}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{contact.phone}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{contact.email}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{contact.message}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{contact.status}</td>
        <td className="px-4 py-2 text-sm text-gray-700">
          {toDateString(contact.date)}
        </td>
        <td className="px-4 py-2 text-center text-sm text-gray-700">
          <button
            onClick={() => viewContact(contact.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Xem
          </button>
          <button
            onClick={() => deleteContact(contact?.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ml-2"
          >
            Xóa
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="flex gap-8 my-4">
        <DebouncedInput
          type="text"
          placeholder="Search by keyword..."
          onChange={(event) => handleFilter(event)}
        />
        <select
          className="border px-4 py-2"
          onChange={(event) => handleBriefServiceChange(event)}
        >
          <option value="">Tất cả chủ đề</option>
          {/* Replace with dynamic subject list if available */}
          <option value="Cấp lại mật khẩu">Cấp lại mật khẩu</option>
          {BRIEF_SERVICES.map((item) => {
            return (
              <option value={item?.id} key={item?.id}>
                {item?.title}
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
                field === "date" ? (order === "ASC" ? "DESC" : "ASC") : "DESC",
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
          className="flex items-center px-4 py-2 text-red-600 border-red-600 border-2 font-semibold rounded-lg focus:outline-none transition-colors"
          onClick={removeFilter}
        >
          Xóa filter
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên liên hệ</th>
            <th className="px-4 py-2 text-left">Chủ đề</th>
            <th className="px-4 py-2 text-left">SĐT</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Tin nhắn</th>
            <th className="px-4 py-2 text-left">Trạng thái</th>
            <th className="px-4 py-2 text-left">Thời gian</th>
            <th className="px-4 w-32 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        {/* Pagination */}
        <div className="flex items-center space-x-2 mt-8">
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
        <div></div>
      </div>

      {/* Contact Details Modal */}
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        contentLabel="Contact Details"
        style={getModalStyle("small")}
      >
        {selectedContact && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Người liên hệ: {selectedContact.name}
              </h2>
              <p className="text-sm text-gray-500">
                Thời gian: {toDateString(selectedContact.date)}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="mr-4 font-semibold text-gray-700">
                  Chủ đề:
                </span>
                <span className="text-gray-800">
                  {
                    BRIEF_SERVICES.find(
                      (s) => s.id === selectedContact.package_id,
                    )?.title
                  }
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-4 font-semibold text-gray-700">
                  Số điện thoại:
                </span>
                <span className="text-gray-800">{selectedContact.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-4 font-semibold text-gray-700">Email:</span>
                <span className="text-blue-600 underline">
                  {selectedContact.email || "Không có"}
                </span>
              </div>
              <div>
                <span className="block font-semibold text-gray-700">
                  Tin nhắn:
                </span>
                <p className="text-gray-800 mt-1 bg-gray-100 p-3 rounded">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmationVisible}
        onRequestClose={cancelDelete}
        contentLabel="Delete Confirmation"
        style={getModalStyle("small")}
      >
        <h4 className="text-xl font-semibold text-center">Xóa liên hệ</h4>
        <p className="text-gray-700 text-center">
          Bạn có chắc chắn muốn xóa thông tin này?
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

export default ContactsTable;
