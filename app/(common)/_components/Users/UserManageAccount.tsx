"use client";

import { VN_REWRITE_SEGMENT_URLS } from "@/app/(common)/_utils/rewrite-urls";
import { IUser } from "@/app/(server)/database/models/User";
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { USER_STATUSES } from "../../_utils/constant";
import Link from "next/link";
import { userUpdateProfile } from "@/app/(server)/services/userService";
import SubmitButtonWrapper from "../Wrappers/SubmitButtonWrapper";
import { toast } from "react-toastify";
import { toDateString } from "../../_helpers/transform";

type FormErrors = {
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function UserManageAccountForm({
  userDetail,
}: {
  userDetail: IUser;
}) {
  const [form, setForm] = useState({
    phone: userDetail.user_phone,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enablePhoneEdit, setEnablePhoneEdit] = useState(false);

  // Validate form fields
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!form.phone) {
      errors.phone = "Số điện thoại không được bỏ trống!";
    } else if (!/^\d{10,11}$/.test(form.phone)) {
      errors.phone = "Số điện thoại không hợp lệ!";
    }

    if (!form.password) {
      errors.password = "Mật khẩu không được bỏ trống!";
    } else if (form.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự!";
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu không được bỏ trống!";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp!";
    }

    return errors;
  };

  const handleUpdate = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const { error } = await userUpdateProfile({
        form,
        userDetail,
        enablePhoneEdit,
      });
      if (error) {
        setErrors(error);
        return;
      }
    } catch (error: any) {
      if (typeof error.message === "string") {
        toast.error(
          error.message ??
            "Cập nhật thông tin không thành công. Vui lòng thử lại",
        );
      } else setErrors(error);
      return;
    }

    setForm({
      phone: userDetail.user_phone,
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    toast.success("Cập nhật thông tin thành công");
  };

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex sm:flex-row flex-col gap-8 xl:p-16 p-2">
      <div className="w-full sm:w-1/2 p-6 bg-white">
        <h2 className="text-2xl font-bold text-[#96694f] mb-4 uppercase text-center">
          Thông tin tài khoản
        </h2>

        {/* User Basic Information */}
        <div className="p-4 bg-gray-200 rounded-lg mb-6">
          <div className="flex items-center mb-3">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-500 w-6 h-6 mr-3"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              {userDetail?.user_name}
            </h2>
          </div>
          <div className="flex items-center mb-3">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-gray-500 w-5 h-5 mr-3"
            />
            <p className="text-gray-600">{userDetail?.user_phone}</p>
          </div>
          <div className="flex items-center mb-3">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-gray-500 w-5 h-5 mr-3"
            />
            <p className="text-gray-600">{userDetail?.address}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-semibold text-gray-700 mr-2">Trạng thái:</p>
            <span
              className={`text-lg font-medium px-3 py-1 rounded-full ${
                userDetail?.status === USER_STATUSES.ACTIVED
                  ? "bg-green-100 text-green-700"
                  : userDetail?.status === USER_STATUSES.CREATED
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {userDetail?.status}
            </span>
          </div>
        </div>

        {/* Premium Info Section */}
        {userDetail?.premium_info && (
          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Thông tin Premium
            </h3>
            <div className="flex items-center mb-2">
              <p className="font-semibold mr-2">VIP:</p>
              <span className="text-gray-600">
                {userDetail?.premium_info?.is_vip ? "Có" : "Không"}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <p className="font-semibold mr-2">Ngày hết hạn:</p>
              <span className="text-gray-600">
                {userDetail?.premium_info?.expired_date
                  ? toDateString(userDetail?.premium_info?.expired_date)
                  : "Không"}
              </span>
            </div>
            <div className="flex items-center">
              <p className="font-semibold mr-2">Độ ưu tiên:</p>
              <span className="text-gray-600">
                {userDetail?.premium_info?.priority_level || "0"}
              </span>
            </div>
          </div>
        )}

        {/* Quotations Section */}
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Danh sách báo giá đã gửi
          </h3>
          <ul className="space-y-2">
            {!userDetail?.quotations?.length && (
              <span className="text-gray-500">Chưa có báo giá</span>
            )}
            {userDetail?.quotations?.map((quotation) => (
              <li
                key={quotation.id}
                className="p-3 bg-white rounded-md shadow-sm flex items-center justify-between"
              >
                <Link
                  className="text-blue-500 underline"
                  target="_blank"
                  href={`/${VN_REWRITE_SEGMENT_URLS.quotation}/${quotation.simplified_id}`}
                >
                  {quotation.title}
                </Link>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 w-5 h-5"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full sm:w-1/2 p-6 h-auto rounded-lg shadow-lg bg-gradient-to-b from-white via-[#e7c7b9] to-white">
        <h2 className="text-2xl font-semibold text-center mb-6 uppercase text-[#96694f]">
          Thông tin đăng nhập
        </h2>
        <form action={handleUpdate} className="space-y-6">
          {/* Phone Number */}
          <div>
            <div className="flex items-center space-x-2">
              <label className="block text-lg font-bold text-gray-700">
                Số điện thoại:
              </label>
              <input
                type="checkbox"
                checked={enablePhoneEdit}
                onChange={() => setEnablePhoneEdit(!enablePhoneEdit)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-lg text-gray-700">Cập nhật SĐT</label>
            </div>
            <input
              type="text"
              value={form.phone}
              onChange={handleChange("phone")}
              disabled={!enablePhoneEdit}
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-600 focus:ring-red-500"
                  : "border-gray-400 focus:ring-blue-500"
              }`}
              placeholder="Enter your phone number"
            />

            {errors.phone && (
              <p className="mt-1 text-lg text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-bold text-gray-700">
              Mật khẩu mới:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                className={`w-full px-4 py-2 mt-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 text-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-lg text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-lg font-bold text-gray-700">
              Xác nhận mật khẩu:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className={`w-full px-4 py-2 mt-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-4 text-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-lg text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitButtonWrapper className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Cập nhật thông tin
          </SubmitButtonWrapper>
        </form>

        <p className="text-gray-500 mt-8">
          <b>Lưu ý:</b> Bạn chỉ có thể cập nhật thông tin đăng nhập tối đa 3
          lần!
        </p>
      </div>
    </div>
  );
}
