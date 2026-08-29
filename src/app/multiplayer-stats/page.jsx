"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { getMatchStats } from "@/services/match";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import BackButton from "@/components/ui/BackButton";
import ImageWithLoader from "@/components/ui/ImageWithLoader";
import styles from "./page.module.css";

const MultiplayerStats = () => {
  const router = useRouter();
  const { data } = useAuth();
  const {
    isPending,
    data: stats,
    error,
  } = useQuery("matchStats", getMatchStats);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const winPercent =
    stats && stats.totalGames > 0
      ? Math.round((stats.totalWins / stats.totalGames) * 100)
      : 0;

  return (
    <>
      <BackButton onClick={handleBack} />
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.branding}>
              <span className={styles.brandText}>AR Shootout</span>
            </div>
            <h1 className={styles.title}>MULTIPLAYER STATS</h1>
            <div className={styles.youCard}>
              <div className={styles.youImage}>
                <ImageWithLoader
                  src={`/images/characters/kicker_${data.avatar_id}_body.jpg`}
                  alt="Your Character"
                  aspectRatio="3 / 4"
                  objectFit="contain"
                  eager
                />
              </div>
              <span className={styles.youLabel}>You</span>
            </div>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>
                {stats?.totalGames ?? "—"}
              </span>
              <span className={styles.summaryLabel}>Games</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>
                {stats?.totalWins ?? "—"}
              </span>
              <span className={styles.summaryLabel}>Wins</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>
                {stats?.totalLosses ?? "—"}
              </span>
              <span className={styles.summaryLabel}>Losses</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{winPercent}%</span>
              <span className={styles.summaryLabel}>Win Rate</span>
            </div>
          </div>

          <div className={styles.rankingHeader}>
            <span>Opponent</span>
            <span>Games</span>
            <span>Wins</span>
            <span>Losses</span>
            <span>Lost %</span>
          </div>

          <div className={styles.ranking}>
            {isPending && (
              <div className={styles.empty}>Loading stats...</div>
            )}
            {error && (
              <div className={styles.empty}>Could not load multiplayer stats</div>
            )}
            {stats?.opponents.length === 0 && !isPending && (
              <div className={styles.empty}>
                No multiplayer matches yet. Play a match to see your stats!
              </div>
            )}
            {stats?.opponents.map((opponent) => (
              <div className={styles.row} key={opponent.id}>
                <div className={styles.name}>
                  <div className={styles.nameImage}>
                    <ImageWithLoader
                      src={`/images/characters/kicker_${opponent.avatar_id}.png`}
                      alt={`${opponent.name} avatar`}
                      aspectRatio="1 / 1"
                    />
                  </div>
                  <span className={styles.nameText}>{opponent.name}</span>
                </div>
                <div className={styles.cell}>{opponent.games}</div>
                <div className={`${styles.cell} ${styles.win}`}>
                  {opponent.wins}
                </div>
                <div className={`${styles.cell} ${styles.loss}`}>
                  {opponent.losses}
                </div>
                <div className={`${styles.cell} ${styles.percent}`}>
                  {opponent.lossPercent}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiplayerStats;
