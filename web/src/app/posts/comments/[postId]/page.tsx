"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

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
  const { postId } = useParams();

  const getPost = async () => {
    const jsonData = await fetch(
      `https://instagram-server-2phx.onrender.com/getComment/${postId}`
    );
    const response = await jsonData.json();
    setComments(response.comments);
    console.log(response.comments);
  };

  const newComment = async () => {
    const token = localStorage.getItem("token");

    try {
      const decoded = jwtDecode(token);
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
      setNewCommentValue("");
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="bg-gray-900 h-screen w-full flex flex-col items-center">
      <div className="pt-10 w-full max-w-md">
        {comments.map((comment, index) => {
          return (
            <div key={index} className="p-4 border-b border-gray-800">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={comment.userId.profileImage}
                    alt={comment.userId.userName}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">
                    {comment.userId.userName}
                  </div>
                  <div className="text-sm text-gray-400">{comment.comment}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full max-w-md fixed bottom-0 flex items-center gap-2 p-4 bg-gray-800">
        <Input
          onChange={value}
          value={newCommentValue}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-700 text-white placeholder-gray-400"
        />
        <Button
          onClick={newComment}
          disabled={!newCommentValue}
          className="bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-500"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default Page;
