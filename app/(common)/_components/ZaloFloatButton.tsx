"use client";

import { useEffect, useState } from "react";

type Props = {
  phone: string;
  message?: string;
};

export default function ZaloFloatButton({ phone, message }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const url = message
      ? `https://zalo.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://zalo.me/${phone}`;

    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] group">
      {/* Tooltip */}
      <div
        className="
          absolute right-16 top-1/2 -translate-y-1/2
          bg-black text-white text-sm
          px-3 py-1.5 rounded-md
          opacity-0 group-hover:opacity-100
          transition duration-200
          whitespace-nowrap
          pointer-events-none
        "
      >
        Tư vấn ngay
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        aria-label="Chat Zalo"
        className="
          w-14 h-14
          rounded-full
          bg-[#0084ff]
          shadow-[0_6px_16px_rgba(0,0,0,0.25)]
          flex items-center justify-center
          transition-all duration-200
          hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]
          active:scale-95
          animate-[zaloPulse_2.5s_ease-in-out_infinite]
        "
      >
        <img src="/imgs/zalo-icon.svg" alt="Zalo" className="w-7 h-7" />
      </button>
    </div>
  );
}
