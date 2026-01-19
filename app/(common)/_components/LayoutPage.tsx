"use client";

import {
  faCheckCircle,
  faHeadset,
  faHome,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import { VN_REWRITE_SEGMENT_URLS } from "@/app/(common)/_utils/rewrite-urls";
import { IUser } from "@/app/(server)/database/models/User";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCaretDown,
  faCog,
  faEnvelope,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import { BRIEF_SERVICES } from "../_utils/service-info";
import { AppSidebar } from "./Sidebar/AppSidebar";

interface LayoutProps {
  children: ReactNode;
  loggedIn: boolean;
  userInfo: IUser;
}

const Layout: React.FC<LayoutProps> = ({ children, loggedIn, userInfo }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLoginClick = () => {
    router.push(`/${VN_REWRITE_SEGMENT_URLS.signIn}`);
  };

  const NON_WELCOME_TITLE_PATHS = [
    "/",
    "/ead/create-quotation",
    "/ead/home",
    "/ead/quotations",
    "/ead/users",
    "/ead/create-user",
    "/ead/create-post",
    "/ead/posts",
    "/ead/contacts",
  ];

  const isEmptyWelcomeTitle = () => {
    return NON_WELCOME_TITLE_PATHS.includes(pathname);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 lg:relative w-full bg-gradient-to-b to-[#ad796a] from-[#d99d7a] text-white py-4 px-6 shadow-md text-shadow-dark">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-1">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center">
              <div>
                <img
                  src="/imgs/myvr_trans_logo.png"
                  alt="MyVR Logo"
                  className="h-10 sm:h-12 w-auto mr-2 sm:mr-4"
                />
              </div>
              <span className="text-xl font-bold">
                <img
                  src="/imgs/myvr-text-transparent.png"
                  alt="MyVR Logo"
                  className="h-8 w-auto"
                />
                <span className="text-base sm:text-lg font-extrabold">
                  Thực tế ảo - Câu chuyện thật
                </span>
              </span>
            </div>
          </Link>

          {/* Navigation and Login/Logout */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Navigation Links */}
            <nav className="hidden lg:flex space-x-6">
              {" "}
              <Link href="/" passHref>
                <span
                  className={`flex items-center hover:text-yellow-200  transition-colors duration-300 ${
                    pathname === "/"
                      ? "text-yellow-200 font-bold"
                      : "text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    className="mr-2"
                    fixedWidth
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span className="leading-4">Trang chủ</span>
                </span>
              </Link>
              <Link href={`/${VN_REWRITE_SEGMENT_URLS.services}`} passHref>
                <span
                  className={`flex items-center hover:text-yellow-200  transition-colors duration-300 ${
                    pathname === "/services" || pathname === "/dich-vu"
                      ? "text-yellow-200 font-bold"
                      : "text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mr-2"
                    fixedWidth
                    style={{ width: "16px", height: "16px" }}
                  />{" "}
                  <span className="leading-4">Dịch vụ</span>
                </span>
              </Link>
              <Link href={`/${VN_REWRITE_SEGMENT_URLS.contact}`} passHref>
                <span
                  className={`flex items-center hover:text-yellow-200  transition-colors duration-300 ${
                    pathname === "/contact" || pathname === "/lien-he"
                      ? "text-yellow-200 font-bold"
                      : "text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="mr-2"
                    fixedWidth
                    style={{ width: "16px", height: "16px" }}
                  />{" "}
                  <span className="leading-4">Liên hệ</span>
                </span>
              </Link>
              {loggedIn && (
                <Link href="/videos" passHref>
                  <span
                    className={`flex items-center hover:text-yellow-200  transition-colors duration-300 ${
                      pathname === "/videos"
                        ? "text-yellow-200 font-bold"
                        : "text-white"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="mr-2"
                      fixedWidth
                      style={{ width: "16px", height: "16px" }}
                    />{" "}
                    <span className="leading-4">Video của bạn</span>
                  </span>
                </Link>
              )}
            </nav>

            {/* Login / Logged Info */}
            <div>
              {loggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center cursor-pointer text-orange-200"
                    onClick={toggleDropdown}
                  >
                    <span className="mr-2">{userInfo.user_name}</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                      <button
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-blue-700"
                        onClick={() => {
                          router.push(
                            `/${VN_REWRITE_SEGMENT_URLS.manageAccount}`
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Quản lý
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-red-700"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="primary-btn px-4 py-2 rounded font-bold"
                  onClick={handleLoginClick}
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
          <div className="lg:hidden me-4">
            <AppSidebar userInfo={userInfo} loggedIn={loggedIn} />
          </div>
        </div>
        {/* Navigation and Login/Logout for mobiles */}
      </header>

      {/* Main Title */}
      {!isEmptyWelcomeTitle() && (
        <div className="w-full bg-gray-100 p-6">
          <h1 className="text-center text-3xl font-bold main-color">
            Welcome to MyVR!
            <br />
            <span className="text-xl font-bold main-color">
              - Nơi lưu trữ & tái hiện lại những khoảnh khắc quý giá nhất của
              bạn bằng Video thực tế ảo 3D -
            </span>
          </h1>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow w-full px-2 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      <footer className="w-full bg-[#f3d1c2] text-gray-800 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Upper Footer */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 space-y-8 md:space-y-0">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-start">
              <img
                src="/imgs/myvr-text-transparent.png"
                alt="MyVR Logo"
                className="h-10 w-auto"
              />
              <span className="font-normal mt-2">
                Chúng tôi giúp bạn lưu giữ lại không chỉ là hình ảnh - mà còn là
                cảm xúc.
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap text-center md:text-left space-x-6 md:max-xl:space-x-4">
              <a
                href={"/" + VN_REWRITE_SEGMENT_URLS.services}
                className="flex items-center hover:text-blue-800"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" /> Dịch vụ
              </a>
              <a
                href="/contact"
                className="flex items-center hover:text-blue-800"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Liên hệ
              </a>
              <a
                href="https://facebook.com/myvr-channel"
                target="_blank"
                className="hover:text-blue-800"
                aria-label="Visit our Facebook"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              {/* <a
                href="https://instagram.com/myvr-channel"
                className="hover:text-blue-800"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a> */}
              <a
                href="https://youtube.com/@myvr-channel"
                className="hover:text-blue-800"
                aria-label="Visit our YouTube channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Stories Section */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-600 mb-4">
              Những câu chuyện đồng hành cùng MyVR
            </h3>
            <div className="flex sm:flex-row flex-col gap-4">
              {BRIEF_SERVICES.slice(1).map((service) => (
                <div
                  key={service.id}
                  className="py-2 px-4 bg-[#956752] rounded-lg text-center basis-1/4"
                >
                  <Link
                    // TODO: Will update to posts after posts ready for user
                    // href={
                    //   `/${VN_REWRITE_SEGMENT_URLS.posts}/` + service.postFixUrl
                    // }
                    href={
                      `/${VN_REWRITE_SEGMENT_URLS.service}/` +
                      service.postFixUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-shadow-dark hover:text-gray-100 hover:underline text-sm font-medium w-auto align-middle"
                  >
                    {service.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Footer */}
          <div className="border-t border-yellow-600 pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-[#96694f] font-bold">
            <p>© 2024 MyVR. All rights reserved.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              <a href="/privacy" className="hover:text-blue-800">
                Chính sách bảo mật
              </a>
              <span className="text-gray-500">|</span>
              <a href="/terms" className="hover:text-blue-800">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
