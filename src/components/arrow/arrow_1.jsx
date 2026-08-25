import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterAnimation } from "@/contexts/CharacterAnimation";
import { trayectory_forces } from "@/utils/trayectory_forces";
import { getIntervalName } from "@/utils/scrip";

const ZONE_LABELS = {
  left_superOut: "FAR LEFT",
  left_out: "LEFT OUT",
  left: "LEFT CORNER",
  left_center: "LEFT-CENTER",
  center: "CENTER",
  right_center: "RIGHT-CENTER",
  right: "RIGHT CORNER",
  right_out: "RIGHT OUT",
  right_superOut: "FAR RIGHT",
};
const CORNER_ZONES = ["left", "right"];
const ROTATION_DURATION = 2.5416667461395264;

const ZONE_X = {
  left_superOut: -4.4,
  left_out: -3.6,
  left: -2.6,
  left_center: -1.3,
  center: 0,
  right_center: 1.3,
  right: 2.6,
  right_out: 3.6,
  right_superOut: 4.4,
};

export function Arrow_1(props) {
  const {
    shootType,
    action,
    setDirection,
    setArrowState,
    setForcePercentage,
    setForce,
    playing,
    onSpecial,
  } = props;
  const group = useRef();
  const intervalRef = useRef();
  const counterRef = useRef(0);
  const touchActiveRef = useRef(false);
  const aimDirectionRef = useRef(null);
  const aimRef = useRef(null);
  const { nodes, materials, animations } = useGLTF(
    "../models/arrow/arrow_1.gltf"
  );
  const { actions } = useAnimations(animations, group);
  const { animationIndex, setAnimationIndex } = useCharacterAnimation();
  const mixerRef = useRef();

  const startRotation = () => {
    const animation = actions.rotation.setLoop(THREE.LoopRepeat);
    mixerRef.current = animation.getMixer();
    animation.play();
    mixerRef.current.timeScale = 0.55;
  };

  useEffect(() => {
    if (actions.rotation) {
      group.current.position.set(
        ...trayectory_forces[shootType].arrow_position
      );
      group.current.rotation.set(
        ...trayectory_forces[shootType].arrow_rotation
      );
      group.current.visible = animationIndex === 0;
      if (!mixerRef.current) {
        startRotation();
      } else if (animationIndex === 0) {
        handleRestart();
      }
    }
  }, [animationIndex, shootType]);

  const incrementForce = () => {
    if (intervalRef.current || playing === false) return;
    intervalRef.current = setInterval(() => {
      if (counterRef.current < 100) {
        counterRef.current += 1;
        setForcePercentage(counterRef.current);
      }
    }, 16);
  };

  const handleDown = (e) => {
    if (e.type === "mousedown" && touchActiveRef.current) return;
    if (e.type === "touchstart") touchActiveRef.current = true;
    e.preventDefault(); // Prevent default to avoid unexpected behavior on mobile
    if (actions.rotation && playing) {
      const elapsedTime = mixerRef.current.time % 2.5416667461395264;
      const intervalName = getIntervalName(elapsedTime);
      mixerRef.current.timeScale = 0;
      aimDirectionRef.current = intervalName;
      setDirection(intervalName);
      setArrowState({ isRotating: false });
      incrementForce();
    }
  };

  const handleUp = (e) => {
    if (e.type === "mouseup" && touchActiveRef.current) {
      touchActiveRef.current = false;
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeout(() => {
        setAnimationIndex(1);
      }, 200);
      const pct = counterRef.current;
      const force = Math.round(pct / 10) || 1;
      const special =
        (aimDirectionRef.current === "left" ||
          aimDirectionRef.current === "right") &&
        pct >= 85 &&
        pct <= 95;
      setForce(special ? 9 : force);
      if (typeof onSpecial === "function") onSpecial(special);
      counterRef.current = 0;
    }
  };

  const handleRestart = () => {
    if (actions.rotation) {
      actions.rotation.play();
      if (mixerRef.current) {
        setArrowState({ isRotating: true });
        mixerRef.current.timeScale = 0.55;
      }
    }
  };

  useEffect(() => {
    if (aimRef.current) aimRef.current.visible = playing;
    if (!playing) return;
    let raf;
    const tick = () => {
      const zoneEl = document.getElementById("aim-zone");
      if (zoneEl && mixerRef.current) {
        const t = mixerRef.current.time % ROTATION_DURATION;
        const name = getIntervalName(t);
        if (name) {
          zoneEl.textContent = ZONE_LABELS[name] || name;
          zoneEl.setAttribute("data-corner", CORNER_ZONES.includes(name) ? "true" : "false");
          if (aimRef.current) {
            aimRef.current.position.x = ZONE_X[name] ?? 0;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    const screenCanvas = document.getElementById("canvas");
    screenCanvas.addEventListener("mousedown", handleDown);
    screenCanvas.addEventListener("mouseup", handleUp);
    screenCanvas.addEventListener("touchstart", handleDown);
    screenCanvas.addEventListener("touchend", handleUp);

    return () => {
      screenCanvas.removeEventListener("mousedown", handleDown);
      screenCanvas.removeEventListener("mouseup", handleUp);
      screenCanvas.removeEventListener("touchstart", handleDown);
      screenCanvas.removeEventListener("touchend", handleUp);
    };
  }, [actions.rotation, playing]);

  return (
    <>
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.joint1} />
            <skinnedMesh
              name="flecha1"
              geometry={nodes.flecha2.geometry}
              material={materials.lambert4}
              skeleton={nodes.flecha2.skeleton}
            />
          </group>
        </group>
      </group>
      <group ref={aimRef} position={[0, 1.2, -0.45]} visible={false}>
        <mesh>
          <ringGeometry args={[0.16, 0.24, 32]} />
          <meshBasicMaterial color="#00ffd5" transparent opacity={0.95} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color="#00ffd5" transparent opacity={0.85} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("./models/arrow/arrow_1.gltf");
