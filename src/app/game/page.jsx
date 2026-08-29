"use client";
import styles from "./page.module.css";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, useProgress } from "@react-three/drei";
import { Suspense, memo, useCallback, useEffect, useRef, useState } from "react";
import { CharacterAnimationProvider, useCharacterAnimation } from "@/contexts/CharacterAnimation";
import Interface from "@/components/interface/Interface";
import { Kicker_1 } from "@/components/kickers/Kicker_1";
import { Goal } from "@/components/goal/goal";
import { Ball } from "@/components/ball/ball";
import { Physics } from "@react-three/cannon";
import { BoxCollaider } from "@/components/Collaiders/collaiders";
import { Stadium } from "@/components/stadium/Stadium";
import { Goalkeeper_1 } from "@/components/goalkeepers/GoalKeeper_1";
import { kicker_positions } from "@/utils/kickerPositions";
import { Arrow_1 } from "@/components/arrow/arrow_1";
import Header from "@/components/header/header";
import CameraShake from "@/components/CameraShake";
import { useRouter, useSearchParams } from "next/navigation";
import { SkyBox } from "@/components/skybox/skybox";
import { sounds, preloadSounds } from "@/components/sounds/sounds";
import { useAuth } from "@/components/providers/auth-provider";
import { GAME_TIMING, sleep } from "@/utils/gameTiming";
import { getScores } from "@/services/score";
import { updateComment } from "@/services/user";
import { getMatch, recordShot, finishMatch, MATCH_POLL_INTERVAL } from "@/services/match";
import Button from "@/components/ui/Button";
import * as THREE from "three";

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

const SHADOW_MAP = IS_MOBILE ? 512 : 2048;

const Game = () => {
  return (
    <div className={styles.container}>
      <CharacterAnimationProvider>
        <GameContent />
      </CharacterAnimationProvider>
    </div>
  );
};

