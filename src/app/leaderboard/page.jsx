"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { getScores } from "@/services/score";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import ImageWithLoader from "@/components/ui/ImageWithLoader";
import styles from "./page.module.css";

const LeaderBoard = () => {
  const router = useRouter();
  const {
    isPending,
    data: users,
    error,
  } = useQuery("users", () => getScores());

  const { data } = useAuth();
  const leaderBoardRef = useRef(null);
  const [sharing, setSharing] = useState(false);
  const [playingAgain, setPlayingAgain] = useState(false);

  const generateImage = async () => {
    if (leaderBoardRef.current) {
      const canvas = await html2canvas(leaderBoardRef.current);
      const dataUrl = canvas.toDataURL();
      const blob = await fetch(dataUrl).then((res) => res.blob());
      return blob;
    } else {
      return null;
    }
  };

  const handleShare = async (e) => {
    if (sharing) return;
    setSharing(true);
    try {
      const blob = await generateImage();
      if (blob) {
        const file = new File([blob], "image.png", { type: blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "AR Shootout",
            text: "Check out my score in AR Shootout!",
          });
        } else {
          alert(
            "Your browser does not support sharing files. We are working on it"
          );
        }
      } else {
        alert("Error, Please try again");
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        alert("Error sharing the image");
      }
    } finally {
      setSharing(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handlePlayAgain = () => {
    if (playingAgain) return;
    setPlayingAgain(true);
    router.push("/game");
    setTimeout(() => setPlayingAgain(false), 2000);
  };

  return (
    <>
      <BackButton onClick={handleBack} />
      <div className={styles.page}>
        <div className={styles.shareCard} ref={leaderBoardRef}>
          <div className={styles.header}>
          <div className={styles.branding}>
            <span className={styles.brandText}>AR Shootout</span>
          </div>
            <h1 className={styles.title}>LEADERBOARD</h1>
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

          <div className={styles.rankingHeader}>
            <span>Position</span>
            <span>Name</span>
            <span>Score</span>
          </div>

          <div className={styles.ranking}>
            {isPending && (
              <div className={styles.empty}>Loading scores...</div>
            )}
            {error && (
              <div className={styles.empty}>Could not load the leaderboard</div>
            )}
            {users?.scores.map((user) => (
              <div
                className={`${styles.row} ${
                  user.code === data.code ? styles.rowYou : ""
                }`}
                key={user.id}
              >
                <div className={styles.position}>
                  <p>{user.position}</p>
                </div>
                <div className={styles.name}>
                  <div className={styles.nameImage}>
                    <ImageWithLoader
                      src={`/images/characters/kicker_${user.avatar_id}.png`}
                      alt={`${user.name} avatar`}
                      aspectRatio="1 / 1"
                    />
                  </div>
                  <div className={styles.nameTextWrap}>
                    <span className={styles.nameText}>{user.name}</span>
                    {user.comment && (
                      <span className={styles.commentText}>
                        &ldquo;{user.comment}&rdquo;
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.score}>{user.score}</div>
              </div>
            ))}
          </div>

          <p className={styles.credit}>
            Created by{" "}
            <a href="https://github.com/DanielAmado11">DanielAmado11</a> ·
            danielamado1107@gmail.com
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            loading={playingAgain}
            disabled={playingAgain}
            onClick={handlePlayAgain}
            className={styles.actionButton}
          >
            Play Again
          </Button>
          <Button
            variant="ghost"
            loading={sharing}
            disabled={sharing}
            onClick={handleShare}
            className={styles.actionButton}
          >
            Share your score with your friends!
          </Button>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
