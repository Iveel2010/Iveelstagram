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
  profileImage: string;
}[];
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
    <div>
      {" "}
      {users?.map((user) => {
        return (
          <div key={user._id}>
            {" "}
            <div>{user.userName}</div>
          </div>
        );
      })}{" "}
    </div>
  );
};
export default Page;
