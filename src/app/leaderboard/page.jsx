"use client";
import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="content leaderboard">
      <div className="containerItems">
        <div className="item">
          <div className="positionRanking">
            <div>Position</div>
            <div>1</div>
          </div>
          <div className="scoreRanking">
            <div>SCORE</div>
            <div>230</div>
          </div>
        </div>
        <div className="item">
          <img src="/images/cup.png" alt="Cup Ranking"  className="cupImg"/>
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
            <div className="itemPosition firstPosition">
              <div className="positionRanking"><p>1</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-1.png" alt="First Position"/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>230</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>2</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-male-2.png" alt=""/>
                <p>Jhon Doe</p>
              </div>
              <div className="scoreRanking"><p>228</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>3</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-male-1.png" alt=""/>
                <p>Jhon Doe</p>
              </div>
              <div className="scoreRanking"><p>224</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>4</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-3.png" alt=""/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>213</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>5</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-3.png" alt=""/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>213</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>6</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-1.png" alt="First Position"/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>230</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>7</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-male-2.png" alt=""/>
                <p>Jhon Doe</p>
              </div>
              <div className="scoreRanking"><p>228</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>8</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-male-1.png" alt=""/>
                <p>Jhon Doe</p>
              </div>
              <div className="scoreRanking"><p>224</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>9</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-3.png" alt=""/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>213</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>10</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-3.png" alt=""/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>213</p></div>
            </div>
            <div className="itemPosition">
              <div className="positionRanking"><p>11</p></div>
              <div className="nameRanking">
                <img src="/images/characters/character-female-3.png" alt=""/>
                <p>Jean Doe</p>
              </div>
              <div className="scoreRanking"><p>213</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
