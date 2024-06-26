"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const LoginPage = (props) => {
  const [state, setState] = useState({
    name: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    router.push("/term_conditions");
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
