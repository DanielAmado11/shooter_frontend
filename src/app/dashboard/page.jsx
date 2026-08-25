"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import ImageWithLoader from "@/components/ui/ImageWithLoader";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const Dashboard = () => {
  const router = useRouter();
  const { data } = useAuth();
  const [navigating, setNavigating] = useState(false);

  const go = (path) => {
    if (navigating) return;
    setNavigating(true);
    router.push(path);
    setTimeout(() => setNavigating(false), 2000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <BackButton onClick={handleBack} />
      <PageShell className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.avatarThumb}>
            <ImageWithLoader
              src={`/images/characters/kicker_${data.avatar_id || 1}.png`}
              alt="Your avatar"
              aspectRatio="1 / 1"
            />
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.name}>{data.name}</h1>
            <p className={styles.userID}>User ID: {data.code}</p>
          </div>
        </header>

        <main className={styles.grid}>
          <section className={`${styles.card} ${styles.cardPlay}`}>
            <div className={styles.cardImage}>
              <ImageWithLoader
                src="/images/gamePlay.png"
                alt="Play"
                aspectRatio="16 / 9"
              />
            </div>
            <Button
              fullWidth
              loading={navigating}
              disabled={navigating}
              onClick={() => go("/instructions")}
            >
              Play
            </Button>
          </section>

          <section className={styles.card}>
            <div className={styles.cardImage}>
              <ImageWithLoader
                src="/images/edit_avatar.png"
                alt="Edit"
                aspectRatio="16 / 9"
              />
            </div>
            <Button
              fullWidth
              variant="ghost"
              loading={navigating}
              disabled={navigating}
              onClick={() => go("/selection")}
            >
              Edit
            </Button>
          </section>

          <section className={styles.card}>
            <div className={styles.cardImage}>
              <ImageWithLoader
                src="/images/cup.png"
                alt="Leaderboard"
                aspectRatio="16 / 9"
                objectFit="contain"
              />
            </div>
            <Button
              fullWidth
              variant="ghost"
              loading={navigating}
              disabled={navigating}
              onClick={() => go("/leaderboard")}
            >
              Leaderboard
            </Button>
          </section>
        </main>
      </PageShell>
    </>
  );
};

export default Dashboard;
