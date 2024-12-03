"use client";
import * as React from "react";

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

const page = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [one, setOne] = React.useState<boolean>(false);
  const [three, setThree] = React.useState<boolean>(false);

  const emailValue = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
  };
  const passwordValue = (e: { target: { value: string } }) => {
    setPassword(e.target.value);
  };

  const onButton = () => {
    console.log(email);
    if (email === "") {
      setOne(true);
    }
    if (email !== "") {
      setOne(false);
    }

    if (password === "") {
      setThree(true);
    }
    if (password !== "") {
      setThree(false);
    }
    console.log(one);
  };

  return (
    <div className=" flex h-screen justify-center items-center bg-black">
      {" "}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="w-350px text-xl flex ">Iveelstagram</CardTitle>
          <CardDescription>
            Log in to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="name"
                  onChange={emailValue}
                  placeholder="Your Email"
                />
                {one === true ? <div>error</div> : null}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="name"
                  onChange={passwordValue}
                  placeholder="Your password"
                />
                {three === true ? <div>error</div> : null}
              </div>
            </div>
          </form>
        </CardContent>{" "}
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={onButton}>Log in</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
