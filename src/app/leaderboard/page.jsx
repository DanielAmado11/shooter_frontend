"use client";
import { getScores } from "@/services/score";
import { useQuery } from "react-query";

const LeaderBoard = () => {

  const { isPending, data, error } = useQuery("users", getScores);

  return (
    <div className="content leaderboard">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="containerItems">
        <div className="item">
          <div className="positionRanking">
            <div>Position</div>
            <div>{data?.selfScore.position}</div>
          </div>
          <div className="scoreRanking">
            <div>SCORE</div>
            <div>{data?.selfScore.score}</div>
          </div>
        </div>
        <div className="item">
          <img src="/images/cup.png" alt="Cup Ranking" className="cupImg" />
        </div>
      </div>
      <div className="containerRanking">
        <div className="tituloRanking">LEADERBOARD</div>
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
          <div className="ranking">
            {data &&
              data.scores.map((register, i) => (
                <div
                  className={`itemPosition ${i === 0 && "firstPosition"}`}
                  key={register.id}
                >
                  <div className="positionRanking">
                    <p>{i + 1}</p>
                  </div>
                  <div className="nameRanking">
                    <img
                      src={`/images/characters/character-${register.avatar_id}.png`}
                      alt="First Position"
                    />
                    <p>{register.name}</p>
                  </div>
                  <div className="scoreRanking">
                    <p>{register.score}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
