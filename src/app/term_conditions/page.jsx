"use client";
import { useAuth } from "@/components/providers/auth-provider";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const TermConditions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userCode = searchParams.get("user_code");
  const { signOut } = useAuth();
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);

  const handleNoAcepted = async () => {
    if (declining) return;
    setDeclining(true);
    await signOut();
    router.push("/welcome");
    setDeclining(false);
  };

  const handleAccept = () => {
    if (accepting) return;
    setAccepting(true);
    Cookies.set("user_code", userCode);
    router.push("/dashboard");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <BackButton onClick={handleBack} />
      <PageShell className={styles.shell}>
        <h1 className={styles.title}>Terms &amp; Conditions</h1>
        <div className={styles.text} id="contentTerms">
          <p>
            By clicking &quot;Consent&quot;, you consent to have your name
            displayed on the game&apos;s leaderboard. This allows other players
            to see your achievements and rank within the game. Your
            participation enhances the competitive spirit and community
            engagement, showcasing your skills and dedication to the game. If
            you have any concerns about privacy, please contact{" "}
            <a href="https://github.com/DanielAmado11">DanielAmado11</a> at
            danielamado1107@gmail.com for more details on how your information
            will be used.
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            id="btnNoAcepted"
            variant="ghost"
            loading={declining}
            disabled={declining}
            onClick={handleNoAcepted}
          >
            Do not consent
          </Button>
          <Button
            id="btnAcepted"
            loading={accepting}
            disabled={accepting}
            onClick={handleAccept}
          >
            Consent
          </Button>
        </div>
      </PageShell>
    </>
  );
};

export default TermConditions;
