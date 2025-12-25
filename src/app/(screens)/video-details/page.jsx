"use client";
import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Page() {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const videoDetails = JSON.parse(localStorage.getItem("videoDetails"));
    if (videoDetails) {
      setVideoData(videoDetails);
    }
  }, []);

  if (!videoData) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center antialiased relative">
        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800">
            Loading ...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center antialiased relative">
      {videoData == {} ? (
        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-gray-800">
            No Video Found
          </h2>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-8">
          <div className="w-full text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 px-4">
              {videoData.title}
            </h1>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-center items-start w-full gap-8 max-w-6xl">
            {/* Video Card */}
            <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                 <img
                  src={videoData.thumbnail}
                  className="w-full h-full object-cover"
                  alt="Thumbnail"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {videoData.channelTitle}
                  </h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                  <div className="flex flex-col items-center text-gray-600">
                    <IoEyeSharp className="w-6 h-6 mb-1 text-blue-500" />
                    <span className="text-sm font-medium">{videoData.viewCount}</span>
                    <span className="text-xs text-gray-400">Views</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-600">
                    <FcLike className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">{videoData.likeCount}</span>
                    <span className="text-xs text-gray-400">Likes</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-600">
                    <AiOutlineComment className="w-6 h-6 mb-1 text-blue-500" />
                    <span className="text-sm font-medium">{videoData.commentCount}</span>
                    <span className="text-xs text-gray-400">Comments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Options */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Results</h3>
              <FlexMessages
                heading="View Negative Comments"
                redirectRoute="negativeComments"
                colorClass="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
              />
              <FlexMessages
                heading="View Positive Comments"
                redirectRoute="positiveComments"
                colorClass="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
              />
              <FlexMessages
                heading="View Abusive Comments"
                redirectRoute="abusiveComments"
                colorClass="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
              />
              <FlexMessages
                heading="View Demanding Comments"
                redirectRoute="demandingComments"
                colorClass="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FlexMessages({ redirectRoute, heading, className, colorClass }) {
  const router = useRouter();
  return (
    <div className={"w-full " + className}>
      <button
        onClick={() => router.push(`/${redirectRoute}`)}
        className={`w-full p-4 rounded-lg text-left text-sm font-medium transition-colors border ${colorClass}`}
      >
        <span className="flex items-center justify-between">
          <span>{heading}</span>
          <span>&rarr;</span>
        </span>
      </button>
    </div>
  );
}
