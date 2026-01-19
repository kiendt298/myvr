import ContactForm from "@/app/(common)/_components/Contacts/ContactForm";
import { Button } from "@/app/(common)/_components/ShadcnComponents/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(common)/_components/ShadcnComponents/popover";
import DangerouslyInnerHtmlWrapper from "@/app/(common)/_components/Wrappers/DangerouslyInnerHtmlWrapper";
import {
  getMainServiceByPostFixURL,
  isSlugInServicePostfixUrls,
} from "@/app/(common)/_utils/service-info";
import { IPost } from "@/app/(server)/database/models/Post";
import { getRelativePostsByServiceId } from "@/app/(server)/services/postService";

const ServiceDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  if (!isSlugInServicePostfixUrls(slug)) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p>
          Link hiện tại không truy cập được... <br /> Vui lòng thử lại!
        </p>
      </div>
    );
  }

  const serviceDetail = getMainServiceByPostFixURL(slug);
  let relativePosts: IPost[] = [];

  try {
    if (serviceDetail?.mappingId)
      relativePosts = await getRelativePostsByServiceId(
        serviceDetail.mappingId,
      );
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="w-full xl:w-2/3">
        <div className="px-4 py-8 bg-gradient-to-b from-gray-100 via-[#ffeee6] to-gray-100">
          <h4 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light text-center mb-0">
            {serviceDetail?.title}
          </h4>
          <DangerouslyInnerHtmlWrapper
            htmlContent={serviceDetail?.fullDescription}
            className="cus-ckeditor-styles text-gray-700"
            style={{ paddingTop: 0 }}
          />

          {/* Call to Action */}
          <section className="py-8 mb-8 bg-gradient-to-b from-white via-[#c6dded] to-white main-color text-center rounded-xl">
            <h2 className="text-xl font-bold mb-6">
              Bạn đã sẵn sàng lưu giữ những khoảnh khắc duy nhất trong đời với
              MYVR?
              <br />
            </h2>
            <Popover>
              <PopoverTrigger className="">
                <Button className="bg-[#4c619f] p-8 text-xl" asChild>
                  <span className="font-semibold">BẮT ĐẦU NGAY</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={2}
                style={{ width: "100%", margin: "1rem 0" }}
              >
                <ContactForm selectedPackage={serviceDetail?.mappingId} />
              </PopoverContent>
            </Popover>
          </section>
        </div>
      </div>
      <Popover>
        <PopoverTrigger className="fixed right-2 bottom-20 xl:hidden">
          <Button className="bg-[#4c619f] py-4" asChild>
            <span>Liên hệ tư vấn</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={2}>
          <ContactForm selectedPackage={serviceDetail?.mappingId} />
        </PopoverContent>
      </Popover>
      <div className="w-full xl:w-1/3">
        <div className="bg-white p-4 mb-8 rounded-lg border border-gray-200 shadow-md hidden xl:block">
          <ContactForm selectedPackage={serviceDetail?.mappingId} />
        </div>

        {/* TODO: will reopen later */}
        {/* <div className="h-auto bg-gray-200 p-8 rounded-lg border border-gray-200">
          <h4 className="font-extrabold text-2xl mb-4 main-color uppercase font-sans">
            Những câu chuyện thật
          </h4>

          <div className="space-y-8">
            {relativePosts.length ? (
              relativePosts.map((post) => (
                <div key={post.id} className="gap-4">
                  <img
                    src={post?.thumbnail || "/imgs/myvr_black_thumbnail.png"}
                    alt={post.title}
                    className="object-cover w-full h-48 rounded-lg mb-2"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-lg text-gray-700 hover:underline cursor-pointer">
                      <a
                        href={`/cau-chuyen/${post.title_url}-${post.simplified_id}`}
                      >
                        {post.title}
                      </a>
                    </h5>
                    <div className="flex justify-between items-start text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faEye} />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                      <p className="text-gray-500">{toDateString(post.date)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-base text-gray-500">
                Chưa có bài viết liên quan
              </div>
            )}

            <Link
              className="inline-block w-fit mt-4 bg-[#7a8d7f] text-white py-2 px-4 rounded font-bold"
              href={`/${VN_REWRITE_SEGMENT_URLS.posts}/${serviceDetail?.postFixUrl}`}
            >
              Xem thêm
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
