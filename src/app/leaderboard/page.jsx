"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { getScores, saveScreenshot } from "@/services/score";
import { toPng } from "html-to-image";
import {
  FacebookShareButton,
  InstagramShareButton,
  PinterestShareButton,
} from "next-share";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

let social = "";

const LeaderBoard = () => {
  const router = useRouter();
  const {
    isPending,
    data: users,
    error,
  } = useQuery("users", () => getScores());

  const shareWithNavigator = () => {
    if (navigator.share) {
      const url = `${process.env.PUBLIC_URL}/${encodeURIComponent(data.name)}`;
      navigator
        .share({
          title: "AR Shootout",
          text: "Check out my score in AR Shootout",
          url: url,
          // files: [new File([blob], "arshootout.png", { type: "image/png" })],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert(
        "Your browser does not support sharing files. We are working on it"
      );
    }
  };

  const saveScreenShot = useMutation(saveScreenshot, {
    onSuccess: (result) => {
      if (social === "instagram") {
        shareWithNavigator();
      }
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data.error}`);
    },
  });
  const { data } = useAuth();
  const leaderBoardRef = useRef(null);

  const generateImage = async () => {
    if (leaderBoardRef.current) {
      const dataUrl = await toPng(leaderBoardRef.current);
      const blob = await fetch(dataUrl).then((res) => res.blob());
      return blob;
    } else {
      return null;
    }
  };

  const saveImage = (e) => {
    console.log(`${process.env.PUBLIC_URL}/${encodeURIComponent(data.name)}`);
    generateImage().then((blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append("image", blob);
        saveScreenShot.mutate(formData);
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
        className="content shareRanking"
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

          <div
            style={{
              marginTop: "50px",
            }}
          >
            <button className="btn" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        </div>
        <div className="contentImgCharacter">
          <img
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
              <div className="logohead">
                {/* <img src="/images/logo_horizontal.png" alt="AR Shootout" /> */}
              </div>
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
              <div id="ranking" className="ranking">
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
          <div className="shareIcons">
            <FacebookShareButton
              url={`${process.env.PUBLIC_URL}/${encodeURIComponent(data.name)}`}
              quote="Miami MoCAAD"
              hashtag={"#MoCAAD"}
              onClick={saveImage}
              blankTarget={false}
            >
              <img src="/images/icon-facebook.png" alt="Facebook" />
            </FacebookShareButton>
            <button
              className="iconInstagram"
              onClick={() => {
                social = "instagram";
                saveImage();
              }}
            >
              <img src="/images/icon-instagram.png" alt="Instagram" />
            </button>
            <button
              className="iconTiktok"
              onClick={() => {
                social = "instagram";
                saveImage();
              }}
            >
              <img src="/images/icon-tiktok.png" alt="Tik Tok" />
            </button>
            <button
              className="iconPinterest"
              onClick={() => {
                social = "instagram";
                saveImage();
              }}
            >
              <img src="/images/icon-pinterest.png" alt="Pinterest" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
