import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IPost } from "@/app/(server)/database/models/Post";
import { getPublicPostsBySearchParams } from "@/app/(server)/services/postService";
import Link from "next/link";
import { cn, toDateString } from "@/app/(common)/_helpers/transform";
import { BRIEF_SERVICES } from "@/app/(common)/_utils/service-info";

const PAGE_LIMIT = 10;

async function PostsPage({
  params: { slug },
  searchParams: { page = "1" },
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let posts: IPost[] = [];
  let count = 0;
  let numOfPages = 0;

  try {
    const result = await getPublicPostsBySearchParams({
      pagination: {
        limit: PAGE_LIMIT,
        skip: (parseInt(page as string) - 1) * PAGE_LIMIT,
      },
      briefServiceId: BRIEF_SERVICES.find((s) => s.postFixUrl === slug)?.id,
    });
    posts = result?.data;
    count = result?.count;
    numOfPages = Math.ceil(count / PAGE_LIMIT);
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100 text-white font-sans">
        <h4 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light text-center mb-0">
          NHỮNG CÂU CHUYỆN ĐỒNG HÀNH VỚI MYVR
        </h4>

        <div className="p-8">
          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="gap-4">
                {/* Thumbnail */}
                <img
                  src={post?.thumbnail || "/imgs/myvr_logo_min.png"}
                  alt={post.title}
                  className="object-cover w-full h-56 rounded-lg mb-2"
                />

                {/* Post Details */}
                <div className="flex-1">
                  <h5 className="font-semibold text-lg text-gray-700 hover:underline cursor-pointer">
                    <Link
                      href={`/cau-chuyen/${post.title_url}-${post.simplified_id}`}
                    >
                      {post.title}
                    </Link>
                  </h5>
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
            ))}
          </div>
        </div>
      </div>

      {/* Pagination UI */}
      <div className="flex items-center space-x-2 mt-8">
        {/* First Button */}
        <Link
          className={cn("px-3 py-2 text-gray-700 hover:bg-gray-200 rounded", {
            "pointer-events-none opacity-50": page === "1",
          })}
          href={{
            query: { page: 1 },
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Link>

        {/* Previous Button */}
        <Link
          className={cn("px-3 py-2 text-gray-700 hover:bg-gray-200 rounded", {
            "pointer-events-none opacity-50": page === "1",
          })}
          href={{
            query: { page: parseInt(page as string) - 1 },
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>

        {/* Page Numbers */}
        {Array.from({
          length: numOfPages,
        }).map((_, index) => (
          <Link
            key={index}
            href={{
              query: { page: index + 1 },
            }}
            className={`px-3 py-2 rounded ${
              index + 1 === parseInt(page as string)
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={{
            query: { page: parseInt(page as string) + 1 },
          }}
          className={cn("px-3 py-2 text-gray-700 hover:bg-gray-200 rounded", {
            "pointer-events-none opacity-50":
              parseInt(page as string) === numOfPages,
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>

        {/* Last Button */}
        <Link
          href={{
            query: { page: count },
          }}
          className={cn("px-3 py-2 text-gray-700 hover:bg-gray-200 rounded", {
            "pointer-events-none opacity-50":
              parseInt(page as string) === numOfPages,
          })}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Link>
      </div>
    </>
  );
}

export default PostsPage;
