"use client";
// pages/page.tsx
import React, { useRef } from "react";

const VideoPage = () => {
  // Array of video data (URLs or video file names in the public folder)
  const videos = [
    {
      src: "/vids/bua_com_voi_nguoi_me_da_mat.mp4",
      title: "Cùng ăn cơm với Mẹ (đã mất)",
    },
    {
      src: "/vids/xem_lai_dam_cuoi_cua_chinh_minh.mp4",
      title: '"Dự" đám cưới của chính mình',
    },
    {
      src: "/vids/nguoi_gia_thay_con_chau_o_xa.mp4",
      title: "Ông bà thấy con cháu ở xa",
    },
    {
      src: "/vids/nhin_lai_hanh_trinh_truong_thanh_cua_con.mp4",
      title: "Nhìn lại hành trình trưởng thành của con",
    },
  ];

  // Explicitly type the ref as an array of HTMLVideoElement or null
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Function to play all videos
  const playAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play();
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={playAllVideos}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
      >
        Play All Videos
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-4xl">
        {videos.map((video, index) => (
          <div
            key={index}
            className="flex flex-col bg-blue-500 rounded-lg overflow-hidden shadow-lg"
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el; // Assign the video element to the ref
              }}
              src={video.src}
              controls={false} // Disable controls
              className="w-full object-cover"
              onEnded={() => {
                if (videoRefs.current[index]) {
                  videoRefs.current[index]?.play(); // Replay video when it ends
                }
              }}
            />
            <div className="p-2 bg-gray-800 text-white text-center font-bold">
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
