import DangerouslyInnerHtmlWrapper from "@/app/(common)/_components/Wrappers/DangerouslyInnerHtmlWrapper";
import { toDateString } from "@/app/(common)/_helpers/transform";
import { POST_STATUSES } from "@/app/(common)/_utils/constant";
import { postsMockData } from "@/app/(common)/_utils/mock";
import { VN_REWRITE_SEGMENT_URLS } from "@/app/(common)/_utils/rewrite-urls";
import { getBriefServiceURLById } from "@/app/(common)/_utils/service-info";
import {
  getPostDetailBySimplifiedId,
  getRelativePostsByServiceId,
  viewPost,
} from "@/app/(server)/services/postService";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PostDetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const simplifiedId = slug.split("-").slice(-1)[0];
  const post = await getPostDetailBySimplifiedId(parseInt(simplifiedId));
  const recommendations = await getRelativePostsByServiceId(
    post.package_id,
    post.id,
  );

  if (!post || post.status !== POST_STATUSES.PUBLIC) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p>
          Link hiện tại không truy cập được... <br /> Vui lòng thử lại!
        </p>
      </div>
    );
  }

  await viewPost(post?.id ?? "");

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-2">
      <div className="w-full lg:w-2/3">
        <div>
          <h4 className="text-2xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light">
            {post?.title}
          </h4>

          <div className="flex items-start text-sm text-gray-600 mt-2">
            {/* Stats */}
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

            {/* Date */}
            <p className="text-gray-500 ml-3">{toDateString(post.date)}</p>
          </div>
        </div>

        <div className="px-4 py-8 bg-gradient-to-b from-gray-100 via-[#ffeee6] to-gray-100">
          <DangerouslyInnerHtmlWrapper
            className="cus-ckeditor-styles"
            htmlContent={post?.content}
          ></DangerouslyInnerHtmlWrapper>
        </div>
      </div>
      <div className="w-full lg:w-1/3 h-full space-y-4 bg-white p-8 rounded-lg border border-gray-200 shadow-md">
        <h4 className="font-semibold text-2xl mb-4 main-color">
          Bạn hãy đọc thêm:
        </h4>

        <div className="space-y-8">
          <div className="sm:max-lg:grid sm:max-lg:grid-cols-2 sm:max-lg:gap-6">
            {recommendations.length ? (
              recommendations.map((post) => (
                <div key={post.id} className="gap-4">
                  {/* Thumbnail */}
                  <img
                    src={post?.thumbnail || "/imgs/myvr_logo_min.png"}
                    alt={post.title}
                    className="object-cover w-full h-48 rounded-lg mb-2"
                  />

                  {/* Post Details */}
                  <div className="flex-1">
                    <Link
                      href={`/cau-chuyen/${post.title_url}-${post.simplified_id}`}
                    >
                      <h5 className="font-semibold text-lg text-gray-700 hover:underline cursor-pointer">
                        {post.title}
                      </h5>
                    </Link>
                    <div className="flex justify-between items-start text-sm text-gray-600 mt-2">
                      {/* Stats */}
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

                      {/* Date */}
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
          </div>

          <Link
            className="inline-block mt-4 w-fit bg-[#7a8d7f] text-white py-2 px-4 rounded font-bold"
            href={
              `/${VN_REWRITE_SEGMENT_URLS.posts}/` +
              getBriefServiceURLById(post?.package_id + "")?.postFixUrl
            }
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
