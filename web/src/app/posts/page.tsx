"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, Send, MessageSquare, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
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
  createdAt: string;
  updatedAt: string;
  _id: string;
  comment: string;
  userId: string;
}[];

const page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<postType>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token || "");
  const userId = decoded.userId;

  const getPost = async () => {
    if (!token) {
      router.push("/sign-up");
    }

    try {
      const response = await fetch(
        "https://instagram-server-2phx.onrender.com/post",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setPosts(jsonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onLike = async ({
    postId,
    likes,
  }: {
    postId: string;
    likes: string[];
  }) => {
    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    if (likes.includes(userId)) {
      console.log("hi");
    }

    console.log(postId);

    const likeReg = {
      postId,
      userId,
    };

    try {
      const jsonData = await fetch(
        "https://instagram-server-2phx.onrender.com/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(likeReg),
        }
      );

      if (!jsonData.ok) {
        throw new Error(`Server error: ${jsonData.statusText}`);
      }

      const response = await jsonData.json();
      console.log("Server Response:", response);

      if (response.success) {
        console.log("Post liked successfully!");
      } else {
        console.log(
          "Failed to like the post",
          response.message || response.error
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPost();
  }, []);

  console.log(posts);
  if (loading === true) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
          <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black">
      <div>
        {posts?.map((post) => {
          return (
            <div key={post._id} className="pt-3 bg-black">
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarImage src={post.user.profileImage} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-[14px] text-white">
                  {post.user.userName}
                </div>
              </div>
              <div>
                <Carousel className="max-w-[500px] max-h-[9000px]">
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
                </Carousel>
              </div>
              <div className="p-2">
                <div className="flex justify-between">
                  <div className="flex gap-3 p-1">
                    <button>
                      <Heart
                        color="white"
                        onClick={() =>
                          onLike({ postId: post._id }, { likes: post.likes })
                        }
                      />
                    </button>
                    <button>
                      <MessageSquare
                        color="white"
                        onClick={() =>
                          router.push(`posts/comments/${post._id}`)
                        }
                      />
                    </button>
                    <button>
                      <Send color="white" />
                    </button>
                  </div>
                  <div className="p-1">
                    <button>
                      {" "}
                      <Bookmark color="white" />
                    </button>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger className="font-bold text-white">
                    {post.likes.length}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Liked peoples</DialogTitle>
                      {post.likes.map((like, index) => {
                        console.log(like);
                        return (
                          <DialogDescription key={index}>
                            {like}
                          </DialogDescription>
                        );
                      })}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <div className="flex gap-2">
                  <div className="font-bold text-white">
                    {post.user.userName}
                  </div>{" "}
                  <div className="font-thin text-white">
                    {" "}
                    {post.description}
                  </div>
                </div>
                <div
                  className="text-white"
                  onClick={() => router.push(`posts/comments/${post._id}`)}
                >
                  view all comments
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default page;
