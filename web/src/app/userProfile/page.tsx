"use client";
import { useState, useEffect } from "react";
type postType = { description: string; postImage: string; _id: string };
type userType = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  userName: string;
  password: string;
  email: string;
  followers: [];
  following: [];
  post: postType[];
  profileImage: string;
}[];
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Page = () => {
  const [users, setUsers] = useState<userType>([]);
  console.log(users);
  const getUser = async () => {
    console.log("working");
    const jsonData = await fetch(
      "https://instagram-server-2phx.onrender.com/user"
    );
    const response = await jsonData.json();
    setUsers(response);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    // <div>
    //   {" "}
    //   {users?.map((user) => {
    //     return (
    //       <div key={user._id}>
    //         {" "}
    //         <div>{user.userName}</div>
    //       </div>
    //     );
    //   })}{" "}
    // </div>
    <div>
      <div>
        <Avatar>
          <AvatarImage
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/640px-KFC_logo-image.svg.png"
            alt="@kfc"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
export default Page;
