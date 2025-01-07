"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [newUser, setNewUser] = React.useState<string>("");

  const [one, setOne] = React.useState<boolean>(false);
  const [two, setTwo] = React.useState<boolean>(false);
  const [three, setThree] = React.useState<boolean>(false);
  const [newUserComplated, setNewUserComplated] =
    React.useState<boolean>(false);
  const emailValue = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
  };
  const passwordValue = (e: { target: { value: string } }) => {
    setPassword(e.target.value);
  };
  const userNameValue = (e: { target: { value: string } }) => {
    setUserName(e.target.value);
  };

  const onButton = () => {
    if (email === "") {
      setOne(true);
    }
    if (email !== "") {
      setOne(false);
    }
    if (userName === "") {
      setTwo(true);
    }
    if (userName !== "") {
      setTwo(false);
    }
    if (password === "") {
      setThree(true);
    }
    if (password !== "") {
      setThree(false);
    }
    if (email !== "") {
      if (userName !== "") {
        if (password !== "") {
          postNewUser();
          setNewUserComplated(true);
        }
      }
    }
  };

  const postNewUser = async () => {
    const newBro = {
      userName,
      password,
      email,
    };
    const jsonData = await fetch(
      `https://instagram-server-2phx.onrender.com/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBro),
      }
    );
    const response = await jsonData.json();
    console.log(response.token);
    localStorage.setItem("token", response.token);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Submitted", {
      userName,
      email,
      password,
    });
  };

  return (
    <div className=" flex h-screen justify-center items-center bg-black">
      {" "}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="w-350px text-xl flex ">Iveelstagram</CardTitle>
          <CardDescription>
            Sign up to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="name"
                  onChange={emailValue}
                  placeholder="Your Email"
                />
                {one === true ? <div>Username is required</div> : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="name"
                  onChange={userNameValue}
                  placeholder="Name of your profile"
                />
                {two === true ? <div>Username is required</div> : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="name"
                  onChange={passwordValue}
                  placeholder="Your password"
                />
                {three === true ? <div>Password is required</div> : null}
              </div>
            </div>
          </form>
        </CardContent>{" "}
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={onButton}>Sign up</Button>
            </AlertDialogTrigger>
            {newUserComplated == true ? (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    You have successfully signed-up!!!
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Wellcome to Iveelstagram ! You can post about yourself and
                    follow your friends and see thier post! I hope you have a
                    good time in Iveelstagram.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => router.push("/posts")}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            ) : null}
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
