"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CreatePost } from "@/components/createPost";
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
import {
  Heart,
  Send,
  MessageSquare,
  Bookmark,
  Home,
  Search,
  PlusSquare,
  User,
  Sun,
  Moon,
  Cog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

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
};

type commentType = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  comment: string;
  userId: string;
}[];

const Page = () => {
  const router = useRouter();
  const [ifUserLikedBro, setIfUserLikedBro] = useState<boolean>(false);
  const [posts, setPosts] = useState<postType>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const decoded: { userId: string } = jwtDecode(token || "");
  const userId = decoded.userId;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode === true) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isDarkMode]);
  useEffect(() => {
    if (isLightMode === true) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isLightMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const getPost = async () => {
    if (!token) {
      router.push("/sign-up");
    }
    if (token) {
      router.push("/posts");
    }
    try {
      const response = await fetch(
        "https://instagram-server-2phx.onrender.com/post",
        {
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
  const LightOnclick = () => {
    setIsDarkMode(false);
    setIsLightMode(true);
  };
  const DarkOnclick = () => {
    setIsDarkMode(true);
    setIsLightMode(false);
  };
  const onLike = async ({
    postId,
    likes,
  }: {
    postId: string;
    likes: likeType[];
  }) => {
    const ifUserLiked = likes.includes(userId);
    setIfUserLikedBro(ifUserLiked);

    const likeReg = {
      postId,
      userId,
    };

    if (ifUserLiked !== true) {
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
        const response = await jsonData.json();
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      try {
        const jsonData = await fetch(
          "https://instagram-server-2phx.onrender.com/unLike",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(likeReg),
          }
        );
        const response = await jsonData.json();
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getPost();
  }, []);

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
    <div
      className={
        isDarkMode
          ? "bg-black min-h-screen text-white"
          : "bg-gray-50 min-h-screen text-black"
      }
    >
      <header
        className={
          isDarkMode
            ? "flex justify-between items-center px-4 py-2 border-b bg-black shadow-md sticky top-0 z-50"
            : "flex justify-between items-center px-4 py-2 border-b bg-white shadow-md sticky top-0 z-50"
        }
      >
        <h1 className="text-xl font-bold">Iveelstagram</h1>
        <div className="flex items-center space-x-4">
          <button className="hover:scale-125 transition-transform duration-300">
            <Home className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Search className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <PlusSquare className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <User className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => LightOnclick()}>
                <Sun className="mr-2 h-4 w-4" />
                Гэрэлтэй
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => DarkOnclick()}>
                <Moon className="mr-2 h-4 w-4" />
                Харанхүй
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {posts?.map((post) => (
          <div
            key={post._id}
            className={`border-b border-gray-700 mb-6 animate-fade-in ${
              isDarkMode ? "bg-black" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3 p-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={post.user.profileImage}
                  alt={post.user.userName}
                />
                <AvatarFallback>{post.user.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">{post.user.userName}</div>
            </div>

            <div className="max-w-[500px] mx-auto">
              <Carousel className="overflow-hidden">
                <CarouselContent>
                  {post.postImage?.map((postImage, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={postImage}
                        alt={`Post Image ${index + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hover:text-gray-300" />
                <CarouselNext className="hover:text-gray-300" />
              </Carousel>
            </div>

            <div className="p-3">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      onLike({ postId: post._id, likes: post.likes })
                    }
                    className="hover:scale-125 transition-transform duration-300"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        ifUserLikedBro ? "text-red-500" : "text--500"
                      } ${isDarkMode ? "dark:text-white" : "text-black"}`}
                    />
                  </button>

                  <button
                    onClick={() => router.push(`posts/comments/${post._id}`)}
                    className="hover:scale-125 transition-transform duration-300"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </button>
                  <button className="hover:scale-125 transition-transform duration-300">
                    <Send
                      onClick={() => router.push(`/posts/comments/${post._id}`)}
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                <div>
                  <button className="hover:scale-125 transition-transform duration-300">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <Dialog>
                <DialogTrigger className="text-sm font-semibold hover:underline">
                  {post.likes.length} {post.likes.length > 1 ? "likes" : "like"}
                </DialogTrigger>
                <DialogContent className="bg-gray-50">
                  <DialogHeader>
                    <DialogTitle>People who liked</DialogTitle>
                    {post.likes.map((like, index) => (
                      <DialogDescription key={index} className="text-gray-700">
                        {like.userId}
                      </DialogDescription>
                    ))}
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <button
              onClick={() => router.push(`/posts/comments/${post._id}`)}
              className={`w-full flex items-center justify-start px-3 font-bold`}
            >
              View all {post.comments.length}{" "}
              {post.comments.length > 1 ? "comments" : "comment"}
            </button>
            <input
              className={`pb-3 px-3  ${isDarkMode ? "bg-black" : "bg-white"}`}
              type="text"
              placeholder="Add a comment..."
            />
          </div>
        ))}
      </div>
      <footer>
        <div
          className={`w-full flex items-center p-2 bottom-0 fixed justify-around ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          <button className="hover:scale-125 transition-transform duration-300">
            <Home
              className="w-6 h-6 cursor-pointer"
              color={isDarkMode ? "white" : "black"}
              onClick={() => router.push("/posts")}
            />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Search
              className="w-6 h-6 cursor-pointer"
              color={isDarkMode ? "white" : "black"}
            />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Dialog>
              <DialogTrigger asChild>
                <PlusSquare
                  className="w-6 h-6 cursor-pointer"
                  color={isDarkMode ? "white" : "black"}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] h-auto transition-all duration-[2000ms] hover:max-w-[425px] hover:h-auto">
                <DialogHeader>
                  <DialogTitle>Create post</DialogTitle>
                  <DialogDescription>
                    Make new posts to your profile here. Click post when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <CreatePost />
              </DialogContent>
            </Dialog>
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Heart
              className="w-6 h-6 cursor-pointer"
              color={isDarkMode ? "white" : "black"}
            />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <User
              onClick={() => router.push("/userProFile")}
              className="w-6 h-6 cursor-pointer"
              color={isDarkMode ? "white" : "black"}
            />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
