"use client";

import { loginFormSchema } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { Github, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [submiting, setSubmiting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGitHubSignIn = async () => {
    setSubmiting(true);
    const result: any = await signIn("github", { redirect: false });

    if (!result.ok) {
      setSubmiting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "GitHub sign-in failed!",
      });
    } else {
      setSubmiting(false);
      router.push("/");
    }
  };

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setSubmiting(true);
    const user: any = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (user.ok === true) {
      setSubmiting(false);

      toast({
        variant: "default",
        title: "Success",
        description: "Logged In!",
      });
      router.push("/");
    } else {
      setSubmiting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password!",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col items-center justify-start space-y-3 gap-1 mt-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-foreground tracking-wide text-3xl sm:text-4xl md:text-5xl md:mb-7">
          Login
        </h1>
        <Button
          variant={"outline"}
          className="bg-accent w-72 sm:w-96 flex justify-center items-center gap-1 text-sm sm:text-md font-bold"
          onClick={handleGitHubSignIn}
        >
          <Github />
          Continue with GitHub
        </Button>
        <div className="w-32 sm:w-44 flex gap-2 items-center justify-center">
          <Separator />
          or
          <Separator />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type={"email"}
                  placeholder="Email"
                  {...field}
                  className="w-72 sm:w-96"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={"password"}
                  placeholder="Password"
                  {...field}
                  className="w-72 sm:w-96"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-center">
          <Button
            variant={"link"}
            className="text-xs tracking-tight sm:text-lg"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Don&apos;t have an account?
          </Button>
          <Button
            type="submit"
            className={`w-36 ${
              submiting && "hover:bg-slate-800 bg-slate-800"
            }bg-default`}
          >
            {submiting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
