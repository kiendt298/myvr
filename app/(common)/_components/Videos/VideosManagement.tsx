"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import DL8VideoPlayer from "@/app/(common)/_components/DL8VideoPlayer";
import { DL8VideoFormatEnum } from "@/app/(common)/_utils/enums";
import { IVRtubeVideo } from "@/app/(server)/database/models/VRtubeVideo";
import { toDateString } from "../../_helpers/transform";

type Video = {
  id: number;
  title: string;
  uploadDate: string;
  views: number;
  url: string;
  thumbnails: string;
};

const initialVideos: Video[] = [
  {
    id: 1,
    title: "Ngồi thiền xin đừng làm phiền",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video1.mp4",
    thumbnails: "/imgs/thumbnails/video1.png",
  },
  {
    id: 2,
    title: "Chơi game lúc nửa đêm",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video2.mp4",
    thumbnails: "/imgs/thumbnails/video2.png",
  },
  {
    id: 3,
    title: "Khám phá khoa học mà không cần đọc",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video3.mp4",
    thumbnails: "/imgs/thumbnails/video3.png",
  },
  {
    id: 4,
    title: "Vẽ tranh 3D nhìn rất là mê",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video4.mp4",
    thumbnails: "/imgs/thumbnails/video4.png",
  },
  {
    id: 5,
    title: "This is the title for video 5",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video5.mp4",
    thumbnails: "/imgs/thumbnails/video5.png",
  },
  {
    id: 6,
    title: "This is the title for video 6",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video6.mp4",
    thumbnails: "/imgs/thumbnails/video6.png",
  },
  {
    id: 7,
    title: "This is the title for video 7",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video7.mp4",
    thumbnails: "/imgs/thumbnails/video7.png",
  },
  {
    id: 8,
    title: "This is the title for video 8",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video8.mp4",
    thumbnails: "/imgs/thumbnails/video8.png",
  },
  {
    id: 9,
    title: "This is the title for video 9",
    uploadDate: "31-12-2024",
    views: 1234,
    url: "/vids/video9.mp4",
    thumbnails: "/imgs/thumbnails/video9.png",
  },
];

export default function VideosManagement({
  videos,
}: {
  videos: IVRtubeVideo[];
}) {
  const [currentVideo, setCurrentVideo] = useState<IVRtubeVideo>(videos[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Display 4 videos per page
  const videosPerPage = 4;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const paginatedVideos = videos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  if (!videos.length)
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p>Hiện tại chưa có video...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 flex flex-wrap bg-gradient-to-b from-gray-100 via-[#e7c7b9] to-gray-100">
      {/* Main Video Display */}
      <div className="w-full lg:w-3/5 mb-8 lg:mb-0">
        <div className="text-sm font-bold text-[#4f260f] mb-2 bg-[#e7c7b9] py-2 px-4 rounded border">
          Đây là nội dung video Thực tế ảo 3D, hãy xem bằng kính VR để có trải
          nghiệm chân thực nhất!
        </div>
        <DL8VideoPlayer
          key={currentVideo.id}
          source={currentVideo.source[0]}
          title={currentVideo.vietnameseTitle || currentVideo.title}
          thumbnail={currentVideo.thumbnail_img}
          videoFormat={DL8VideoFormatEnum.STEREO_180_LR}
        />
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-blue-900">
            {currentVideo.vietnameseTitle || currentVideo.title}
          </h2>
          <p className="text-gray-700">
            <b>Ngày đăng:</b> {toDateString(currentVideo.updated_at)}
          </p>
          <p className="text-gray-700">
            <b>Lượt xem:</b> {currentVideo.views.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Video List with Pagination */}
      <div className="w-full lg:w-2/5 lg:pl-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          Danh sách video của bạn
        </h3>
        <div className="space-y-4">
          {paginatedVideos.map((video) => (
            <div
              key={video.id}
              className="flex items-start cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => setCurrentVideo(video)}
            >
              <img
                src={video.thumbnail_img}
                alt={`Thumbnail for ${video.title}`}
                className="w-1/3 h-20 object-cover rounded"
              />
              <div className="w-2/3 pl-4">
                <p className="font-semibold text-blue-900">
                  {video.vietnameseTitle || video.title}
                </p>
                <p className="text-gray-600">
                  <b>Ngày đăng:</b> {toDateString(video.created_at)}
                </p>
                <p className="text-gray-600">
                  <b>Lượt xem:</b> {video.views.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex mt-4">
          <div className="flex space-x-2">
            {/* First and Previous Buttons */}
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-200 text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} size="sm" />
            </button>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-200 text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faAngleLeft} size="sm" />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Next and Last Buttons */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-200 text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} size="sm" />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-200 text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} size="sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
