import { useCharacterAnimation } from "@/contexts/CharacterAnimation";
import ForceSelector from "./forceSelector/ForceSelector";
import styles from "./Interface.module.css";

export const KICK = 1;

const Interface = (props) => {
  const {
    setBallPosition,
    restartBall,
    setDirection,
    direction,
    setForce,
    setKeeperAction,
    setShootType,
    arrowState,
    forcePercentage,
  } = props;
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimation();
  const handleKick = () => {
    setAnimationIndex(KICK);
  };

  const restartShoot = () => {
    setAnimationIndex(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <ForceSelector
          setForce={setForce}
          onKick={handleKick}
          arrowState={arrowState}
          force={forcePercentage}
        />
      </div>
      <div>
        {/* <h3>shoot type</h3>
        <select
          onChange={(e) => {
            setShootType(e.target.value);
          }}
        >
          <option value="penalty">penalty</option>
          <option value="freekick_center">freekick center</option>
          <option value="freekick_left">freekick left</option>
          <option value="freekick_right">freekick right</option>
        </select>
        {/* <h3>direction</h3> */}
        {/* <select onChange={(e) => setDirection(e.target.value)}><option value="superLeft">super left</option><option value="leftOut">left out</option><option value="left">left</option><option value="center">center</option><option value="right">right</option><option value="rightOut">right out</option><option value="superRight">super right</option></select> */}
        {/* <h3>force</h3><select onChange={(e) => setForce(e.target.value)}><option value={1}>low</option><option value={2}>low-medium</option><option value={3}>medium</option><option value={4}>medium-high</option><option value={5}>high</option></select> */}
        {/* <h3>keeper action</h3>
        <select
          onChange={(e) => {
            setKeeperAction(e.target.value);
          }}
        >
          <option value="right_down">rigth down</option>
          <option value="right_up">rigth up</option>
          <option value="center">center</option>
          <option value="left_down">left down</option>
          <option value="left_up">left up</option>
        </select>
        <button onClick={handleKick}>kick</button>
        <button id="restart" onClick={restartShoot}>
          restart
        </button> */}
      </div>
    </div>
  );
};

export default Interface;
