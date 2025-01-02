"use client";
import { use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const [comments, setComments] = useState<commentType>([]);
  const [newCommentValue, setNewCommentValue] = useState<string>("");
  const value = (e: { target: { value: string } }) => {
    setNewCommentValue(e.target.value);
  };
  const { postId } = use(params);

  const getPost = async () => {
    const jsonData = await fetch(
      `https://instagram-server-2phx.onrender.com/getComment/${postId}`
    );
    const response = await jsonData.json();
    setComments(response.comments);
    console.log(response.comments);
  };

  const newComment = async () => {
    const HOOK_HIDDEN_CODE = "Uj10321651";
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const decoded = jwtDecode(storedToken);
      console.log(decoded);
      console.log(postId);
      console.log(comments);
      const newBro = {
        comment: newCommentValue,
        userId: decoded.userId,
        postId,
      };

      const jsonData = await fetch(
        "https://instagram-server-2phx.onrender.com/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBro),
        }
      );
      const response = await jsonData.json();
      console.log("Server Response:", response);
    } catch (error) {
      console.log("Error during token verification or fetching data:", error);
    }
  };

  const createComment = () => {
    newComment();
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
                <div className="text-white ">{comment.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-white flex w-full fixed bottom-0 ">
        <Input onChange={value} placeholder="Add a comment" />
        {newCommentValue !== "" ? (
          <Button
            onClick={createComment}
            className="max-h-full bg-black text-blue-600"
          >
            post
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
