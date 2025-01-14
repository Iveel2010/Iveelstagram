"use client";
  
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
  Sun,
  Moon,
} from "lucide-react";
import Modal from "@/components/ui/modal";

const fetchUsers = async () => {
  const response = await fetch("https://instagram-server-2phx.onrender.com/user");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

const Page = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const user = users.find((u) => u._id === decoded.userId);
        setCurrentUser(user || null);
      } catch (error) {
        console.error("Invalid token", error);
        setCurrentUser(null);
      }
    }
  }, [users]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://instagram-server-2phx.onrender.com/notifications");
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center">
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
            <h1 className="text-lg font-bold">{currentUser?.userName || "Guest"}</h1>
            {currentUser && (
              <div className="flex space-x-4 mt-2">
                <div>{currentUser?.post.length} posts</div>
                <div>{currentUser?.followers.length} followers</div>
                <div>{currentUser?.following.length} following</div>
              </div>
            )}
          </div>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200">
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </header>

      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="mt-2 p-2 w-full bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>

      <main className="p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-green-500 text-white rounded-md"
          >
            Create Post
          </button>
        )}

        {/* Example Post Feed */}
        <div className="mt-4">
          {currentUser?.post.map((post) => (
            <div key={post._id} className="border p-4 rounded-md mb-4">
              <img src={post.postImage} alt="Post" className="w-full rounded-md" />
              <p className="mt-2">{post.description}</p>
            </div>
          )) || <p>No posts to display</p>}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold">Create a New Post</h2>
        <form className="mt-4">
          <input
            type="text"
            placeholder="Description"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="file"
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </Modal>

      <footer
        className={`w-full fixed bottom-0 flex justify-around p-2 ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <button
          onClick={() => router.push("/")}
          className="hover:scale-125 transition-transform"
        >
          <Home className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/search")}
          className="hover:scale-125 transition-transform"
        >
          <Search className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:scale-125 transition-transform"
        >
          <PlusSquare className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/notifications")}
          className="hover:scale-125 transition-transform"
        >
          <Heart className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/userProFile")}
          className="hover:scale-125 transition-transform"
        >
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default Page;
