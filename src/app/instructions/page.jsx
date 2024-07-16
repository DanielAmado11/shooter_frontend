"use client";
import { useRouter } from "next/navigation";

const Instructions = () => {
  const router = useRouter();
  const handleContinue = () => {
    router.push("/game");
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="back" id="toggle-button" onClick={handleBack}>
          <img src="/images/back.png" alt="" />
        </button>
        <h2
          className="back"
          style={{
            width: "min-content",
            marginLeft: "30px",
            paddingLeft: "30px",
            color: "white",
          }}
        >
          Instructions
        </h2>
      </div>
      <div className="content terms_conditions">
        <div className="text" id="contentTerms">
          <p>1. You will have 45 seconds to score as many goals as you can.</p>
          <p>
            2. Tap or click on the screen to shoot the ball towards the goal.
          </p>
          <p>
            3. The ball will move in the direction of the target when you tap or
            click on the screen.
          </p>
          <p>
            4. The longer you hold your finger on the screen, the more power
            your shot will have.
          </p>
        </div>
        <div className="contentBtn">
          <button id="btnContinue" className="btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Instructions;
