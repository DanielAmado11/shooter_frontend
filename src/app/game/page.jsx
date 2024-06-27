"use client";
import styles from "./page.module.css";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  CharacterAnimationProvider,
  useCharacterAnimation,
} from "@/contexts/CharacterAnimation";
import Grass from "../../components/grass/Grass";
import Interface from "@/components/interface/Interface";
import { Kicker_1 } from "@/components/kickers/Kicker_1";
import { Goal } from "@/components/goal/goal";
import { Ball } from "@/components/ball/ball";
import { Debug, Physics } from "@react-three/cannon";
import {
  BoxCollaider,
  SphereCollaider,
} from "@/components/Collaiders/collaiders";
import { Stadium } from "@/components/stadium/Stadium";
const Goalkeeper_1 = lazy(() =>
  import("@/components/goalkeepers/GoalKeeper_1").then((mod) => ({
    default: mod.Goalkeeper_1,
  }))
);
import { kicker_positions } from "@/utils/kickerPositions";
import { Arrow_1 } from "@/components/arrow/arrow_1";
import Header from "@/components/header/header";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { SkyBox } from "@/components/skybox/skybox";

const goalKeeperActions = [
  "left_down",
  "left_up",
  "center",
  "right_down",
  "right_up",
];

const Game = (props) => {
  const [shootType, setShootType] = useState("penalty");
  const [kickerAction, setKickerAction] = useState("penalty");
  const [keeperAction, setKeeperAction] = useState("right_down");
  const [direction, setDirection] = useState(null);
  const [force, setForce] = useState(1);
  const [forcePercentage, setForcePercentage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [goals, setGoals] = useState(0);
  const [currentKickerAnimation, setCurrentKickerAnimation] = useState({
    time: 0,
  });
  const [arrowState, setArrowState] = useState({ isRotating: true });
  const [start, setStart] = useState(false);

  const router = useRouter();

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
    setTimeout(() => {
      router.push("leaderboard");
    }, 2000);
  };

  const cameraRef = useRef();
  useEffect(() => {
    const cameraPosition =
      kicker_positions[shootType][kickerAction].camera_position;
    if (cameraRef.current) {
      console.log(cameraRef.current.position, cameraPosition);
      cameraRef.current.position.set(...cameraPosition);
      cameraRef.current.lookAt(0, 1.5, 0);
    }
  }, [shootType, kickerAction]);

  const chooseRandomGoalkeeperAction = () => {
    const biasedActions = [...goalKeeperActions];
    const unitDirection = direction.split("_")[0];
    if (unitDirection === "left") {
      biasedActions.push("left_down", "left_up");
    } else if (unitDirection === "right") {
      biasedActions.push("right_down", "right_up");
    }
    const randomIndex = Math.floor(Math.random() * biasedActions.length);
    setKeeperAction(biasedActions[randomIndex]);
  };

  useEffect(() => {
    if (direction) {
      chooseRandomGoalkeeperAction();
    }
  }, [direction]);

  const attemptShoot = (attemptsZone, callback) => {
    setAttempts(attempts + 1);
    if (attemptsZone === 3) {
      setTimeout(() => {
        const types = Object.keys(kicker_positions);
        const currentIndex = types.indexOf(shootType);
        // exclude shootype of the list of types
        types.splice(currentIndex, 1);
        const randomIndex = Math.floor(Math.random() * types.length);
        setShootType(types[randomIndex]);
      }, 2000);
    } else {
      setTimeout(() => {
        callback();
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      {/* <Loader onStart={handleStart} /> */}
      <CharacterAnimationProvider>
        <Header goals={goals} start={start} onStop={handleStop} />
        <Canvas shadows id="canvas">
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={kicker_positions[shootType][kickerAction].camera_position}
            fov={50}
          />
          <ambientLight intensity={2} color={"0xffffff"} />
          <directionalLight color="white" position={[5, 5, 5]} />
          {/* <OrbitControls target={[0, 1.5, 0]} enableDamping={false} /> */}
          <Suspense fallback={<Loader onStart={handleStart} />}>
            {/* <Environment background={true} files={exrTexture} /> */}
            <SkyBox url="skybox/skybox.exr" />
            <Physics
              broadphase="SAP"
              gravity={[0, -9.8, 0]}
              frictionGravity={[0, 1, 0]}
              defaultContactMaterial={{ restitution: 0.8 }}
            >
              {/* <Debug color="red"> */}
              <Kicker_1
                position={shootType}
                action={kickerAction}
                onActiveAnimation={setCurrentKickerAnimation}
              />
              <Ball
                position={shootType}
                animationTime={currentKickerAnimation.time}
                direction={direction}
                force={force}
                arrowState={arrowState}
                attemptShoot={attemptShoot}
              />
              <Arrow_1
                shootType={shootType}
                action={kickerAction}
                setDirection={setDirection}
                setArrowState={setArrowState}
                setForcePercentage={setForcePercentage}
                setForce={setForce}
                forcePercentage={forcePercentage}
              />
              <Goalkeeper_1
                action={keeperAction}
                type={shootType}
                animationTime={currentKickerAnimation.time}
              />
              <Goal
                scale={[2, 0.6, 0.6]}
                shootType={shootType}
                keepPosition={keeperAction}
                setGoals={setGoals}
              />
              <Stadium position={[-0.5, -2.43, 48.5]} />
              <BoxCollaider
                args={[120, 1, 120]}
                position={[0, -0.5, 0]}
                rotation={[0, 0, 0]}
                mass={1}
                type="Static"
                name="ground"
                // onCollide={(e) => console.log("collided")}
              >
                <mesh>
                  <boxGeometry args={[120, 1, 120]} />
                  <meshBasicMaterial />
                </mesh>
              </BoxCollaider>
              {/* </Debug> */}
            </Physics>
          </Suspense>
        </Canvas>
        <Interface
          setBallPosition={setShootType}
          setDirection={setDirection}
          setForce={setForce}
          setKeeperAction={setKeeperAction}
          goals={goals}
          setShootType={setShootType}
          arrowState={arrowState}
          attempts={attempts}
          forcePercentage={forcePercentage}
        />
      </CharacterAnimationProvider>
    </div>
  );
};

export default Game;
