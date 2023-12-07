"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { PenLine, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
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
        <div className="flex gap-1 items-center">
          {session ? (
            <>
              <MenubarMenu>
                <MenubarTrigger>Create Deck</MenubarTrigger>

                <MenubarContent>
                  <MenubarItem onClick={() => router.push("/create")}>
                    Deck <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => {
                      toast({
                        description: "This feature is still in process!",
                      });
                    }}
                  >
                    Upload File <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <Button>Logout</Button>
            </>
          ) : (
            <>
              <Button
                variant={"ghost"}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Button>

              <Button
                variant={"ghost"}
                onClick={() => {
                  router.push("/signup");
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
