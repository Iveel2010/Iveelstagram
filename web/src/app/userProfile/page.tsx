"use client"; // Next.js 13-ийн хувьд шаардлагатай

import { useState ,useEffect } from "react";
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
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { CreatePost } from "@/components/createPost";
const images = [
  {  src: "https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Nature Image" },
  {  src: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Architecture Image" },
  {  src: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Travel Image" },
  {  src: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Food Image" },
  {  src: "https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Wellness Image" },
  {  src: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Sports Image" },
  {  src: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Wellness Image" },
  {  src: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Sports Image" },
  {  src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Wellness Image" },
  {  src: "https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg?auto=compress&cs=tinysrgb&w=600", alt: "Sports Image" },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const theme = localStorage.getItem("theme");
    useEffect(() => {
      if (theme === "dark") {
        setIsDarkMode(true)
      }
    }, []);
const router = useRouter()
  return (
    <div className={isDarkMode === true ?"min-h-screen bg-black":"min-h-screen bg-gray-50"}>
      <header className={isDarkMode === true ?"bg-black shadow-md sticky top-0 z-50":"bg-white shadow-md sticky top-0 z-50"} >
        <div className="container mx-auto px-5 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">User Gallery</h1>
        </div>
      </header>
      <main className="container mx-auto px-5 py-10">
        <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
          {images.map((image , index) => (
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
      </main>
      <footer>
        <div
          className={`w-full flex items-center p-2 bottom-0 fixed  justify-around ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          <button className="hover:scale-125 transition-transform duration-300">
          <HomeIcon className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Search className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Dialog>
      <DialogTrigger asChild>
      <PlusSquare className="w-6 h-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-auto transition-all duration-[2000ms] hover:max-w-[425px] hover:h-auto">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
          <DialogDescription>
            Make new posts to your profile here. Click post when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreatePost/>
      </DialogContent>
    </Dialog>
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <Heart className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="hover:scale-125 transition-transform duration-300">
            <User
              onClick={() => router.push("/userProFile")}
              className="w-6 h-6 cursor-pointer"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
