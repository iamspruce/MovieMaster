"use client";
import TicTacToe from "@/components/TicTacToe";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Fallback: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Redirect to homepage if online
      router.push("/");
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  const handleRefresh = () => {
    if (navigator.onLine) {
      router.push("/");
    } else {
      setIsOnline(false);
    }
  };

  return (
    <div className="flex mx-auto h-screen max-w-[500px] w-full flex-col items-center justify-center h-screen bg-foreground p-6 mt-12 text-white">
      <h1 className="text-3xl font-bold mb-6">
        {isOnline ? "You are online!" : "You are offline"}
      </h1>
      <p className="text-lg text-center mb-6">
        {isOnline
          ? "You are back online."
          : "Please check your internet connection and try again."}
      </p>
      <div className="">
        <TicTacToe />
      </div>
      {isOnline ? (
        <Link
          href={"/"}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Return to Homepage
        </Link>
      ) : (
        <button
          onClick={handleRefresh}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Refresh
        </button>
      )}
    </div>
  );
};

export default Fallback;
