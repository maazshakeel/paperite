"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div>
      <h1>{session && session?.user?.email}</h1>
      <h1>{!session && "Login"}</h1>
    </div>
  );
}
