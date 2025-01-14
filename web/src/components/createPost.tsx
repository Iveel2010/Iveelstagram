"use client";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { jwtDecode } from "jwt-decode";

export const CreatePost = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [one, setOne] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const theme = localStorage.getItem("theme");
  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true);
    }
  }, []);
  const token = localStorage.getItem("token");
  const decoded: { userId: string } = jwtDecode(token || "");
  const userId = decoded.userId;

  const newPost = async () => {
    const newBro = {
      user: userId,
      postImage: uploadedImages,
      description: "My dogs and flowers",
    };
    const jsonData = await fetch(
      `https://instagram-server-2phx.onrender.com/createPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBro),
      }
    );
    const response = await jsonData.json();
    console.log(response.token);
  };

  const uploadImages = async (files: []) => {
    if (!files) return console.log("opso");
    console.log(files);
    console.log("ol");
    const uploadPromises = Array.from(files).map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ace_area");
      formData.append("cloud_name", "dl93ggn7x");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      return result.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4 ">
      {one === true ? null : (
        <div className="relative w-full group">
          <div
            className={
              isDarkMode === true
                ? "relative z-40 cursor-pointer group-hover:translate-x-8 group-hover:shadow-2xl group-hover:-translate-y-8 transition-all duration-500 bg-neutral-900 flex items-center justify-center h-32 w-32 mx-auto rounded-xl"
                : "relative z-40 cursor-pointer group-hover:translate-x-8 group-hover:shadow-2xl group-hover:-translate-y-8 transition-all duration-500 bg-gray-300 flex items-center justify-center h-32 w-32 mx-auto rounded-xl"
            }
          >
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setImages(files);
                  setOne(true);
                  uploadImages(files);
                }
              }}
              className="h-full w-full opacity-0 cursor-pointer "
            />
            <div className="flex absolute z-[-999] w-full h-full items-center justify-center">
              <svg
                className="h-6 w-6 text-white/60  "
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 9l5 -5l5 5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
            </div>
          </div>
          <div className="absolute border opacity-0 group-hover:opacity-80 transition-all duration-300 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 w-32 mx-auto rounded-xl">
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setImages(files);
                  uploadImages();
                }
              }}
              className="h-full w-full opacity-0 cursor-pointer "
            />
          </div>
        </div>
      )}

      <div className="max-w-[500px] mx-auto">
        <Carousel className="overflow-hidden">
          <CarouselContent>
            {uploadedImages.map((img, index) => (
              <CarouselItem
                className=" basis-1/2 gap-1 h-auto max-w-full  overflow-hidden"
                key={index}
              >
                <img
                  key={index}
                  src={img}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:text-gray-300" />
          <CarouselNext className="hover:text-gray-300" />
        </Carousel>
      </div>
      <button onClick={newPost}>create</button>
    </div>
  );
};
