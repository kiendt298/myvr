"use client";

import QuotationDetail from "@/app/(common)/_components/Quotations/QuotationDetail";
import { PROVINCES, QUOTATION_STATUSES } from "@/app/(common)/_utils/constant";
import { IQuotation } from "@/app/(server)/database/models/Quotation";
import {
  createQuotation,
  updateQuotation,
} from "@/app/(server)/services/quotationService";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BRIEF_SERVICES } from "../../_utils/service-info";
import { toast } from "react-toastify";

interface FormErrors {
  title?: string;
  package?: string;
  phone?: string;
  customer_name?: string;
  content?: string;
  place?: string;
  estimated_cost?: string;
}

type QuotationFormProps = {
  quotationDetail: IQuotation | undefined;
};

export default function QuotationForm({ quotationDetail }: QuotationFormProps) {
  const [form, setForm] = useState<IQuotation>({
    title: "",
    package: "",
    phone: "",
    customer_name: "",
    place: "",
    content: "",
    estimated_cost: 0,
  } as IQuotation);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch data if in "edit" mode
  useEffect(() => {
    if (quotationDetail) {
      setIsEditing(true);
      fetchQuotationData(quotationDetail);
    } else {
      setIsEditing(false);
    }
  }, [quotationDetail]);

  const fetchQuotationData = async (fetchedData: IQuotation) => {
    // Pre-fill data
    setForm(fetchedData);
    setHtmlContent(fetchedData?.content || "");
    setSearchQuery(fetchedData?.place || "");
    setIsDropdownVisible(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm(
      (prevForm) =>
        ({
          ...prevForm,
          [name]: value,
        }) as IQuotation,
    );

    if (name === "place") {
      setSearchQuery(e.target.value);
      setIsDropdownVisible(true);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const handleSelectProvince = (province: string) => {
    setForm({ ...form, place: province } as IQuotation);
    setSearchQuery(province);
    setIsDropdownVisible(false);
  };

  const filteredProvinces = PROVINCES.filter((province) =>
    province.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    let newQuotationDetail;

    try {
      if (!isEditing) {
        newQuotationDetail = await createQuotation({
          ...form,
          content: htmlContent,
          status: QUOTATION_STATUSES.PENDING,
          // TODO: Saler assignment
        } as IQuotation);
        toast.success("Tạo báo giá thành công");
      } else {
        newQuotationDetail = await updateQuotation({
          ...form,
          content: htmlContent,
          status: QUOTATION_STATUSES.PENDING,
          // TODO: Saler assignment
        } as IQuotation);
        toast.success("Cập nhật báo giá thành công");
      }
    } catch (error: any) {
      toast.error(error.messsage ?? "Đã có lỗi xảy ra. Vui lòng thử lại");
      return;
    }

    // Open new tab for public quotation page after update
    window.open(`/quotation/${newQuotationDetail?.id}`, "_blank");
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!form.title) errors.title = "Tiêu đề không được bỏ trống!";
    if (!form.phone) errors.phone = "Số điện thoại không được bỏ trống!";
    if (!form.customer_name)
      errors.customer_name = "Tên khách hàng không được bỏ trống!";
    if (!form.package) errors.package = "Hãy chọn 1 gói dịch vụ!";
    if (!form.place) errors.place = "Hãy chọn khu vực của khách hàng!";
    if (!form.estimated_cost || Number(form.estimated_cost) <= 500000) {
      errors.estimated_cost = "Tổng chi phí phải lớn hơn 500k!";
    }
    return errors;
  };

  // Load CKEditor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "/libs/ckeditor/ckeditor.js";

      script.onload = () => {
        const win = window as any;

        // setTimeout(() => {
        if (win.CKEDITOR) {
          win.CKEDITOR.replace("editor", {
            on: {
              change: (e: any) => {
                const newContent = e.editor.getData();
                setHtmlContent(newContent);
              },
            },
          });
        } else {
          console.error("CKEditor did not load properly");
        }
        // }, 500);
      };

      document.body.appendChild(script);

      // Clean up the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

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
          {isEditing ? "CẬP NHẬT BÁO GIÁ" : "TẠO BÁO GIÁ"}
        </h2>
      </div>

      <form action={handleSubmit} className="flex gap-8 text-gray-700">
        {/* Left Side - Create Quotation Form */}
        <div className="w-1/2 bg-gradient-to-b to-gray-100 from-gray-300 p-4 rounded-lg pb-16">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="font-semibold text-gray-600">
                Tiêu đề báo giá:
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  !form.title && formErrors.title
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {!form.title && formErrors.title && (
                <p className="text-red-500 mt-1 text-sm">{formErrors.title}</p>
              )}
            </div>

            {/* Phone and Customer Name */}
            <div className="flex gap-8">
              <div className="w-1/2">
                <label className="font-semibold text-gray-600">
                  Tên khách hàng:
                </label>
                <input
                  type="text"
                  placeholder="Ex: anh/chị A"
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form.customer_name && formErrors.customer_name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                />
                {!form.customer_name && formErrors.customer_name && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.customer_name}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label className="font-semibold text-gray-600">
                  Số điện thoại:
                </label>
                <input
                  type="text"
                  placeholder="Ex: 0987123456"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form.phone && formErrors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                />
                {!form.phone && formErrors.phone && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Service and Area */}
            <div className="flex gap-8">
              <div className="w-1/2">
                <label className="font-semibold text-gray-600">
                  Dịch vụ đăng ký
                </label>
                <select
                  name="package"
                  value={form.package}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form.package && formErrors.package
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                >
                  <option disabled value="" key="default">
                    Chọn dịch vụ
                  </option>
                  {BRIEF_SERVICES.map((item) => {
                    return (
                      <option value={item?.id} key={item?.id}>
                        {item?.title}
                      </option>
                    );
                  })}
                </select>
                {!form.package && formErrors.package && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.package}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label className="font-semibold text-gray-600">Khu vực:</label>
                <div className="relative">
                  {/* Main place input field */}
                  <input
                    type="text"
                    name="place"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Chọn khu vực"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    style={{ color: "#333" }}
                  />

                  {/* Show the dropdown only when there is a search query and matching provinces */}
                  {isDropdownVisible &&
                    searchQuery &&
                    filteredProvinces.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
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
                {!form.place && formErrors.place && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.place}
                  </p>
                )}
              </div>
            </div>

            {/* CKEditor */}
            <div>
              <label className="font-semibold text-gray-600">
                Nội dung:{" "}
                <span className="font-normal">
                  (F5 nếu không thấy bảng soạn thảo)
                </span>
              </label>
              <textarea
                id="editor"
                value={form.content}
                onBlur={(e: any) => {
                  console.log("e: ", e);
                  setForm(
                    (prevForm) =>
                      ({
                        ...prevForm,
                        content: e.editor.getData(),
                      }) as IQuotation,
                  );
                }}
              ></textarea>

              <p className="text-orange-800 mt-1 text-sm">
                <b>Note:</b> Cần viết nội dung báo giá đầy đủ, chi tiết ở đây!
              </p>
            </div>

            {/* Estimated Cost */}
            <div>
              <label className="font-semibold text-gray-600">
                Tổng chi phí tạm tính:
              </label>
              <div className="relative w-full">
                <input
                  type="number"
                  name="estimated_cost"
                  value={form.estimated_cost}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.estimated_cost
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded pr-10`} // Thêm padding bên phải để tránh tràn vào "VND"
                />
                <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white">
                  VND
                </span>
              </div>
              {!form.estimated_cost && formErrors.estimated_cost && (
                <p className="text-red-500 mt-1 text-sm">
                  {formErrors.estimated_cost}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Quotation Details */}
        <div className="w-1/2">
          {/* Placeholder for Quotation Details */}
          <QuotationDetail
            data={form}
            htmlContent={htmlContent}
            CTA={{
              name: isEditing ? "CẬP NHẬT BÁO GIÁ" : "XUẤT BÁO GIÁ",
            }}
          />

          <div className="text-right mt-8 text-blue-500 underline">
            <a href="/ead/quotations">Quay lại danh sách báo giá</a>
          </div>
        </div>
      </form>
    </>
  );
}
