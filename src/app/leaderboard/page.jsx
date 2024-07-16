"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { getScores } from "@/services/score";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

const LeaderBoard = () => {
  const router = useRouter();
  const {
    isPending,
    data: users,
    error,
  } = useQuery("users", () => getScores());
  const { data } = useAuth();

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handlePlayAgain = () => {
    router.push("/game");
  };

  return (
    <>
      <button className="back" id="toggle-button" onClick={handleBack}>
        <img src="/images/back.png" alt="" />
      </button>
      <div className="content shareRanking">
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
            <p>Share your score with your friends!</p>
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
          {/* <div className="shareIcons">
            <button className="iconFacebook">
              <img src="/images/icon-facebook.png" alt="Facebook" />
            </button>
            <button className="iconInstagram">
              <img src="/images/icon-instagram.png" alt="Instagram" />
            </button>
            <button className="iconTiktok">
              <img src="/images/icon-tiktok.png" alt="Tik Tok" />
            </button>
            <button className="iconPinterest">
              <img src="/images/icon-pinterest.png" alt="Pinterest" />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
