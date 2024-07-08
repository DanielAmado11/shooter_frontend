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
      alert(`user created with code: ${res.code}`);
      router.push("/term_conditions");
      redirect("/term_conditions");
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

  return (
    <div className="content">
      <div className="item enterName">
        <div className="characterImg">
          <img
            src="/images/characters/full_character_female.png"
            alt="Full Character Female"
          />
        </div>
        <div className="contentName">
          <p className="text">
            Enter your name to be added to the leaderboard!
          </p>
          <form
            action="create user"
            onSubmit={handleCreateUser}
            className={styles.form}
          >
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </form>
          <button type="submit" onClick={handleCreateUser} className="btn">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
