"use client";

import { useState } from "react";
import {
  CONTACT_ERRS,
  validateMessage,
  validateName,
  validatePhoneNumber,
} from "../../_utils/constant";
import { BRIEF_SERVICES } from "../../_utils/service-info";
import { createContactRequest } from "@/app/(server)/services/contactService";
import SubmitButtonWrapper from "../Wrappers/SubmitButtonWrapper";
import { toast } from "react-toastify";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GoogleReCaptchaActionEnum } from "../../_utils/enums";

interface ContactFormProps {
  selectedPackage?: string;
  onClose?: () => void;
  isPopup?: boolean;
}

export default function ContactForm({
  selectedPackage = "",
  onClose,
  isPopup = false,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "", message: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setMessage("");
    setErrors({ name: "", phone: "", message: "" });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setErrors((prev) => ({
      ...prev,
      phone: validatePhoneNumber(value) ? "" : CONTACT_ERRS.PHONE,
    }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    setErrors((prev) => ({
      ...prev,
      message: validateMessage(value) ? "" : CONTACT_ERRS.MESSAGE,
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({
      ...prev,
      name: validateName(value) ? "" : CONTACT_ERRS.NAME,
    }));
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber) || !validateMessage(message)) return;

    try {
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
        name: name.trim(),
        message: message.trim(),
        phone: phoneNumber,
        serviceId: selectedPackage,
      });
      resetForm();
      isPopup && onClose?.();

      toast.success("Gửi yêu cầu liên hệ thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  const isFormValid =
    validatePhoneNumber(phoneNumber) && validateMessage(message);

  return (
    <div
      className={
        isPopup
          ? "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          : ""
      }
    >
      <form
        action={handleSubmit}
        className="bg-white p-6 rounded-lg xl:w-96 w-auto text-sm lg-text-base"
      >
        <h2 className="text-2xl font-extrabold main-color uppercase font-sans">
          Liên hệ tư vấn
        </h2>
        <p className="text-gray-700">
          <span>Chủ đề:</span>{" "}
          <b className="font-bold text-[#96694f]">
            {BRIEF_SERVICES.find((s) => s.id === selectedPackage)?.title}
          </b>
        </p>
        <label className="block mt-4 text-gray-700 font-semibold">
          Tên:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`border ${
              errors.name
                ? "border-red-500"
                : validateName(message)
                  ? "border-green-500"
                  : "border-gray-400"
            } p-2 w-full rounded`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </label>
        <label className="block mt-4 text-gray-700 font-semibold">
          Số điện thoại:
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={`border ${
              errors.phone
                ? "border-red-500"
                : validatePhoneNumber(phoneNumber)
                  ? "border-green-500"
                  : "border-gray-400"
            } p-2 w-full rounded`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </label>
        <label className="block mt-4 text-gray-700 font-semibold">
          Tin nhắn:
          <textarea
            value={message}
            onChange={handleMessageChange}
            className={`border ${
              errors.message
                ? "border-red-500"
                : validateMessage(message)
                  ? "border-green-500"
                  : "border-gray-400"
            } p-2 w-full rounded`}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">{errors.message}</span>
          )}
        </label>
        <SubmitButtonWrapper
          className={`mt-4 bg-[#ffc663] hover:bg-[#ffc663] text-yellow-900 mr-2 py-2 px-8 rounded font-bold`}
          disabled={!isFormValid}
        >
          Gửi ngay
        </SubmitButtonWrapper>
        {isPopup && (
          <button
            className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded font-bold"
            onClick={onClose}
          >
            Đóng
          </button>
        )}
      </form>
    </div>
  );
}
