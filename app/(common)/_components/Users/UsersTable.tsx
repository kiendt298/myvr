"use client";

import { UserDetailPage } from "@/app/(common)/_components/Users/UsersDetail";
import { getModalStyle, USER_STATUSES } from "@/app/(common)/_utils/constant";
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
import useTableFetchData from "../../_hooks/useTableFetchData";
import { IUser } from "@/app/(server)/database/models/User";
import { searchParamsTransform, toDateString } from "../../_helpers/transform";
import {
  getUsersBySearchParams,
  removeUserById,
} from "@/app/(server)/services/userService";
import DebouncedInput from "../DebounceInput";
import { toast } from "react-toastify";

const UsersTable = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const pathName = usePathname();

  // Action Handlers
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const viewUser = (id: string | null) => {
    const user = data.find((user) => user.id === id) || null;
    setSelectedUser(user);
  };

  const deleteUser = (id: string) => {
    setUserToDelete(id);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    if (userToDelete !== null) {
      try {
        await removeUserById(userToDelete);
        fetchData();
        toast.success("Xóa người dùng thành công");
      } catch (error: any) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
      }

      setDeleteConfirmationVisible(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
    setUserToDelete(null);
  };

  const handleCreateUser = () => {
    router.push("/ead/create-user");
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
  const field = useMemo(
    () => searchParams?.sortBy || "created_at",
    [searchParams],
  );

  const search = useMemo(() => searchParams?.search || "", [searchParams]);
  const status = useMemo(() => searchParams?.status || "", [searchParams]);

  const paginationParams = useMemo(
    () => ({ limit: parseInt(limit), skip }),
    [searchParams],
  );
  const sortingParams = useMemo(() => ({ order, field }), [searchParams]);

  const [count, data, loading, error, fetchData] = useTableFetchData({
    action: getUsersBySearchParams,
    pagination: paginationParams,
    sorting: sortingParams,
    filtering: search as string,
    status,
  }) as [
    count: number,
    data: IUser[],
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

  const handleUserStatusChange = (event: any) => {
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
    data.map((user) => (
      <tr key={user.id}>
        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white hover:bg-orange-100">
          {user.simplified_id}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {user.user_name}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {user.user_phone}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {user.address}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {!user?.quotations?.length && (
            <span className="text-gray-500">Chưa có báo giá</span>
          )}
          {user?.quotations?.map((quotation) => (
            <>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href={`/ead/create-quotation?id=${quotation.id}`}
              >
                {quotation.title}
              </a>{" "}
              <br />
            </>
          ))}
        </td>
        <td className="px-4 py-2 text-sm text-left text-gray-700 bg-white hover:bg-orange-100">
          {user.status}
        </td>
        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white hover:bg-orange-100">
          {toDateString(user.created_at)}
        </td>
        <td className="px-4 py-2 text-sm text-center text-gray-700 bg-white">
          <button
            onClick={() => viewUser(user?.id || null)}
            className="px-2 py-1 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
          >
            Xem
          </button>
          <a
            href={`/ead/create-user?id=${user?.id || 0}`}
            className="px-2 py-1 mr-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition duration-150"
          >
            Sửa
          </a>
          <button
            onClick={() => deleteUser(user?.id ?? null)}
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
            DANH SÁCH USERS
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
              className="px-4 py-3 border border-gray-300 rounded-lg text-black"
              onChange={(e) => handleUserStatusChange(e)}
              value={status}
            >
              <option value="">Tất cả status</option>
              {Object.values(USER_STATUSES).map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>

            <button
              className="flex items-center px-4 py-2 bg-blue-100 text-gray-600 font-semibold rounded-lg hover:bg-blue-200 focus:outline-none transition-colors"
              onClick={() =>
                handleSort({
                  sortBy: "created_at",
                  sortDirection:
                    field === "created_at"
                      ? order === "ASC"
                        ? "DESC"
                        : "ASC"
                      : "DESC",
                })
              }
            >
              <FontAwesomeIcon
                icon={
                  field === "created_at" && order === "ASC"
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

          <button
            onClick={handleCreateUser}
            className="flex items-center px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 w-4 h-4" />
            Tạo User
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
                Tên khách hàng
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                SĐT
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Địa chỉ
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Danh sách báo giá
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Trạng thái
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Ngày tạo
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
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
      {/* User Detail Modal */}
      <Modal
        isOpen={!!selectedUser}
        onRequestClose={() => setSelectedUser(null)}
        contentLabel="User Detail"
        style={getModalStyle("medium")}
      >
        <UserDetailPage user={selectedUser as IUser} />
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmationVisible}
        onRequestClose={cancelDelete}
        contentLabel="Delete Confirmation"
        style={getModalStyle("small")}
      >
        <h4 className="text-xl font-semibold text-center">Xóa User</h4>
        <p className="text-gray-700 text-center">
          Bạn có chắc chắn muốn xóa User này?
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

export default UsersTable;
