"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const Instructions = () => {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  const handleContinue = () => {
    if (navigating) return;
    setNavigating(true);
    router.push("/game");
    setTimeout(() => setNavigating(false), 2000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <BackButton onClick={handleBack} />
      <PageShell className={styles.shell}>
        <h1 className={styles.title}>Instructions</h1>
        <div className={styles.list}>
          <ol>
            <li>
              You will have 60 seconds to score as many goals as you can.
            </li>
            <li>
              Tap or click on the screen to shoot the ball towards the goal.
            </li>
            <li>
              The ball will move in the direction of the target when you tap or
              click on the screen.
            </li>
            <li>
              The longer you hold your finger on the screen, the more power
              your shot will have.
            </li>
            <li>
              Charge to FULL power and aim a corner (left or right) for the{" "}
              <strong>BALONAZO</strong> — a guaranteed goal!
            </li>
          </ol>
        </div>
        <Button
          type="button"
          fullWidth
          loading={navigating}
          disabled={navigating}
          onClick={handleContinue}
          className={styles.button}
        >
          Continue
        </Button>
      </PageShell>
    </>
  );
};

export default Instructions;
