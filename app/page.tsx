"use client";

import Link from "next/link";
import { useIsMobile } from "./(common)/_hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-gray-100">
      <section className="text-center py-12">
        <h1>
          <span className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light">
            LƯU GIỮ, HỒI TƯỞNG & TÁI HIỆN
          </span>
          <br />
          <br />
          <span className="text-2xl sm:text-3xl font-bold main-color leading-relaxed">
            Những khoảnh khắc quý giá & đáng nhớ nhất trong đời
          </span>
          <br />
          <span className="text-2xl sm:text-3xl font-bold main-color">
            Qua hình ảnh Thực tế ảo 3D
          </span>
        </h1>
        <br />
        <Link href="/services" className="mt-4">
          <span className="primary-btn font-semibold text-white px-8 py-3 rounded-full transition duration-300 animate-fadeInUp">
            Bắt đầu ngay
          </span>
        </Link>
      </section>

      {/* About MyVR */}
      <section className="py-8 px-4 bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100">
        <div className="flex flex-col lg:flex-row justify-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Giới thiệu về MyVR
            </h2>
            <ul className="mb-4 text-gray-700 default-list">
              <li>
                Chúng ta may mắn được sống trong thời đại công nghệ đột phá.
              </li>
              <li>
                Và mang đến trải nghiệm mà{" "}
                <b className="text-orange-700">
                  những thế hệ trước đây chưa từng có.
                </b>{" "}
              </li>
              <li>
                MyVR dẫn đầu xu hướng Thực tế ảo - nơi bước vào mọi không gian 1
                cách chân thực nhất.{" "}
              </li>
              <li>
                Bằng công nghệ{" "}
                <b className="text-orange-700">
                  lưu giữ ký ức trong không gian 3D
                </b>{" "}
                và tái hiện trên WebXR, bạn có thể:{" "}
                <p className="bg-background bg-[#913e1f17] p-3 rounded">
                  - Được sống và cảm nhận lại những phút giây trong quá khứ.{" "}
                  <br />
                  - Lưu giữ những khoảng khắc quý giá nhất của hiện tại. <br />-
                  Bảo tồn & trải nghiệm lại "ký ức 3D" trong tương lai.
                </p>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <iframe
              className="w-full rounded-lg aspect-video"
              src="https://www.youtube.com/embed/WDLEjh70vOM?si=iR7j9WhzmwwvM3p-"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* What's VR video */}
      <section className="py-8 px-4 bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100">
        <div className="flex flex-col lg:flex-row justify-center gap-8">
          <div className="lg:w-1/2">
            {/* <img
              src="/imgs/vi_du_ve_video_thuc_te_ao.jpg"
              alt="Ví dụ về video Thực tế ảo"
              className="w-full aspect-video rounded-lg object-cover shadow-md"
            /> */}
            <iframe
              className="w-full rounded-lg aspect-video"
              src="https://www.youtube.com/embed/NyeINqkeZe8?si=hw3JFSjgVOU9OaV7"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Tìm hiểu về Video Thực tế ảo
            </h2>

            <ul className="mb-4 text-gray-700 default-list">
              <li>
                {" "}
                Trải nghiệm video thực tế ảo 3D đem đến{" "}
                <b className="text-orange-700">cảm xúc khác hoàn toàn</b> với
                video thông thường.{" "}
              </li>
              <li>
                Bạn sẽ không có cảm giác đang{" "}
                <b className="text-orange-700">"xem"</b>, mà là đang{" "}
                <b className="text-orange-700">"sống"</b> trong không gian đang
                hiện hữu trước mắt.
              </li>
              <li>
                Trong không gian này, bạn sẽ nhìn thấy hình ảnh người thân sống
                động đến từng chi tiết, từ ánh mắt đến nụ cười, mang lại cảm
                giác như họ đang ở ngay bên cạnh.
              </li>
              <li>
                Trải nghiệm với kính VR sẽ đưa bạn trở lại những kỷ niệm đầy cảm
                xúc, như thể thời gian đang dừng lại ngay tại khoảnh khắc đó.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Tại sao chọn MyVR?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg shadow-lg bg-[#3b4f8b] text-yellow-900">
            <h3 className="font-bold text-yellow-100 text-lg">
              Ghi lại kỷ niệm <br /> bằng hình ảnh 3D siêu thực
            </h3>
            <p className="mt-4 text-white">
              Công nghệ quay 3D và các thiết bị VR hiện đại nhất.
            </p>
            <p className="mt-3 text-white">
              Mang lại hình ảnh và cảm xúc mà bạn chưa từng trải nghiệm trước
              đây khi xem lại.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-[#3b4f8b] text-yellow-900">
            <h3 className="font-bold text-yellow-100 text-lg">
              Lưu trữ và Xem lại <br /> bất cứ khi nào
            </h3>
            <p className="mt-4 text-white">
              MyVR là nền tảng duy nhất hiện tại ở Việt Nam có thể xem video qua
              kính Thực tế ảo.
            </p>
            <p className="mt-3 text-white">
              Xem trực tiếp mà không cần cài đặt bất kỳ phần mềm nào.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-[#3b4f8b] text-yellow-900">
            <h3 className="font-bold text-yellow-100 text-lg">
              Chia sẻ <br /> cùng người thân, bạn bè
            </h3>
            <p className="mt-4 text-white">
              Dễ dàng chia sẻ những khoảnh khắc đáng nhớ của bạn với gia đình và
              bạn bè chỉ bằng 1 đường link.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-[#3b4f8b] text-yellow-900">
            <h3 className="font-bold text-yellow-100 text-lg">
              Hoàn hảo <br /> cho mọi kỷ niệm
            </h3>
            <p className="mt-4 text-white">
              Từ các buổi sum họp gia đình đến những khoảnh khắc yêu thương,
              cưới hỏi, vui đùa với thú cưng...
              <b className="text-orange-300">
                thậm chí cả những khoảnh khắc ta biết chắc rằng không thể gặp
                lại 1 lần nữa.
              </b>
            </p>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="p-2 sm:p-8 xl:p-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Khám phá MyVR</h2>
        <div className="flex flex-col sm:flex-row sm:justify-center md:max-xl:grid md:max-xl:grid-cols-2 gap-4">
          <iframe
            className="xl:w-1/3 md:max-xl:mx-auto rounded-lg aspect-video"
            height={isMobile ? undefined : "220px"}
            src="https://www.youtube.com/embed/WDLEjh70vOM?si=iR7j9WhzmwwvM3p-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="xl:w-1/3 md:max-xl:mx-auto rounded-lg aspect-video"
            height={isMobile ? undefined : "220px"}
            src="https://www.youtube.com/embed/52vtguDb5-c?si=b2E7k8Iq0DOAiU-N"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="xl:w-1/3 md:max-xl:mx-auto rounded-lg aspect-video"
            height={isMobile ? undefined : "220px"}
            src="https://www.youtube.com/embed/-8vHG7ck40o?si=Wh_4v7BDPP2YAFWG"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* <iframe
            className="xl:w-1/3 md:max-xl:mx-auto rounded-lg aspect-video"
            height={isMobile ? undefined : "220px"}
            src="https://www.youtube.com/embed/ixOBtUGKYio?si=p540486ntCJdy2R8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-extrabold font-sans mb-6 main-color text-center">
          Cách MyVR giúp bạn lưu giữ ký ức
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="font-bold mb-2 main-color">
              1. Ghi lại khoảnh khắc
            </h3>
            <p>Gặp mặt tư vấn và lên ý tưởng theo yêu cầu của bạn.</p>
            <p>
              Dựng video bằng các thiết bị hỗ trợ thực tế ảo 3D chuyên dụng.
            </p>
            <p>Hỗ trợ kính VR để bạn có thể xem lại hình ảnh tức thì.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="font-bold mb-2 main-color">2. Tải lên MyVR</h3>
            <p>
              Lưu trữ và bảo quản các video 3D của bạn trên nền tảng vĩnh viễn.
            </p>
            <p>
              Cung cấp tài khoản để có thể xem lại những "kỷ niệm" của bạn riêng
              tư nhất.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="font-bold mb-2 main-color">
              3. Trải nghiệm bất cứ lúc nào
            </h3>
            <p>Truy cập MyVR và đăng nhập.</p>
            <p>Xem lại video của bạn trên mọi thiết bị hỗ trợ WebXR.</p>
            <p>Không cần cài đặt thêm bất kỳ phần mềm nào.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="p-8 sm:py-16 mb-8 bg-gradient-to-b from-white via-[#c6dded] to-white main-color text-center rounded">
        <h2 className="text-xl sm:text-3xl font-bold mb-6">
          Bạn đã sẵn sàng lưu giữ những khoảnh khắc duy nhất trong đời với MYVR?
          <br />
        </h2>

        <Link href="/services">
          <span className="primary-btn font-semibold text-white px-8 py-3 rounded-full transition duration-300 animate-fadeInUp">
            Bắt đầu ngay
          </span>
        </Link>
      </section>
    </div>
  );
}
