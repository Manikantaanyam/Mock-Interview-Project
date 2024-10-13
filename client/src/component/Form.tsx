import { Button } from "@/components/ui/button";
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
import { setItem } from "@/session";
import axios from "axios";
import { log } from "console";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm({ type }: { type: string }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const path = type === "signup" ? "signup" : "login";
  const handleData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(
      `http://127.0.0.1:8787/api/user/${path}`,
      {
        name: username,
        email,
        password,
      }
    );
    console.log(response.data);
    const realData = JSON.stringify(response.data);

    setItem("token", realData);
    navigate("/home/dashboard");
  };

  return (
    <form onSubmit={handleData} className="w-[350px]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{type}</CardTitle>
          <CardDescription>
            {type === "Login" ? "Don't have an account " : "Create an account "}
            <Link to={type == "signup" ? "/login" : "/"} className="underline">
              {type == "signup" ? "Login" : "signup"}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {type === "signup" ? (
            <div className="grid gap-2">
              <Label htmlFor="name">username</Label>
              <Input
                onChange={(e) => setUserName(e.target.value)}
                id="name"
                type="text"
                placeholder="mani"
                required
              />
            </div>
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="mani@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{type}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
