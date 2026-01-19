"use client";

import {
  PROVINCES,
  RANDOM_WORDS,
  USER_STATUSES,
} from "@/app/(common)/_utils/constant";
import { CreatorRoleType, IUser } from "@/app/(server)/database/models/User";
import { createUser, updateUser } from "@/app/(server)/services/userService";
import {
  faCheck,
  faEye,
  faEyeSlash,
  faHomeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import SubmitButtonWrapper from "../Wrappers/SubmitButtonWrapper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormErrors {
  user_phone?: string;
  user_name?: string;
  user_email?: string;
  address?: string;
  user_password?: string;
  confirm_password?: string;
  status?: string;
  is_vip?: false;
  expired_date?: string;
  priority_level?: string;
}

export default function UserForm({ userDetail }: { userDetail: IUser }) {
  const initForm = useMemo(
    () => ({
      user_phone: "",
      user_name: "",
      user_email: "",
      address: "",
      user_password: "",
      confirm_password: "",
      status: USER_STATUSES.ACTIVED,
      role: CreatorRoleType.USER,
      premium_info: {
        is_vip: false,
        expired_date: new Date(),
        priority_level: 1,
      },
    }),
    [userDetail],
  );
  const router = useRouter();

  const [form, setForm] = useState<Record<string, any>>(initForm);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (userDetail) {
      setIsEditing(true);
      fetchUserDetail(userDetail);
    } else {
      setIsEditing(false);
    }
  }, [userDetail]);

  useEffect(() => {
    if (JSON.stringify(form) === JSON.stringify(initForm)) return;

    const updatedErrors = validateForm();
    setFormErrors(updatedErrors);
  }, [form]);

  const fetchUserDetail = async (userDetail: IUser) => {
    setForm(userDetail);
    setSearchQuery(userDetail?.address || "");
    setIsDropdownVisible(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "address") {
      setSearchQuery(e.target.value);
      setIsDropdownVisible(true);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const handleSelectProvince = (province: string) => {
    setForm({ ...form, address: province });
    setSearchQuery(province);
    setIsDropdownVisible(false);
  };

  const filteredProvinces = PROVINCES.filter((province) =>
    province.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const generateRandomPassword = () => {
    const randomWord =
      RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomPassword = `${randomWord}@${randomNumber}`;
    setForm((prevForm) => ({
      ...prevForm,
      user_password: randomPassword,
      confirm_password: randomPassword,
    }));
  };

  const handleSubmit = async () => {
    setFormErrors({});
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    try {
      if (!isEditing) {
        await createUser(form as IUser);
        setForm(initForm);
        setSearchQuery("");
        toast.success("Tạo người dùng thành công");
      } else {
        await updateUser(form as IUser);
        setForm({
          ...form,
          user_password: "",
          confirm_password: "",
        });
        toast.success("Cập nhật báo  thành công");
      }
    } catch (error: any) {
      toast.error(error.message ?? "Đã có lỗi xảy ra. Vui lòng thử lại");
      return;
    }
    router.push("/ead/users");
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!form.user_phone) {
      errors.user_phone = "Số điện thoại không được bỏ trống!";
    } else if (!/^\d{10,11}$/.test(form.user_phone)) {
      errors.user_phone = "Số điện thoại không hợp lệ!";
    }

    if (!form.user_name)
      errors.user_name = "Tên khách hàng không được bỏ trống!";
    if (!form.address) errors.address = "Hãy chọn khu vực của khách hàng!";
    if (form.user_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email))
      errors.user_email = "Email không hợp lệ!";

    if (!isEditing) {
      if (!form.user_password)
        errors.user_password = "Mật khẩu không được bỏ trống!";
      if (!form.confirm_password)
        errors.confirm_password = "Xác nhận mật khẩu không được bỏ trống!";
    }

    if (form.user_password && form.user_password.length < 8)
      errors.user_password = "Mật khẩu phải có ít nhất 8 ký tự!";
    else delete errors.user_password;
    if (form.user_password !== form.confirm_password)
      errors.confirm_password = "Mật khẩu và xác nhận mật khẩu không khớp!";
    else delete errors.confirm_password;
    if (form.premium_info?.is_vip && !form.premium_info.expired_date)
      errors.expired_date =
        "Ngày hết hạn không được bỏ trống cho tài khoản VIP!";
    if (form.premium_info?.is_vip && !form.premium_info.priority_level)
      errors.priority_level =
        "Độ ưu tiên không được bỏ trống cho tài khoản VIP";

    return errors;
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light text-center mt-8 mb-4">
        WELCOME ADMIN!
      </h1>

      <div className="flex items-center mb-4">
        <a
          href="/ead/home"
          className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors mr-4 py-2 px-3"
        >
          <FontAwesomeIcon icon={faHomeAlt} className="w-4 h-4" />
        </a>
        <h2 className="text-3xl font-extrabold text-gray-600 uppercase font-sans">
          {isEditing ? "CẬP NHẬT USER" : "TẠO USER MỚI"}
        </h2>
      </div>

      <form action={handleSubmit} className="flex text-gray-700">
        <div className="w-full p-16 pb-64 rounded-lg space-y-8 bg-gradient-to-b to-gray-100 from-gray-300">
          {/*  Name & Address & Email */}
          <div className="flex gap-16">
            {/* Name */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">
                Tên khách hàng:
              </label>
              <input
                type="text"
                placeholder="Ex: anh/chị A"
                name="user_name"
                value={form.user_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  !form.user_name && formErrors.user_name
                    ? "border-red-500"
                    : "border-gray-400"
                } rounded`}
              />
              {!form.user_name && formErrors.user_name && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.user_name}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">Địa chỉ:</label>
              <div className="relative">
                {/* Main address input field */}
                <input
                  type="text"
                  name="address"
                  value={searchQuery}
                  onChange={handleChange}
                  placeholder="Chọn khu vực"
                  className={`w-full px-3 py-2 border border-gray-400 rounded ${
                    !form.address && formErrors.address
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  style={{ color: "#333" }}
                />

                {/* Show the dropdown only when there is a search query and matching provinces */}
                {isDropdownVisible &&
                  searchQuery &&
                  filteredProvinces.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-400 rounded shadow-md max-h-60 overflow-y-auto">
                      {filteredProvinces.map((province) => (
                        <div
                          key={province}
                          onClick={() => handleSelectProvince(province)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                        >
                          {province}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              {!form.address && formErrors.address && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.address}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">
                Email: <span className="font-normal">(không bắt buộc)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: abc@gmail.com"
                name="user_email"
                value={form.user_email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  !form.user_email && formErrors.user_email
                    ? "border-red-500"
                    : "border-gray-400"
                } rounded`}
              />
              {formErrors.user_email && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.user_email}
                </p>
              )}
            </div>
          </div>

          {/* Login */}
          <div className="flex gap-16">
            {/* user_phone */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">
                Số điện thoại:{" "}
                <span className="font-normal">(dùng để đăng nhập)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: 0987123456"
                name="user_phone"
                value={form.user_phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  !form.user_phone && formErrors.user_phone
                    ? "border-red-500"
                    : "border-gray-400"
                } rounded`}
              />
              {!form.user_phone && formErrors.user_phone && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.user_phone}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">
                Mật khẩu:{" "}
                <span
                  onClick={generateRandomPassword}
                  className="ml-2 text-blue-500 cursor-pointer underline hover:text-blue-700 transition"
                >
                  Tạo ngẫu nhiên
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="user_password"
                  value={form.user_password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-400 rounded ${
                    !form.user_password && formErrors.user_password
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formErrors.user_password && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.user_password}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">
                Xác nhận mật khẩu:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-400 rounded ${
                    !form.confirm_password && formErrors.confirm_password
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {formErrors.confirm_password && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.confirm_password}
                </p>
              )}
            </div>
          </div>

          {/* Status & VIP Info */}
          <div className="flex gap-16">
            {/* Status */}
            <div className="w-1/3">
              <label className="font-semibold text-gray-600">Trạng thái:</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded"
              >
                {Object.values(USER_STATUSES).map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <div className="mt-4">
                <label className="font-semibold text-gray-600">Quyền</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded"
                >
                  {Object.values(
                    Object.fromEntries(Object.entries(CreatorRoleType)),
                  ).map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
            </div>
            {/* Vip status */}
            <div className="flex w-1/3">
              <div className="w-2/3">
                <label className="font-semibold text-gray-600">Premium:</label>
                <div className="flex items-center mb-2">
                  <div
                    className={`relative w-6 h-6 rounded-md border-2 cursor-pointer flex items-center justify-center transition-all ${
                      form.premium_info?.is_vip
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-400"
                    }`}
                    onClick={() =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        premium_info: {
                          ...prevForm.premium_info,
                          is_vip: !prevForm.premium_info?.is_vip,
                        },
                      }))
                    }
                  >
                    {form.premium_info?.is_vip && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white text-xs"
                      />
                    )}
                  </div>
                  <span className="text-gray-700 ml-2 mt-2">Tài khoản VIP</span>
                </div>
              </div>
              <div className="w-1/3">
                <label className="font-semibold text-gray-600">
                  Độ ưu tiên
                </label>
                <input
                  type="number"
                  name="priority_level"
                  value={form.premium_info?.priority_level}
                  onChange={(e) => {
                    setForm((prevForm) => ({
                      ...prevForm,
                      premium_info: {
                        ...prevForm.premium_info,
                        priority_level: e.target.value,
                      },
                    }));
                  }}
                  disabled={!form.premium_info?.is_vip}
                  className={`w-full px-4 py-2 border border-gray-400 rounded ${
                    !form.premium_info?.is_vip
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700"
                  }`}
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="mb-2">
                <label className="font-semibold text-gray-600">
                  Ngày hết hạn
                </label>
                <input
                  type="date"
                  name="expired_date"
                  value={new Date(form.premium_info?.expired_date)
                    .toISOString()
                    .slice(0, 10)}
                  onChange={(e) => {
                    setForm((prevForm) => ({
                      ...prevForm,
                      premium_info: {
                        ...prevForm.premium_info,
                        expired_date: e.target.valueAsDate,
                      },
                    }));
                  }}
                  disabled={!form.premium_info?.is_vip}
                  className={`w-full px-4 py-2 border border-gray-400 rounded ${
                    !form.premium_info?.is_vip
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700"
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <SubmitButtonWrapper className="primary-btn p-2 px-16 text-white transition-colors rounded">
              {isEditing ? "Cập nhật User" : "Tạo User"}
            </SubmitButtonWrapper>

            <a
              href="/ead/users"
              className="text-right mt-4 text-blue-500 underline"
            >
              Quay lại danh sách Users
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
