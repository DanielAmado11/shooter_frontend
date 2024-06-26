import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { kicker_positions } from "@/utils/kickerPositions";
import { useCharacterAnimation } from "@/contexts/CharacterAnimation";
import { trayectory_forces } from "@/utils/trayectory_forces";
import { getIntervalName } from "@/utils/scrip";

let currentPercentage = 1;

export function Arrow_1(props) {
  const {
    shootType,
    action,
    setDirection,
    setArrowState,
    setForcePercentage,
    forcePercentage,
    setForce,
  } = props;
  const group = useRef();
  const intervalRef = useRef();
  const { nodes, materials, animations } = useGLTF(
    "./models/arrow/arrow_1.gltf"
  );
  const { actions } = useAnimations(animations, group);
  const { animationIndex, setAnimationIndex } = useCharacterAnimation();
  const mixerRef = useRef();

  const startRotation = () => {
    console.log("start rotation");
    const animation = actions.rotation.setLoop(THREE.LoopRepeat);
    mixerRef.current = animation.getMixer();
    // mixerRef.current.addEventListener("finished", () => {
    //   console.log("finished");
    // });
    animation.play();
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
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      // increase if 100 decrease
      let up = true;
      setForcePercentage((prev) => {
        if (prev === 100) {
          up = false;
        } else if (prev === 0) {
          up = true;
        }
        currentPercentage = prev;
        return up ? prev + 1 : prev - 1;
      });
    }, 10);
  };

  const handleDown = (e) => {
    if (actions.rotation) {
      //get current frame
      const elapsedTime = mixerRef.current.time % 2.5416667461395264;
      const intervalName = getIntervalName(elapsedTime);
      mixerRef.current.timeScale = 0;
      setDirection(intervalName);
      setArrowState({ isRotating: false });
      incrementForce();
    }
  };

  const handleUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeout(() => {
        setAnimationIndex(1);
      }, 200);
      const force = Math.round(currentPercentage / 20) || 1;
      setForce(force);
      setForcePercentage(0);
    }
  };

  const handleRestart = () => {
    if (actions.rotation) {
      actions.rotation.play();
      if (mixerRef.current) {
        setArrowState({ isRotating: true });
        mixerRef.current.timeScale = 1;
      }
    }
  };

  useEffect(() => {
    // click event in canvas stop the animation
    const screenCanvas = document.getElementById("canvas");
    screenCanvas.addEventListener("mousedown", handleDown);
    screenCanvas.addEventListener("mouseup", handleUp);

    // restart button
    // const restart = document.getElementById("restart");
    // restart.addEventListener("click", handleRestart);

    return () => {
      screenCanvas.removeEventListener("mousedown", handleDown);
      screenCanvas.removeEventListener("mouseup", handleUp);

      // restart.removeEventListener("click", handleRestart);
    };
  }, [actions.rotation]);

  return (
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
  );
}

useGLTF.preload("./models/arrow/arrow_1.gltf");
