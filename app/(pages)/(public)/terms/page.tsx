import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-[#c8d6ff] text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">
        Điều Khoản Sử Dụng
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
        <p className="text-gray-700">
          Bằng cách truy cập và sử dụng trang web MyVR, bạn đồng ý tuân thủ các
          điều khoản và điều kiện sử dụng dưới đây. Nếu bạn không đồng ý với bất
          kỳ điều khoản nào, vui lòng không sử dụng trang web của chúng tôi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Quyền Sử Dụng</h2>
        <p className="text-gray-700">
          Bạn được cấp quyền sử dụng trang web cho mục đích cá nhân và phi
          thương mại. Không được sao chép, chỉnh sửa hoặc phân phối bất kỳ nội
          dung nào mà không có sự đồng ý của chúng tôi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Trách Nhiệm Người Dùng
        </h2>
        <p className="text-gray-700">
          Bạn chịu trách nhiệm hoàn toàn cho tất cả các hoạt động diễn ra trên
          tài khoản của mình. Vui lòng không sử dụng trang web cho các hoạt động
          vi phạm pháp luật hoặc gây hại cho người khác.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Quyền Riêng Tư</h2>
        <p className="text-gray-700">
          Việc sử dụng trang web được điều chỉnh bởi chính sách bảo mật của
          chúng tôi. Vui lòng đọc kỹ để hiểu rõ cách chúng tôi thu thập, sử dụng
          và bảo vệ thông tin cá nhân của bạn.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Từ Chối Trách Nhiệm</h2>
        <p className="text-gray-700">
          Trang web và tất cả nội dung được cung cấp "như hiện trạng". Chúng tôi
          không chịu trách nhiệm cho bất kỳ lỗi, thiếu sót hoặc sự cố nào có thể
          xảy ra trong quá trình sử dụng.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Thay Đổi Điều Khoản</h2>
        <p className="text-gray-700">
          Chúng tôi có quyền thay đổi các điều khoản sử dụng bất kỳ lúc nào. Mọi
          thay đổi sẽ có hiệu lực ngay sau khi được đăng tải trên trang web.
        </p>
      </section>

      <p className="text-gray-600 text-center mt-10">
        Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ
        với chúng tôi.
      </p>
    </div>
  );
};

export default TermsOfService;
