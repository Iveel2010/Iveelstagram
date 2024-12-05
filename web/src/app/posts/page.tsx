"use client";
import { useState, useEffect } from "react";
type postType = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  description: string;
  postImage: string[];
  likes: likeType[];
  comments: commentType[];
}[];
type likeType = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  postId: string;
  userId: string;
}[];
type commentType = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  comment: string;
  userId: string;
}[];
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const page = () => {
  const [posts, setPosts] = useState<postType>([]);

  const getPost = async () => {
    console.log("working");
    const jsonData = await fetch(
      "https://instagram-server-2phx.onrender.com/post"
    );
    const response = await jsonData.json();
    setPosts(response);
    console.log(response);
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log(posts);
  return (
    <div>
      <div>
        {posts?.map((post) => {
          return (
            <div key={post._id}>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div>{post.description}</div>
                <Carousel className="max-w-[500px] max-h-[800px]">
                  <CarouselContent>
                    {post.postImage?.map((postImages, index) => {
                      return (
                        <CarouselItem key={index}>
                          <img src={postImages} />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default page;
