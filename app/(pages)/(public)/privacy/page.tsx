import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-[#c8d6ff] text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">
        Chính Sách Bảo Mật
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
        <p className="text-gray-700">
          Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật
          này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân
          của bạn khi sử dụng trang web MyVR.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Thông Tin Chúng Tôi Thu Thập
        </h2>
        <p className="text-gray-700">
          Chúng tôi có thể thu thập các thông tin như tên, địa chỉ email, số
          điện thoại, và thông tin về cách bạn sử dụng trang web của chúng tôi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Cách Chúng Tôi Sử Dụng Thông Tin
        </h2>
        <p className="text-gray-700">
          Thông tin của bạn được sử dụng để cải thiện trải nghiệm người dùng,
          gửi thông tin cập nhật và hỗ trợ bạn tốt hơn khi cần.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Chia Sẻ Thông Tin</h2>
        <p className="text-gray-700">
          Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ
          khi được sự đồng ý của bạn hoặc khi cần thiết để tuân thủ pháp luật.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Bảo Mật Thông Tin</h2>
        <p className="text-gray-700">
          Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin cá nhân
          của bạn khỏi truy cập trái phép hoặc bị tiết lộ.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Quyền Của Bạn</h2>
        <p className="text-gray-700">
          Bạn có quyền yêu cầu truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân
          của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Thay Đổi Chính Sách</h2>
        <p className="text-gray-700">
          Chính sách bảo mật có thể thay đổi theo thời gian. Mọi thay đổi sẽ
          được cập nhật trên trang này để bạn có thể theo dõi.
        </p>
      </section>

      <p className="text-gray-600 text-center mt-10">
        Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ
        với chúng tôi.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
