"use client";
import { getAccount } from "@/services/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const Welcome = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { mutate: logUser, isLoading } = useMutation(getAccount, {
    onSuccess: (res) => {
      router.push(`/term_conditions?user_code=${res.code}`);
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data.error}`);
    },
  });

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const HandleSubmit = () => {
    if (isLoading) return;
    if (code.trim() === "") {
      router.push("/selection");
    } else {
      logUser(code.trim());
    }
  };

  return (
    <PageShell>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to AR Shootout!</h1>
        <p className={styles.text}>
          Tap, aim and score as many goals as you can in this Augmented Reality
          soccer game. Play it on your phone or right here in your browser.
        </p>
        <p className={styles.credit}>
          Created by{" "}
          <a href="https://github.com/DanielAmado11">DanielAmado11</a> ·
          danielamado1107@gmail.com
        </p>
        <div className={styles.codeSession}>
          <Input
            id="player-code"
            type="text"
            placeholder="Enter your ID"
            name="code"
            value={code}
            onChange={handleChange}
            label="Enter your player ID if you have played before:"
            autoComplete="off"
            autoCapitalize="characters"
          />
        </div>
        <Button
          type="button"
          loading={isLoading}
          disabled={isLoading}
          onClick={HandleSubmit}
          className={styles.button}
        >
          Continue
        </Button>
      </div>
    </PageShell>
  );
};

export default Welcome;
