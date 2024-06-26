"use client";
import { redirect, useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();

  const redirectToSelection = () => {
    router.push("/selection");
  };
  return (
    <div className="content">
      <div className="item contentWelcome">
        <p>Welcome to Miami MoCAAD Augmented Reality Penalty Shootout Game!</p>
        <p>
          You can play this game through your phone or anytime through our
          website at:
        </p>
        <a href="https://murals.miamimocaad.org/">
          <p>https://murals.miamimocaad.org/</p>
        </a>
        <button className="btn" onClick={redirectToSelection}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Welcome;
