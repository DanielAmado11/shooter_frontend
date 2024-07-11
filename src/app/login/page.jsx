"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useMutation } from "react-query";
import { createAccount } from "@/services/user";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const LoginPage = (props) => {
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
      redirect("");
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data.error}`);
    },
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
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
      <button className="back" id="toggle-button" onClick={handleBack}>
        <img src="/images/back.png" alt="back" />
      </button>
      <div className="content">
        <div className="item enterName">
          <div className="characterImg">
            <img
              src={`/images/characters/kicker_${avatarId}_body.jpg`}
              alt="Full body Character"
            />
          </div>
          <div className="contentName">
            <p className="text">
              Enter your name to be added to the leaderboard!
            </p>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
            <button className="btn" onClick={handleCreateUser}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
