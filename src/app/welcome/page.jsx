"use client";
import { getAccount } from "@/services/user";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";

const Welcome = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { mutate: logUser } = useMutation(getAccount, {
    onSuccess: (res) => {
      alert(`Welcome back ${res.name}`);
      router.push("/term_conditions");
      redirect("/term_conditions");
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data.error}`);
    },
  });

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const HandleSubmit = () => {
    if (code === "") {
      router.push("/selection");
      redirect("/selection");
    } else {
      logUser(code);
    }
  };

  return (
    <div className="content">
      <div className="item contentWelcome">
        <p>
          Welcome to Miami MoCAAD Augmented Reality (AR) Soccer Shootout Game!
        </p>
        <p>
          You can play this game through your phone or anytime through our
          website at:
        </p>
        <a href="https://murals.miamimocaad.org/">
          <p>https://murals.miamimocaad.org/</p>
        </a>
        <div className="codeSession">
          <p>Use your user ID if you already have one</p>
          <input
            type="text"
            placeholder="Enter your code"
            name="code"
            value={code}
            onChange={handleChange}
          />
        </div>
        <button className="btn" onClick={HandleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Welcome;
