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
import { CreatePost } from "./createPost";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const router = useRouter();
  const theme = localStorage.getItem("theme");
  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
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
  );
};
export default Footer;
