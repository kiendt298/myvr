import QuotationDetail from "@/app/(common)/_components/Quotations/QuotationDetail";
import {
  getQuotationDetailById,
  getQuotationDetailBySimplifedId,
} from "@/app/(server)/services/quotationService";
import {
  faMoneyBill,
  faUniversity,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuotationDetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const quotation = await getQuotationDetailBySimplifedId(slug);
  if (!quotation) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p>
          Link hiện tại không truy cập được... <br /> Vui lòng thử lại!
        </p>
      </div>
    );
  }

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(value));
  };

  const BANK_INFO = {
    name: "Ngân hàng Tiên Phong (Tien Phong Bank)",
    accountName: "Dương Văn Thuật",
    accountNumber: "0000 5258 665",
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8">
      <div className="w-full sm:w-3/5">
        <QuotationDetail data={quotation} htmlContent={quotation?.content} />
      </div>
      <div className="w-full sm:w-2/5 p-8 bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100">
        <h4 className="font-semibold text-2xl mb-4 main-color">
          Thông tin chuyển khoản
        </h4>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faUniversity}
              className="text-gray-400 w-5 h-5 mr-3"
            />
            <span>
              <strong> {BANK_INFO.name}</strong>
            </span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-400 w-5 h-5 mr-3"
            />
            <span>
              <strong>Tên tài khoản:</strong>
              <span className="text-purple-900 font-semibold ml-2">
                {BANK_INFO.accountName}
              </span>
            </span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="text-gray-400 w-5 h-5 mr-3"
            />
            <span>
              <strong>Số tài khoản:</strong>
              <span className="text-purple-900 font-semibold ml-2">
                {BANK_INFO.accountNumber}
              </span>
            </span>
          </li>
        </ul>

        <ul className="border border-gray-300 rounded-lg mt-6 p-4 bg-gray-100">
          <li className="mb-3">
            <p>
              <strong>Nội dung:</strong>{" "}
              <span className="text-purple-900 font-semibold ml-2">
                SĐT - Tên
              </span>
            </p>
            <p className="text-gray-500 font-semibold mt-1">
              Ví dụ: 0987654321 - Nguyen Van A
            </p>
          </li>
          <li className="flex items-center">
            <span>
              <strong>Số tiền:</strong>
              <span className="text-purple-900 font-semibold ml-2">
                {formatCurrency(quotation?.estimated_cost?.toString() || "")}
              </span>
            </span>
          </li>
        </ul>
        <div className="mt-6 flex flex-col items-center">
          <h4 className="text-sm text-gray-500 mb-2">
            Quét mã QR để thanh toán
          </h4>
          <img
            src="/imgs/qr-bank.png"
            alt="QR Code"
            className="w-1/2 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationDetailPage;
