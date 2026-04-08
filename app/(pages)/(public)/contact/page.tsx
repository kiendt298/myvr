"use client";

import React, { ChangeEvent, useMemo, useState } from "react"; // Import React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  CONTACT_ERRS,
  CONTACT_SUBJECTS,
  validateMessage,
  validatePhoneNumber,
} from "../../../(common)/_utils/constant";
import { BRIEF_SERVICES } from "@/app/(common)/_utils/service-info";
import { createContactRequest } from "@/app/(server)/services/contactService";
import { toast } from "react-toastify";
import { GoogleReCaptchaActionEnum } from "@/app/(common)/_utils/enums";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import SubmitButtonWrapper from "@/app/(common)/_components/Wrappers/SubmitButtonWrapper";
import Link from "next/link";
import { VN_REWRITE_SEGMENT_URLS } from "@/app/(common)/_utils/rewrite-urls";
import ZaloContactButton from "@/app/(common)/_components/ZaloContactButton";

interface FormData {
  subject: string;
  phone: string;
  email: string;
  message: string;
}

interface Errors {
  phone: string;
  message: string;
}

export default function Contact() {
  const initForm = useMemo(
    () => ({
      subject: CONTACT_SUBJECTS.ADVISE,
      phone: "",
      email: "",
      message: "",
    }),
    [],
  );
  const [formData, setFormData] = useState<FormData>(initForm);

  const [errors, setErrors] = useState<Errors>({
    phone: "",
    message: "",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      if (!validatePhoneNumber(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: CONTACT_ERRS.PHONE,
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }

    if (name === "message") {
      if (!validateMessage(value)) {
        setErrors((prev) => ({
          ...prev,
          message: CONTACT_ERRS.MESSAGE,
        }));
      } else {
        setErrors((prev) => ({ ...prev, message: "" }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !validatePhoneNumber(formData.phone) ||
        !validateMessage(formData.message)
      )
        throw new Error("Validations failed");

      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const token = await executeRecaptcha(
        GoogleReCaptchaActionEnum.CREATE_CONTACT_SUBMIT,
      );

      await createContactRequest.bind(
        null,
        token,
      )({
        name: "",
        phone: formData.phone,
        email: formData.email,
        serviceId:
          BRIEF_SERVICES.find((s) => s.title === formData.subject)?.id || "",
        message: formData.message,
      });
      setFormData(initForm);
      toast.success("Yêu cầu đã được gửi thành công");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Gửi yêu cầu thất bại");
    }
  };
  const isFormValid: boolean =
    validatePhoneNumber(formData.phone) &&
    validateMessage(formData.message) &&
    formData.subject !== "";

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-full md:w-1/2 p-8 bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100 order-2 md:order-1">
        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Thông tin liên hệ
          </h2>
          <div className="bg-white p-4 rounded-lg text-gray-700">
            <p className="mb-2 flex items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-600 mr-2"
                style={{ width: "16px", height: "16px" }}
              />
              MyVR Office - 08 Đại Lộ Hữu Nghị, Thuận An, Bình Dương (Khu căn hộ
              cao cấp The Habitat)
            </p>
            <p className="mb-2 flex items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-blue-600 mr-2"
                style={{ width: "16px", height: "16px" }}
              />
              (+84) 848-022-993
            </p>
            <p className="mb-2 flex items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-blue-600 mr-2"
                style={{ width: "16px", height: "16px" }}
              />
              myvr.vn@gmail.com
            </p>
            <p className="mb-2 flex items-center">
              <FontAwesomeIcon
                icon={faClock}
                className="text-blue-600 mr-2"
                style={{ width: "16px", height: "16px" }}
              />
              8h sáng - 8h tối tất cả các ngày trong tuần
            </p>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-4 border-gray-100" />

        {/* About Us */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Về chúng tôi
          </h2>
          <p className="mb-4 text-gray-700">
            MyVR là nền tảng hỗ trợ quay video 3D thực tế ảo. Giúp bạn lưu giữ
            những khoảnh khắc chân thực nhất, như được nhìn lại tận mắt không
            gian ký ức/kỷ niệm bạn đã trải qua 1 lần nữa.
          </p>
        </div>

        {/* Images with titles */}
        <div className="grid grid-cols-2 gap-4">
          {BRIEF_SERVICES.slice(1).map((item) => {
            return (
              <div className="text-center" key={item.id}>
                <img
                  src={item?.imgSrc}
                  alt={item?.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />

                <Link
                  href={
                    `/${VN_REWRITE_SEGMENT_URLS.service}/` + item.postFixUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-gray-600 font-bold underline"
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-1/2 px-2 items-center justify-center order-1 md:order-2">
        {/* Contact Form */}
        <div className="mb-8">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              LIÊN HỆ{" "}
            </h2>
            <hr />
            <label className="block mt-4 text-gray-700 font-semibold">
              Tư vấn nhanh:
            </label>
            <ZaloContactButton
              phone="0848022993"
              message="Tôi muốn tư vấn trải nghiệm MyVR"
            />
            <br />

            <div className="relative my-6">
              <div className="h-px bg-gray-300 w-full" />
              <span
                className="
                            absolute left-1/2 top-1/2
                            -translate-x-1/2 -translate-y-1/2
                            bg-white px-3
                            font-bold text-orange-800
                            uppercase tracking-wide whitespace-nowrap
                          "
              >
                Hoặc điền Form này
              </span>
            </div>
            <form action={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-500">
                  Chủ đề:
                </label>
                <div className="flex flex-col xl:flex-row xl:space-x-4 text-gray-700 gap-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="subject"
                      value={CONTACT_SUBJECTS.ADVISE}
                      id="consultation"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="consultation"
                      className="flex items-center cursor-pointer mr-8"
                    >
                      <span className="w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full mr-2">
                        {formData.subject === CONTACT_SUBJECTS.ADVISE && (
                          <span className="w-3 h-3 bg-blue-600 rounded-full" />
                        )}
                      </span>
                      {CONTACT_SUBJECTS.ADVISE}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="subject"
                      value={CONTACT_SUBJECTS.FORGOT_ACCOUNT}
                      id="forgot-info"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="forgot-info"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full mr-2">
                        {formData.subject ===
                          CONTACT_SUBJECTS.FORGOT_ACCOUNT && (
                          <span className="w-3 h-3 bg-blue-600 rounded-full" />
                        )}
                      </span>
                      {CONTACT_SUBJECTS.FORGOT_ACCOUNT}
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-col xl:flex-row xl:space-x-4 gap-4">
                <div className="w-full xl:w-1/2">
                  <label className="block mb-2 font-semibold text-gray-500">
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } p-2 rounded text-gray-700`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">{errors.phone}</span>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="block mb-2 font-semibold text-gray-500">
                    Email (không bắt buộc):
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded text-gray-700"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-500">
                  Tin nhắn:
                </label>
                <textarea
                  name="message"
                  cols={2}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } p-2 rounded text-gray-700`}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">{errors.message}</span>
                )}
              </div>
              <SubmitButtonWrapper
                className={`mt-4 ${
                  isFormValid
                    ? "bg-blue-600 text-white px-12 py-2 rounded"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } mr-2 py-2 px-8 rounded font-bold`}
                disabled={!isFormValid}
              >
                Gửi
              </SubmitButtonWrapper>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Bản đồ</h2>
          <div className="w-full h-80 bg-gray-200 p-1 rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.513951915142!2d106.71132367617584!3d10.924495589233436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d704d26e00f5%3A0x35bcb93d851cef1e!2zTXlWUiAtIEzGsHUgZ2nhu68ga-G7tyBuaeG7h20gcXVhIGtow7RuZyBnaWFuIDNEIFRo4buxYyB04bq_IOG6o28!5e0!3m2!1svi!2s!4v1773943965797!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
