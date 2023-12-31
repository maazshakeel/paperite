"use client";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Menubar className="p-6">
      <div className="w-full flex justify-between items-center">
        <Link href="/" role="link" className="flex gap-1 items-center">
          <PenLine size={20} />
          <MenubarMenu>Paperite</MenubarMenu>
        </Link>
        <div className="flex gap-0 items-center">
          {session ? (
            <>
              <Button variant={"ghost"}>Create Blog</Button>

              <Button
                onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
                variant={"ghost"}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={"ghost"}
                onClick={() => {
                  router.push("/api/auth/signin?callbackUrl=/");
                }}
              >
                Login
              </Button>

              <Button
                variant={"ghost"}
                onClick={() => {
                  router.push("/auth/register");
                }}
              >
                Create Account
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </Menubar>
  );
}
