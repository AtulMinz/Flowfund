"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <div className="min-h-screen flex justify-center items-center flex-col gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-300">
          Welcome to Flowfund
        </h1>
        <Button size={"lg"} onClick={() => router.push("/causes")}>
          View Causes &rarr;
        </Button>
      </div>
    </main>
  );
}
