"use client";
import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { jwtDecode } from "jwt-decode";

export const CreatePost = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const token = localStorage.getItem("token");
  const decoded: { userId: string } = jwtDecode(token || "");
  const userId = decoded.userId;

  const newPost = async () => {
    const newBro = {
   user:userId,
      postImage:uploadedImages,
   description:"hi"
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

  const uploadImages = async () => {
    if (!images) return;

    const uploadPromises = Array.from(images).map(async (image) => {
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
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setImages(files);
          }
        }}
        className="file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
      />

      <button onClick={uploadImages}>Upload</button>

      <div className="max-w-[500px] mx-auto">
              <Carousel className="overflow-hidden">
                <CarouselContent>
                  {uploadedImages.map((img, index) => (
                    <CarouselItem className="basis-1/2" key={index}>
                  <img
            key={index}
            src={img}
                  className="w-full h-auto object-cover"
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


 