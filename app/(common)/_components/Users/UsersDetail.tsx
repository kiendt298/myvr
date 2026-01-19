import { IUser } from "@/app/(server)/database/models/User";
import {
  faCheckCircle,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toDateString } from "../../_helpers/transform";

export const UserDetailPage = ({ user }: { user: IUser }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Thông tin User</h1>

      {/* User Basic Information */}
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <div className="flex items-center mb-3">
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-500 w-6 h-6 mr-3"
          />
          <h2 className="text-xl font-semibold text-gray-700">
            {user?.user_name}
          </h2>
        </div>
        <div className="flex items-center mb-3">
          <FontAwesomeIcon
            icon={faPhone}
            className="text-gray-500 w-5 h-5 mr-3"
          />
          <p className="text-gray-600">{user?.user_phone}</p>
        </div>
        <div className="flex items-center mb-3">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-gray-500 w-5 h-5 mr-3"
          />
          <p className="text-gray-600">{user?.address}</p>
        </div>
        <div className="flex items-center mb-3">
          <p className="font-semibold text-gray-700 mr-2">Trạng thái:</p>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              user?.status === "Đã kích hoạt"
                ? "bg-green-100 text-green-700"
                : user?.status === "Đã tạo"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {user?.status}
          </span>
        </div>
      </div>

      {/* Premium Info Section */}
      {user?.premium_info && (
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Thông tin Premium
          </h3>
          <div className="flex items-center mb-2">
            <p className="font-semibold mr-2">VIP:</p>
            <span className="text-gray-600">
              {user?.premium_info?.is_vip ? "Có" : "Không"}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <p className="font-semibold mr-2">Ngày hết hạn:</p>
            <span className="text-gray-600">
              {user?.premium_info.is_vip
                ? toDateString(user?.premium_info?.expired_date)
                : "Không"}
            </span>
          </div>
          <div className="flex items-center">
            <p className="font-semibold mr-2">Độ ưu tiên:</p>
            <span className="text-gray-600">
              {user?.premium_info.is_vip
                ? user?.premium_info?.priority_level
                : "Không"}
            </span>
          </div>
        </div>
      )}

      {/* Quotations Section */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Danh sách báo giá
        </h3>
        <ul className="space-y-2">
          {user?.quotations?.map((quotation) => (
            <li
              key={quotation.id}
              className="p-3 bg-white rounded-md shadow-sm flex items-center justify-between"
            >
              <a
                className="text-blue-500 underline"
                target="_blank"
                href={`/ead/create-quotation?id=${quotation.id}`}
              >
                {quotation.title}
              </a>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 w-5 h-5"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
