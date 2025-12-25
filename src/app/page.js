"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setUrl(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter the url.");
    } else {
      setIsLoading(true);
      axios.post("/api/yt-details", { url }).then((result) => {
        if (result.data.Success === true) {
          localStorage.setItem(
            "videoDetails",
            JSON.stringify(result.data.videoDetails)
          );

          localStorage.setItem(
            "negativeComments",
            JSON.stringify(result.data.negativeComments)
          );

          localStorage.setItem(
            "positiveComments",
            JSON.stringify(result.data.positiveComments)
          );

          localStorage.setItem(
            "abusiveComments",
            JSON.stringify(result.data.abusiveComments)
          );

          localStorage.setItem(
            "demandingComments",
            JSON.stringify(result.data.demandingComments)
          );
          setIsLoading(false);
          router.push("/video-details");
        } else {
          setIsLoading(false);
          toast.error(result.data.msg);
        }
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            YT Comments Xpert
          </h1>
          <p className="text-lg text-gray-600">
            Analyze YouTube comments with AI-powered sentiment analysis.
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Video URL
              </Label>
              <div className="mt-1">
                <Input
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  type="text"
                  autoComplete="off"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              {isLoading ? (
                <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 cursor-not-allowed"
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyze
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Analyze Comments
                </button>
              )}
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or check out
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="https://captionizer-star.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Captionizer &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


