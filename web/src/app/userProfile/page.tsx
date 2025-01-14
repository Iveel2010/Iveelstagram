"use client"; // Next.js 13-ийн хувьд шаардлагатай

import { useState, useEffect } from "react";
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
  Search,
  PlusSquare,
  User,
  Sun,
  Moon,
  Cog,
  HomeIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { CreatePost } from "@/components/createPost";
import Footer from "@/components/Footer";
const images = [
  {
    src: "https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Nature Image",
  },
  {
    src: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Architecture Image",
  },
  {
    src: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Travel Image",
  },
  {
    src: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Food Image",
  },
  {
    src: "https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Wellness Image",
  },
  {
    src: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sports Image",
  },
  {
    src: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Wellness Image",
  },
  {
    src: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sports Image",
  },
  {
    src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Wellness Image",
  },
  {
    src: "https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sports Image",
  },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const theme = localStorage.getItem("theme");
  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true);
    }
  }, []);
  const router = useRouter();
  return (
    <div
      className={
        isDarkMode === true
          ? "min-h-screen bg-black"
          : "min-h-screen bg-gray-50"
      }
    >
      <header
        className={
          isDarkMode === true
            ? "bg-black shadow-md fixed w-full top-0 z-50"
            : "bg-white shadow-md fixed w-full top-0 z-50"
        }
      >
        <div className="container mx-auto px-5 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">User Gallery</h1>
        </div>
      </header>
      <div className="container mx-auto px-5 py-10 pt-16">
        <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="mb-4 overflow-hidden shadow-md break-inside-avoid"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