const GameContent = () => {
  const { data: user } = useAuth();
  const { animationIndex, setAnimationIndex } = useCharacterAnimation();
  const [shootType, setShootType] = useState("penalty");
  const [kickerAction, setKickerAction] = useState("kick");
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
  const [fading, setFading] = useState(false);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    Number(process.env.TIMER) || GAME_TIMING.duration
  );
  const [showSummary, setShowSummary] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [comment, setComment] = useState("");
  const [savingComment, setSavingComment] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [slowMo, setSlowMo] = useState(false);
  const [isPowerupShot, setIsPowerupShot] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [matchId, setMatchId] = useState(null);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [matchState, setMatchState] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);
  const [matchWinnerId, setMatchWinnerId] = useState(null);
  const [opponentGoals, setOpponentGoals] = useState(0);
  const [matchStarted, setMatchStarted] = useState(false);
  const startedRef = useRef(false);
  const startRef = useRef(false);
  const shootTypeRef = useRef("penalty");
  const lastWasGoalRef = useRef(false);
  const keeperHitRef = useRef(false);
  const postHitRef = useRef(false);
  const attemptResolvedRef = useRef(false);
  const resultTimerRef = useRef(null);
  const resettingRef = useRef(false);
  const startTimeRef = useRef(null);
  const powerupRef = useRef(false);
  const bestStreakRef = useRef(0);
  const shotRecordedRef = useRef(false);
  const { progress } = useProgress();
  const MIN_SPLASH = 2500;
  const mountTimeRef = useRef(Date.now());

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryMatchId = searchParams.get("match");

  useEffect(() => {
    if (queryMatchId) {
      setIsMultiplayer(true);
      setMatchId(Number(queryMatchId));
    }
  }, [queryMatchId]);

  useEffect(() => {
    startRef.current = start;
  }, [start]);

  useEffect(() => {
    bestStreakRef.current = Math.max(bestStreakRef.current, streak);
    setBestStreak(bestStreakRef.current);
  }, [streak]);

  useEffect(() => {
    shootTypeRef.current = shootType;
  }, [shootType]);

  useEffect(() => {
    if (animationIndex !== 1) return;
    const drain = setInterval(() => {
      setForcePercentage((prev) => Math.max(0, prev - 2));
    }, 40);
    return () => clearInterval(drain);
  }, [animationIndex]);

  useEffect(() => {
    if (!result || !isMultiplayer || !matchId || shotRecordedRef.current) return;
    shotRecordedRef.current = true;
    recordShot(matchId, { shootType, direction, force, keeperAction, result }).catch(() => {});
  }, [result, isMultiplayer, matchId, shootType, direction, force, keeperAction]);

  const handleStart = useCallback(() => {
    if (startedRef.current) return;
    if (isMultiplayer) {
      setSplashVisible(false);
      return;
    }
    startedRef.current = true;
    startTimeRef.current = Date.now();
    setStart(true);
    setSplashVisible(false);
    preloadSounds();
    sounds.background_1.stop();
    sounds.background_2.stop();
    sounds.whistle_1.play();
    sounds.stadium.play();
  }, [isMultiplayer]);

  const handleUnMount = () => {
    sounds.stadium.stop();
    if (sounds.background_2.playing()) {
      sounds.background_2.stop();
    }
    if (!sounds.background_1.playing()) {
      sounds.background_1.play();
    }
  };

  useEffect(() => {
    if (progress === 100) {
      const elapsed = Date.now() - mountTimeRef.current;
      const remaining = Math.max(0, MIN_SPLASH - elapsed);
      const timeout = setTimeout(() => {
        handleStart();
      }, remaining);
      return () => clearTimeout(timeout);
    }
  }, [progress, handleStart]);

  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (progress < 100) handleStart();
    }, 8000);
    return () => clearTimeout(fallbackTimeout);
  }, [progress, handleStart]);

  useEffect(() => {
    return () => {
      console.log("unmounting");
      if (resultTimerRef.current) {
        clearTimeout(resultTimerRef.current);
        resultTimerRef.current = null;
      }
      handleUnMount();
    };
  }, []);

  useEffect(() => {
    if (!isMultiplayer || !matchId) return;
    let cancelled = false;
    const matchStartedRef = { current: false };
    const poll = async () => {
      try {
        const data = await getMatch(matchId);
        if (cancelled) return;
        setMatchState(data);
        const myId = user?.id;
        setIsMyTurn(data.match.currentPlayerId === myId);
        shotRecordedRef.current = false;
        setOpponentGoals(
         data.match.shots.filter(
           (s) => s.playerId === data.match.player2_id && s.result === "goal"
          ).length
        );
        if (data.match.status === "playing" && !matchStartedRef.current) {
          matchStartedRef.current = true;
          setMatchStarted(true);
          if (!startedRef.current) {
            startedRef.current = true;
            startTimeRef.current = Date.now();
            setStart(true);
            setSplashVisible(false);
            preloadSounds();
            sounds.background_1.stop();
            sounds.background_2.stop();
            sounds.whistle_1.play();
            sounds.stadium.play();
          }
        }
        if (data.match.status === "finished") {
          setMatchFinished(true);
          setMatchWinnerId(data.match.winnerId);
        }
      } catch {
        // ignore poll errors
      }
    };
    poll();
    const interval = setInterval(poll, MATCH_POLL_INTERVAL);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isMultiplayer, matchId, user?.id]);

  const handleStop = () => {
    if (isMultiplayer) return;
    setStart(false);
    setShowSummary(true);
    getScores()
      .then((data) => {
        const scores = data?.scores || [];
        const me = scores.find((s) => s.code === user.code);
        setUserPosition(me ? me.position : null);
      })
      .catch(() => {});
    setTimeout(() => {
      sounds.whistle_2.play();
    }, 1000);
  };

  const handleMatchEnd = useCallback(async () => {
    if (!matchId) return;
    try {
      await finishMatch(matchId);
    } catch {
      // ignore
    }
  }, [matchId]);

  useEffect(() => {
    if (matchFinished) {
      handleMatchEnd();
    }
  }, [matchFinished, handleMatchEnd]);

  const goToLeaderboard = () => {
    sounds.stadium.stop();
    sounds.background_2.play();
    router.push("leaderboard");
  };

  const handleSaveComment = async () => {
    if (savingComment) return;
    setSavingComment(true);
    try {
      await updateComment(comment.trim());
    } catch (e) {
      // continue to leaderboard even if the comment fails
    }
    goToLeaderboard();
  };

  const handleSkipComment = () => {
    goToLeaderboard();
  };

  const cameraRef = useRef();
  useEffect(() => {
    const cameraPosition =
      kicker_positions[shootType][kickerAction].camera_position;
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
      cameraRef.current.lookAt(0, 1.5, 0);
    }
  }, [shootType, kickerAction]);

  const chooseRandomGoalkeeperAction = () => {
    const totalTime = Number(process.env.TIMER) || GAME_TIMING.duration;
    const elapsed = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : 0;
    const accuracy = Math.min(0.92, 0.4 + (elapsed / totalTime) * 0.52);
    const unitDirection = direction.split("_")[0];
    const all = ["left_down", "left_up", "center", "right_down", "right_up"];
    let correct;
    if (unitDirection === "left") {
      correct = ["left_down", "left_up"];
    } else if (unitDirection === "right") {
      correct = ["right_down", "right_up"];
    } else {
      correct = all;
    }
    const pool = Math.random() < accuracy ? correct : all;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setKeeperAction(pool[randomIndex]);
  };

  useEffect(() => {
    if (direction) {
      chooseRandomGoalkeeperAction();
    }
  }, [direction]);

  const endAttempt = useCallback(async () => {
    if (!startRef.current || resettingRef.current) return;
    resettingRef.current = true;
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
    setFading(true);
    await sleep(GAME_TIMING.fadeDuration);
    const types = Object.keys(kicker_positions).filter(
      (t) => t !== shootTypeRef.current
    );
    const randomIndex = Math.floor(Math.random() * types.length);
    setShootType(types[randomIndex]);
    setDirection(null);
    setForce(1);
    setForcePercentage(0);
    lastWasGoalRef.current = false;
    keeperHitRef.current = false;
    postHitRef.current = false;
    attemptResolvedRef.current = false;
    powerupRef.current = false;
    setIsPowerupShot(false);
    setSlowMo(false);
    resultTimerRef.current = null;
    setResult(null);
    shotRecordedRef.current = false;
    setAnimationIndex(0);
    await sleep(GAME_TIMING.fadeDuration);
    setFading(false);
    resettingRef.current = false;
  }, [setAnimationIndex]);

  const resolveAttempt = useCallback(
    (outcome) => {
      if (attemptResolvedRef.current) return;
      attemptResolvedRef.current = true;
      if (resultTimerRef.current) {
        clearTimeout(resultTimerRef.current);
        resultTimerRef.current = null;
      }
      setResult(outcome);
      if (outcome === "goal") {
        setAnimationIndex(2);
      } else {
        setStreak(0);
      }
      setTimeout(() => {
        setResult(null);
        endAttempt();
      }, GAME_TIMING.resultDisplay);
    },
    [setAnimationIndex, endAttempt]
  );

  const handleAttempt = useCallback(() => {
    if (resettingRef.current) return;
    setAttempts((prev) => prev + 1);
    resultTimerRef.current = setTimeout(() => {
      resultTimerRef.current = null;
      if (!startRef.current) return;
      if (lastWasGoalRef.current) return;
      if (powerupRef.current) {
        lastWasGoalRef.current = true;
        setStreak((prev) => prev + 1);
        resolveAttempt("goal");
        return;
      }
      resolveAttempt(
        keeperHitRef.current
          ? "saved"
          : postHitRef.current
          ? "post"
          : "miss"
      );
    }, GAME_TIMING.resultWindow);
  }, [resolveAttempt]);

  const handleSpecial = useCallback((special) => {
    powerupRef.current = special;
    setIsPowerupShot(special);
  }, []);

  const handlePost = useCallback(() => {
    postHitRef.current = true;
  }, []);

  const handleTick = useCallback((t) => {
    setTimeLeft(t);
  }, []);

  const handleKick = useCallback(() => {
    setKickCount((c) => c + 1);
  }, []);

  const handleGoal = useCallback(() => {
    if (lastWasGoalRef.current) return;
    lastWasGoalRef.current = true;
    setStreak((prev) => prev + 1);
    setSlowMo(true);
    setTimeout(() => setSlowMo(false), GAME_TIMING.slowMoDuration);
    resolveAttempt("goal");
  }, [resolveAttempt]);

  const handleKeeperHit = useCallback(() => {
    keeperHitRef.current = true;
  }, []);

  return (
    <>
      <Header
        goals={goals}
        start={start}
        onStop={handleStop}
        shots={attempts}
        streak={streak}
        bestStreak={bestStreak}
        onTick={handleTick}
        goals2={isMultiplayer ? opponentGoals : undefined}
        opponentName={isMultiplayer && matchState?.player2?.name}
      />
      <GameScene
        shootType={shootType}
        kickerAction={kickerAction}
        keeperAction={keeperAction}
        currentKickerAnimation={currentKickerAnimation}
        start={start}
        direction={direction}
        force={force}
        arrowState={arrowState}
        user={user}
        cameraRef={cameraRef}
        setCurrentKickerAnimation={setCurrentKickerAnimation}
        setDirection={setDirection}
        setArrowState={setArrowState}
        setForce={setForce}
        setForcePercentage={setForcePercentage}
        setGoals={setGoals}
        onAttempt={handleAttempt}
        onGoal={handleGoal}
        onSave={handleKeeperHit}
        onPost={handlePost}
        onSpecial={handleSpecial}
        onKick={handleKick}
        kickCount={kickCount}
        slowMo={slowMo}
        powerup={isPowerupShot}
        isMultiplayer={isMultiplayer}
        matchStarted={matchStarted}
        isMyTurn={isMyTurn}
      />
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
        playing={isMultiplayer ? (matchStarted && isMyTurn) : start}
      />
      {result && (
        <div
          className={`${styles.result} ${
            styles[`result${result.charAt(0).toUpperCase() + result.slice(1)}`]
          } ${result === "goal" && powerupRef.current ? styles.resultPowerup : ""}`}
        >
          {result === "goal" && (
            <div
              className={`${styles.goalFlash} ${
                powerupRef.current ? styles.powerupFlash : ""
              }`}
            />
          )}
          <span>
            {result === "goal"
              ? powerupRef.current
                ? "BALONAZO!"
                : "GOAL!"
              : result === "saved"
              ? "SAVED!"
              : result === "post"
              ? "OFF THE POST!"
              : "MISS!"}
          </span>
        </div>
      )}
      {start && timeLeft <= 10 && <div className={styles.lowTime} />}
      {showSummary && (
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>TIME&apos;S UP!</h2>
            <div className={styles.summaryStats}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryValue}>{goals}</span>
                <span className={styles.summaryLabel}>GOALS</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryValue}>{bestStreak}</span>
                <span className={styles.summaryLabel}>BEST STREAK</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryValue}>{attempts}</span>
                <span className={styles.summaryLabel}>SHOTS</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryValue}>
                  {userPosition ? `#${userPosition}` : "—"}
                </span>
                <span className={styles.summaryLabel}>POSITION</span>
              </div>
            </div>
            <div className={styles.dedication}>
              <textarea
                className={styles.commentInput}
                maxLength={100}
                rows={2}
                placeholder="Leave a dedication..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className={styles.dedicationActions}>
                <Button variant="ghost" onClick={handleSkipComment}>
                  Skip
                </Button>
                <Button
                  loading={savingComment}
                  disabled={savingComment}
                  onClick={handleSaveComment}
                >
                  Save &amp; continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {splashVisible && (
        <div className={styles.splash}>
          <div className={styles.splashContent}>
            <img
              src="/images/logo_ARshootout.png"
              alt="AR Shoot Out"
              className={styles.splashLogo}
            />
            <div className={styles.splashProgress}>
              <div
                className={styles.splashBar}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className={styles.splashReady}>GET READY TO SHOOT!</div>
          </div>
        </div>
      )}
      <div className={`${styles.fade} ${fading ? styles.fadeVisible : ""}`} />
      {isMultiplayer && !matchFinished && (!matchStarted || !isMyTurn) && (
        <div className={styles.multiplayerOverlay}>
          <div className={styles.overlayCard}>
            <div className={styles.overlayTitle}>
              {matchStarted ? "Waiting for your turn..." : "Match starting..."}
            </div>
          </div>
        </div>
      )}
      {matchFinished && (
        <div className={styles.multiplayerOverlay}>
          <div className={styles.overlayCard}>
            <div className={styles.overlayTitle}>
              {matchWinnerId === user?.id ? "You Win!" : "You Lose!"}
            </div>
            <div className={styles.overlayStats}>
              <span>Goals: {goals}</span>
              <span>Opponent: {opponentGoals}</span>
            </div>
            <Button variant="primary" onClick={() => router.push("/")}>
              Return to menu
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const GameScene = memo(function GameScene({
  shootType,
  kickerAction,
  keeperAction,
  currentKickerAnimation,
  start,
  direction,
  force,
  arrowState,
  user,
  cameraRef,
  setCurrentKickerAnimation,
  setDirection,
  setArrowState,
  setForce,
  setForcePercentage,
  setGoals,
  onAttempt,
  onGoal,
  onSave,
  onPost,
  onSpecial,
  onKick,
  kickCount,
  slowMo,
  powerup,
  isMultiplayer,
  matchStarted,
  isMyTurn,
}) {
  return (
    <Canvas
      shadows={true}
      id="canvas"
      className={styles.canvas}
      style={{ width: "100vw", height: "100dvh" }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      dpr={IS_MOBILE ? [1, 1.5] : [1, 2]}
    >
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={kicker_positions[shootType][kickerAction].camera_position}
        fov={50}
      />
      <hemisphereLight args={[0xbcd3ff, 0x223344, 0.7]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        color="white"
        position={[20, 20, 20]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={SHADOW_MAP}
        shadow-mapSize-height={SHADOW_MAP}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />
      <directionalLight
        color="#cfe3ff"
        position={[-12, 8, -18]}
        intensity={0.35}
      />
      <CameraShake trigger={kickCount} />
      <Suspense fallback={null}>
        <SkyBox url="skybox/skybox.exr" />
        <Physics
          broadphase="SAP"
          gravity={[0, -9.8, 0]}
          frictionGravity={[0, 1, 0]}
          defaultContactMaterial={{ restitution: 0.8 }}
        >
          <Kicker_1
            playing={start}
            position={shootType}
            action={kickerAction}
            onActiveAnimation={setCurrentKickerAnimation}
            user={user}
          />
          <Ball
            playing={start}
            position={shootType}
            animationTime={currentKickerAnimation.time}
            direction={direction}
            force={force}
            onAttempt={onAttempt}
            onKick={onKick}
            slowMo={slowMo}
            powerup={powerup}
          />
          <Arrow_1
            shootType={shootType}
            action={kickerAction}
            setDirection={setDirection}
            setArrowState={setArrowState}
            setForcePercentage={setForcePercentage}
            setForce={setForce}
            playing={isMultiplayer ? (matchStarted && isMyTurn) : start}
            onSpecial={onSpecial}
          />
          <Goalkeeper_1
            playing={start}
            action={keeperAction}
            type={shootType}
            animationTime={currentKickerAnimation.time}
          />
          <Goal
            scale={[2, 0.6, 0.6]}
            shootType={shootType}
            keepPosition={keeperAction}
            setGoals={setGoals}
            onGoal={onGoal}
            onSave={onSave}
            onPost={onPost}
          />
          <Stadium position={[-0.5, -2.43, 48.5]} />
          <BoxCollaider
            args={[120, 1, 120]}
            position={[0, -0.5, 0]}
            rotation={[0, 0, 0]}
            mass={1}
            type="Static"
            name="ground"
          >
            <mesh>
              <boxGeometry args={[120, 1, 120]} />
              <meshBasicMaterial />
            </mesh>
          </BoxCollaider>
        </Physics>
      </Suspense>
    </Canvas>
  );
});

export default Game;
