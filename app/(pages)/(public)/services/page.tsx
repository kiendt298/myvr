"use client";
import ContactForm from "@/app/(common)/_components/Contacts/ContactForm";
import DangerouslyInnerHtmlWrapper from "@/app/(common)/_components/Wrappers/DangerouslyInnerHtmlWrapper";
import { useIsMobile } from "@/app/(common)/_hooks/use-mobile";
import { VN_REWRITE_SEGMENT_URLS } from "@/app/(common)/_utils/rewrite-urls";
import {
  MAIN_SERVICES,
  SERVICE_STEPS,
} from "@/app/(common)/_utils/service-info";
import Link from "next/link";
import { useState } from "react";

export default function ServicesPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleButtonClick = (packageName: string | undefined) => {
    if (!packageName) return;

    setSelectedPackage(packageName);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const isMobile = useIsMobile();

  return (
    <>
      <main className="bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100 text-white font-sans">
        {/* Quy Trình Dịch Vụ */}
        <section className="py-8 sm:py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light">
              Quy Trình Lưu Giữ Kỷ Niệm Cho Bạn
            </h2>
          </div>
          <div className="grid grid-cols-1 md:flex md:flex-wrap md:justify-center xl:grid xl:grid-cols-5 gap-8 px-4 xl:px-16">
            {SERVICE_STEPS.map((item, index) => {
              const [firstPart, secondPart] = item.title.split(" &");
              const opacity = Math.min(0.8 + index * 0.05, 1);

              return (
                <div
                  key={index}
                  className="text-center space-y-4 bg-[#27304f] rounded-lg p-6 md:basis-1/4"
                  style={{
                    opacity,
                  }}
                >
                  <div className="text-xl font-extrabold font-oswald">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#ffc663]">
                    {firstPart}
                    <span className="text-sm font-bold text-white"> &</span>
                    <br /> {secondPart}
                  </h3>
                  <DangerouslyInnerHtmlWrapper
                    className="text-sm"
                    htmlContent={item.description}
                  ></DangerouslyInnerHtmlWrapper>
                </div>
              );
            })}
          </div>
        </section>

        {/* Các Gói Dịch Vụ */}
        <section className="py-8 sm:py-16">
          <div className="space-y-16 px-4 md:px-16">
            {MAIN_SERVICES.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row ${
                  service.reverse ? "lg:flex-row-reverse" : ""
                } gap-8 bg-white p-8 rounded-lg`}
              >
                <div className="w-full lg:w-1/2 aspect-video">
                  {service.youtubeSrc ? (
                    <iframe
                      className="w-full rounded-lg"
                      height={isMobile ? undefined : "315px"}
                      src={service.youtubeSrc}
                      title={service.subtitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      src={service.videoSrc}
                      poster={service.videoThumbnail}
                      className="w-full object-cover"
                      preload="none"
                      controls
                    />
                  )}

                  <p className="font-semibold text-gray-400 mt-2 text-center">
                    {service.videoSrcTitle}
                  </p>
                </div>
                <div className="w-full lg:w-1/2 space-y-4 text-left">
                  <h3 className="text-[#96694f] font-oswald uppercase text-lg font-extrabold">
                    Chủ đề: {service.title}
                  </h3>
                  <h2 className="text-4xl font-bold text-[#4c619f] font-oswald font-sans uppercase">
                    {service.subtitle}
                  </h2>
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />

                  <button
                    className="mt-4 bg-[#ffc663] text-yellow-900 py-2 px-4 rounded font-bold w-full sm:w-auto"
                    onClick={() => handleButtonClick(service.mappingId)}
                  >
                    Liên hệ để tư vấn ngay
                  </button>

                  <Link
                    className="inline-block mt-4 sm:ml-3 bg-[#7a8d7f] text-white py-2 px-4 rounded font-bold w-full sm:w-auto text-center"
                    href={`/${VN_REWRITE_SEGMENT_URLS.service}/${service.postFixUrl}`}
                    target="_blank"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Popup */}
          {isPopupOpen && (
            <ContactForm
              selectedPackage={selectedPackage}
              onClose={handleClose}
              isPopup={true}
            />
          )}
        </section>
      </main>
    </>
  );
}
