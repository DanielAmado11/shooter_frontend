"use client";
import { CharacterAnimationProvider } from "@/contexts/CharacterAnimation";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const path = router.pathname;
  useEffect(() => {
    if (path === "/") {
      router.push("/home");
    }
  });
  return <div className={styles.container}></div>;
}
