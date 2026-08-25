"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { changeAvatar } from "@/services/user";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useState } from "react";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import ImageWithLoader from "@/components/ui/ImageWithLoader";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const PLAYERS = [
  { id: 1, label: "Aurora" },
  { id: 2, label: "Valeria" },
  { id: 3, label: "Camila" },
  { id: 4, label: "Diego" },
  { id: 5, label: "Mateo" },
  { id: 6, label: "Leo" },
];

const Selection = () => {
  const router = useRouter();
  const { status, refresh } = useAuth();
  const [selected, setSelected] = useState(1);

  const changeAvatar_ = useMutation(changeAvatar, {
    onSuccess: (res) => {
      refresh();
      router.push("/dashboard");
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data}`);
    },
  });

  const handleContinue = (e) => {
    e.preventDefault();
    if (status === "AUTHENTICATED") {
      changeAvatar_.mutate(selected);
    } else {
      router.push(`/login?avatar_id=${selected}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const selectedPlayer = PLAYERS.find((p) => p.id === selected);

  return (
    <>
      <BackButton onClick={handleBack} />
      <PageShell>
        <div className={styles.layout}>
          <h1 className={styles.title}>Select your avatar</h1>

          <div className={styles.preview}>
            <div className={styles.previewImage}>
              <ImageWithLoader
                src={`/images/characters/kicker_${selected}_body.jpg`}
                alt={selectedPlayer.label}
                aspectRatio="3 / 4"
                objectFit="contain"
                eager
              />
            </div>
            <div className={styles.previewInfo}>
              <span className={styles.previewLabel}>Selected</span>
              <span className={styles.previewName}>{selectedPlayer.label}</span>
            </div>
          </div>

          <div className={styles.grid}>
            {PLAYERS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Select ${p.label}`}
                aria-pressed={selected === p.id}
                className={`${styles.avatar} ${
                  selected === p.id ? styles.avatarSelected : ""
                }`}
                onClick={() => setSelected(p.id)}
              >
                <ImageWithLoader
                  src={`/images/characters/kicker_${p.id}.png`}
                  alt={p.label}
                  objectFit="contain"
                />
                <span className={styles.avatarName}>{p.label}</span>
              </button>
            ))}
          </div>

          <Button
            type="button"
            fullWidth
            loading={changeAvatar_.isLoading}
            disabled={changeAvatar_.isLoading}
            onClick={handleContinue}
            className={styles.continue}
          >
            Continue
          </Button>
        </div>
      </PageShell>
    </>
  );
};

export default Selection;
