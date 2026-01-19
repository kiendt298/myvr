import { Zoom } from "react-toastify";

export const CONTACT_SUBJECTS = {
  ADVISE: "Tư vấn và đặt lịch quay",
  FORGOT_ACCOUNT: "Quên thông tin đăng nhập",
};

export const CONTACT_ERRS = {
  NAME: "Tên không hợp lệ",
  PHONE: "Số điện thoại chưa chính xác!",
  MESSAGE: "Hãy cho chúng tôi biết cụ thể hơn chút về điều bạn mong đợi nhé!",
};

export const validatePhoneNumber = (phone: string) => {
  return phone.length >= 9;
};

export const validateMessage = (msg: string): boolean => msg.length >= 10;

export const validateName = (name: string): boolean => name.length >= 2;

export const QUOTATION_STATUSES = {
  DONE: "Hoàn tất",
  PENDING: "Đang chờ",
  CANCELED: "Đã huỷ",
};

export const USER_STATUSES = {
  CREATED: "Tạo mới",
  ACTIVED: "Đã kích hoạt",
  HOLDING: "Tạm dừng",
};

export const POST_STATUSES = {
  NEW: "Chờ duyệt",
  PUBLIC: "Đã duyệt",
  HIDING: "Đang ẩn",
};

export const CONTACT_STATUSES = {
  NEW: "Chờ duyệt",
  PUBLIC: "Đã duyệt",
  HIDING: "Đang ẩn",
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
};

export const PROVINCES = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Bình Dương",
  "Đồng Nai",
  "Vũng Tàu",
  "An Giang",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bến Tre",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên-Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

export type ModalSize = "small" | "medium";

export function getModalStyle(size: ModalSize) {
  let width: string;

  switch (size) {
    case "small":
      width = "400px";
      break;
    case "medium":
      width = "650px";
      break;
    default:
      width = "900px";
      break;
  }

  return {
    content: {
      width: width,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
}

const generateRandomWords = (
  count: number,
  maxLength: number = 7,
): string[] => {
  const words: string[] = [];

  for (let i = 0; i < count; i++) {
    let word = "";
    const wordLength = Math.floor(Math.random() * (maxLength - 3)) + 3;

    for (let j = 0; j < wordLength; j++) {
      const charCode = Math.floor(Math.random() * 26) + 97;
      word += String.fromCharCode(charCode);
    }

    words.push(word);
  }

  return words;
};

export const RANDOM_WORDS = generateRandomWords(1000);

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD") // Normalize to decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export const ToastProps: Record<string, any> = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: false,
  pauseOnHover: true,
  theme: "colored",
  transition: Zoom,
};
