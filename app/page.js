"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/signin");
    }
  }, [sessionStatus, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div
          className="w-12 h-12 rounded-full animate-spin
            border-y-8 border-solid border-red-700 border-t-transparent"
        ></div>
      </div>
    </div>
  );
}