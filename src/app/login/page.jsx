"use client";
import { useState } from "react";
import { useMutation } from "react-query";
import { createAccount } from "@/services/user";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import BackButton from "@/components/ui/BackButton";
import ImageWithLoader from "@/components/ui/ImageWithLoader";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const LoginPage = () => {
  const [state, setState] = useState({ name: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const avatarId = searchParams.get("avatar_id");
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = useMutation(createAccount, {
    onSuccess: (res) => {
      router.push(`/term_conditions?user_code=${res.code}`);
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data.error}`);
    },
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!state.name.trim() || createUser.isLoading) return;
    const data = {
      ...state,
      avatar_id: avatarId,
    };
    createUser.mutate(data);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <BackButton onClick={handleBack} />
      <PageShell>
        <div className={styles.card}>
          <div className={styles.character}>
            <ImageWithLoader
              src={`/images/characters/kicker_${avatarId}_body.jpg`}
              alt="Full body Character"
              aspectRatio="3 / 4"
              objectFit="contain"
              eager
            />
          </div>
          <div className={styles.form}>
            <h1 className={styles.title}>Create your player</h1>
            <p className={styles.subtitle}>
              Enter your name to be added to the leaderboard!
            </p>
            <Input
              id="player-name"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={state.name}
              onChange={handleChange}
              autoComplete="off"
            />
            <Button
              type="button"
              fullWidth
              loading={createUser.isLoading}
              disabled={!state.name.trim()}
              onClick={handleCreateUser}
            >
              Continue
            </Button>
          </div>
        </div>
      </PageShell>
    </>
  );
};

export default LoginPage;
