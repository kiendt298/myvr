import React from "react";
import { IQuotation } from "@/app/(server)/database/models/Quotation";
import SubmitButtonWrapper from "../Wrappers/SubmitButtonWrapper";
import { BRIEF_SERVICES } from "../../_utils/service-info";

interface QuotationDetailUIProps {
  data?: IQuotation | null;
  htmlContent?: string;
  CTA?: { name: string };
}

const QuotationDetail: React.FC<QuotationDetailUIProps> = ({
  data,
  htmlContent,
  CTA,
}) => {
  return (
    <div className="space-y-4 bg-white p-8 rounded-lg border border-gray-200 shadow-md">
      <div>
        <h4 className="font-semibold text-2xl text-center main-color">
          {data?.title || "- Tiêu đề báo giá -"}
        </h4>
      </div>

      <div className="flex items-center space-x-2">
        <h4 className="font-semibold text-gray-500">Tên khách hàng:</h4>
        <p
          className={data?.customer_name ? "text-indigo-500" : "text-gray-300"}
        >
          {data?.customer_name || ".".repeat(80)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <h4 className="font-semibold text-gray-500">Số điện thoại:</h4>
        <p className={data?.phone ? "text-indigo-500" : "text-gray-300"}>
          {data?.phone || ".".repeat(85)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <h4 className="font-semibold text-gray-500">Dịch vụ đăng ký:</h4>
        <p
          className={
            BRIEF_SERVICES.find((s) => s.id === data?.package)
              ? "text-indigo-500"
              : "text-gray-300"
          }
        >
          {BRIEF_SERVICES.find((s) => s.id === data?.package)?.title ||
            ".".repeat(80)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <h4 className="font-semibold text-gray-500">Khu vực:</h4>
        <p className={data?.place ? "text-indigo-500" : "text-gray-300"}>
          {data?.place || ".".repeat(93)}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-500">Nội dung:</h4>
        <div
          className="cus-ckeditor-styles ck-border"
          dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
        ></div>
      </div>
      <br />

      <div className="flex items-center space-x-2">
        <h4
          className="font-semibold text-gray-500"
          style={{ borderLeft: "8px solid #bf8871", paddingLeft: "5px" }}
        >
          Tổng chi phí tạm tính:
        </h4>
        <p className="text-indigo-500">
          {new Intl.NumberFormat("en-US").format(Number(data?.estimated_cost))}
          <span className="text-indigo-500 ml-1">VNĐ</span>
        </p>
      </div>

      {CTA && (
        <div className="text-right">
          <SubmitButtonWrapper className="bg-blue-600 text-white px-12 py-2 rounded">
            {CTA.name}
          </SubmitButtonWrapper>
        </div>
      )}
    </div>
  );
};

export default QuotationDetail;
