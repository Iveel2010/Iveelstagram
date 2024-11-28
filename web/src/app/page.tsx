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
  const [date, setDate] = React.useState<Date>();
  return (
    <div className=" flex h-screen justify-center items-center">
      {" "}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="w-350px text-xl flex ">Iveelstagram</CardTitle>
          <CardDescription>
            Sign up to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="name" placeholder="Your Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userName">Username</Label>
                <Input id="name" placeholder="Name of your profile" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="name" placeholder="Your password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Gender">Gender</Label>
                <Select>
                  <SelectTrigger id="Gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Popover>
                <div>
                  <Label htmlFor="Birthday">Birthday</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                </div>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </CardContent>{" "}
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
