"use client";
import LoadingScreen from "@/shared/loadingscreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/todo");
    }
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/auth/signup");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);
  return <main>{loading && <LoadingScreen />}</main>;
}
