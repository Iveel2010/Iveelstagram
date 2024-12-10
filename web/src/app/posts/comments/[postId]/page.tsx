"use client";
import { use, useEffect, useState } from "react";
type postType = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  description: string;
  postImage: string[];
  user: { profileImage: string; userName: string; _id: string };
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
  comment: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  userId: {
    _id: string;
    userName: string;
    profileImage: string;
  };
}[];
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const [comments, setComments] = useState<commentType>([]);
  const { postId } = use(params);
  const getPost = async () => {
    const jsonData = await fetch(
      `https://instagram-server-2phx.onrender.com/getComment/${postId}`
    );
    const response = await jsonData.json();
    setComments(response.comments);
    console.log(response.comments);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="bg-black h-screen w-full">
      <div className="pt-10">
        {comments.map((comment, index) => {
          return (
            <div key={index}>
              <div className="flex items-center gap-2 p-2 mb-2">
                <div className="flex items-center gap-2 ">
                  <Avatar>
                    <AvatarImage
                      src={comment.userId.profileImage}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-white font-bold">
                    {comment.userId.userName}
                  </div>
                </div>{" "}
                <div className="text-white">{comment.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
