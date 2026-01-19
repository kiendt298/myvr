"use client";

import { BRIEF_SERVICES } from "@/app/(common)/_utils/service-info";
import { CreatorRoleType } from "@/app/(server)/database/models/User";
import { getUserDetailByPhoneNumber } from "@/app/(server)/services/userService";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import SubmitButtonWrapper from "./Wrappers/SubmitButtonWrapper";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GoogleReCaptchaActionEnum } from "../_utils/enums";
import Link from "next/link";
import { VN_REWRITE_SEGMENT_URLS } from "../_utils/rewrite-urls";

export default function SignIn() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSignIn = async () => {
    setError("");

    try {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const token = await executeRecaptcha(
        GoogleReCaptchaActionEnum.SIGN_IN_SUBMIT,
      );
      // Use NextAuth's signIn function
      const result = await signIn("credentials", {
        redirect: false,
        phone,
        password,
        reCaptchaToken: token,
      });

      if (!result?.ok) {
        setError(
          result?.error ||
            "Số điện thoại hoặc mật khẩu không chính xác. Vui lòng thử lại",
        );
      } else {
        const userDetail = await getUserDetailByPhoneNumber(phone);
        if (!userDetail || userDetail.role !== CreatorRoleType.ADMIN)
          return router.push("/");
        router.push("/ead/home");
      }
    } catch (error: any) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen">
      {/* Left Content: Website Info and Images with Titles */}
      <div className="w-full sm:w-1/2 xl:w-2/3 p-8 order-2 md:order-1 bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100">
        <h1 className="text-2xl font-semibold text-blue-700 mb-6">
          MyVR xin chào bạn!
        </h1>
        <p className="text-gray-700 mb-4">
          MyVR là nền tảng XR Web lưu trữ những khoảnh khắc quý giá nhất của bạn
          và người thân yêu trong không gian Thực tế ảo 3D.
        </p>
        <p className="text-gray-700 mb-4">
          Hãy để chúng tôi giúp bạn ghi lại và gìn giữ những kỷ niệm gia đình,
          câu chuyện tình yêu, hoặc những điều mà hiện thực phải chạy đua với
          thời gian để níu kéo... Và biến chúng thành mãi mãi.
        </p>
        <p className="text-gray-700 mb-6">
          Một lúc nào đó, bạn sẽ lại được sống-nhìn-cảm nhận những phút giây đã
          trôi qua theo cách chân thực nhất!
        </p>

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

      {/* Right Content: Login Form */}
      <div className="w-full sm:w-1/2 xl:w-1/3 p-8 flex justify-center order-1 md:order-2">
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            ĐĂNG NHẬP
          </h1>
          <form action={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Số điện thoại:
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={`w-full px-4 py-2 mt-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Mật khẩu:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-4 py-2 mt-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                    error
                      ? "border-red-600 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <SubmitButtonWrapper className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Đăng nhập
            </SubmitButtonWrapper>
          </form>
          <p className="mt-6 text-center text-gray-500">
            Quên thông tin đăng nhập? <br />
            <a href="/contact" className="text-blue-500 hover:underline">
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
