"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
type PostType = {
  description: string;
  postImage: string;
  _id: string;
};

type UserType = {
  _id: string;
  userName: string;
  email: string;
  followers: [];
  following: [];
  post: PostType[];
  profileImage: string;
};

const fetchUsers = async (): Promise<UserType[]> => {
  const response = await fetch("https://instagram-server-2phx.onrender.com/user");
  return response.json();
};

const Page = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { userId: string } = jwtDecode(token);
        const user = users.find((u) => u._id === decoded.userId);
        setCurrentUser(user || null);
      } catch (error) {
        console.error("Invalid token", error);
        setCurrentUser(null);
      }
    }
  }, [users]);

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      <header className="p-4 flex items-center">
        <Avatar>
          <AvatarImage
            src={
              currentUser?.profileImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h1 className="text-lg font-bold">{currentUser?.userName}</h1>
          <div className="flex space-x-4 mt-2">
            <div>{currentUser?.post.length } posts</div>
            <div>{currentUser?.followers.length } followers</div>
            <div>{currentUser?.following.length} following</div>
          </div>
        </div>
      </header>
      <footer className={`w-full fixed bottom-0 flex justify-around p-2 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <button onClick={() => router.push("/")} className="hover:scale-125 transition-transform">
          <Home className="w-6 h-6" />
        </button>
        <button className="hover:scale-125 transition-transform">
          <Search className="w-6 h-6" />
        </button>
        <button className="hover:scale-125 transition-transform">
          <PlusSquare className="w-6 h-6" />
        </button>
        <button className="hover:scale-125 transition-transform">
          <Heart className="w-6 h-6" />
        </button>
        <button onClick={() => router.push("/userProfile")} className="hover:scale-125 transition-transform">
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default Page;
