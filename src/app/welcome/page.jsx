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
      router.push(`/term_conditions?user_code=${res.code}`);
      redirect(`/term_conditions?user_code=${res.code}`);
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
          <p>Use your player ID if you have played before:</p>
          <input
            type="text"
            placeholder="Enter your ID"
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
