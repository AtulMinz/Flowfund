"use client";

import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <span className="flex justify-end m-3">
        <ModeToggle />
      </span>
      <div className="flex justify-center items-center flex-col gap-10 p-[200px]">
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
