"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { getScores, saveScreenshot } from "@/services/score";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import {
  FacebookShareButton,
  InstagramShareButton,
  PinterestShareButton,
} from "next-share";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useQuery } from "react-query";

const LeaderBoard = () => {
  const router = useRouter();
  const {
    isPending,
    data: users,
    error,
  } = useQuery("users", () => getScores());

  const { data } = useAuth();
  const leaderBoardRef = useRef(null);

  // const generateImage = async () => {
  //   if (leaderBoardRef.current) {
  //     const dataUrl = await toPng(leaderBoardRef.current);
  //     const blob = await fetch(dataUrl).then((res) => res.blob());
  //     return blob;
  //   } else {
  //     return null;
  //   }
  // };

  const generateImage = async () => {
    if (leaderBoardRef.current) {
      const canvas = await html2canvas(leaderBoardRef.current);
      const dataUrl = canvas.toDataURL();
      const blob = await fetch(dataUrl).then((res) => res.blob());
      return blob;
    } else {
      return null;
    }
  };

  const handleShare = (e) => {
    generateImage().then((blob) => {
      if (blob) {
        const file = new File([blob], "image.png", { type: blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              files: [file],
              title: "AR Shootout",
              text: "Check out my score in AR Shootout!",
            })
            .then(() => console.log("Thanks for sharing!"))
            .catch((error) => alert("Error sharing the image:", error));
        } else {
          alert(
            "Your browser does not support sharing files. We are working on it"
          );
        }
      } else {
        alert("Error, Please try again");
      }
    });
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handlePlayAgain = () => {
    router.push("/game");
  };

  return (
    <div>
      <button className="back" id="toggle-button" onClick={handleBack}>
        <img src="/images/back.png" alt="" />
      </button>
      <div
        className="content shareRanking bbb"
        style={{ background: "#45457c" }}
        ref={leaderBoardRef}
      >
        <div className="containerItems">
          <div className="item">
            <img
              src="/images/logo_miami_moCAAD.png"
              alt="Miami CAAD"
              className="maimiLogo"
            />
          </div>
        </div>
        <div className="contentImgCharacter">
          <img
            style={{ width: "93%" }}
            src={`/images/characters/kicker_${data.avatar_id}_body.jpg`}
            alt="Your Character"
          />
          <div className="text">
            {/* <p>Share your score with your friends!</p> */}
          </div>
        </div>
        <div className="containerShare">
          <div className="containerRanking">
            <div className="headLeaderboard">
              <div className="logohead"></div>
              <div className="tituloRanking">LEADERBOARD</div>
            </div>
            <div className="mainRanking">
              <div className="mainHeaderRanking">
                <div className="headerRanking">
                  <p>Position</p>
                  <p>Name</p>
                  <p>Score</p>
                </div>
                <div className="headerRanking">
                  <p>Position</p>
                  <p>Name</p>
                  <p>Score</p>
                </div>
              </div>
              <div
                id="ranking"
                className="ranking"
                style={{ "overflow-x": "scroll" }}
              >
                {users?.scores.map((user, i) => (
                  <div
                    className={`itemPosition ${
                      user.code === data.code && "firstPosition"
                    }`}
                    key={user.id}
                  >
                    <div className="positionRanking">
                      <p>{user.position}</p>
                    </div>
                    <div className="nameRanking">
                      <img
                        src={`/images/characters/kicker_${user.avatar_id}.png`}
                        alt="First Position"
                      />
                      <p>{user.name}</p>
                    </div>
                    <div className="scoreRanking">
                      <p>{user.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button className="button-box" onClick={handlePlayAgain}>
          <p>Play Again</p>
        </button>
        <button className="button-box" onClick={handleShare}>
          <img src="/images/share_icon.png" alt="share" />
          <p>Share your score with your friends!</p>
        </button>
      </div>
    </div>
  );
};

export default LeaderBoard;
