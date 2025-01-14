"use client";
import { useRouter } from "next/navigation";
const Page = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  if (!token) {
    router.push("/sign-up");
  }
  if (token) {
    router.push("/posts");
  }
  return <div>page</div>;
};
export default Page;
