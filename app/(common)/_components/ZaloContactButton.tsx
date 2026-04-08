"use client";

type Props = {
  phone: string;
  message?: string;
  className?: string;
};

export default function ZaloContactButton({
  phone,
  message,
  className = "",
}: Props) {
  const handleClick = () => {
    const url = message
      ? `https://zalo.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://zalo.me/${phone}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        w-full flex items-center justify-center gap-2
        bg-[#0084ff] text-white
        px-5 py-3 rounded-xl
        font-medium
        shadow-md
        transition-all duration-200
        hover:scale-[1.02] hover:shadow-lg
        active:scale-[0.98]
        ${className}
      `}
    >
      <img src="/imgs/zalo-icon.svg" alt="Zalo" className="w-5 h-5" />
      Chat Zalo ngay
    </button>
  );
}
