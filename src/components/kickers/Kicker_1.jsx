/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 kick.gltf 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { kicker_positions } from "@/utils/kickerPositions";
import { useCharacterAnimation } from "@/contexts/CharacterAnimation";

export function Kicker_1(props) {
  const { position, action, onActiveAnimation } = props;
  const { nodes, materials, animations } = useGLTF("./models/kicker/kick.gltf");
  const group = useRef();

  const { actions } = useAnimations(animations, group);
  const { animationIndex } = useCharacterAnimation();

  const stopMovement = (movement) => {
    const animation = actions[movement];
    animation.stop();
  };

  const startMovement = (movement) => {
    const animation = actions[movement].setLoop(THREE.LoopRepeat);
    animation.reset();
    animation.play();
  };

  const handleKick = () => {
    const animation = actions[action].setLoop(THREE.LoopOnce);
    stopMovement("idle");
    animation.reset();
    animation.play();
    // animation.clampWhenFinished = true;
    animation.getMixer().addEventListener("finished", () => {
      stopMovement(action);
      startMovement("idle");
    });
  };

  useEffect(() => {
    switch (animationIndex) {
      case 0:
        onActiveAnimation({ time: actions[action].getClip().duration });
        startMovement("idle");
        break;
      case 1:
        handleKick();
        break;
      default:
        break;
    }
  }, [animationIndex]);

  return (
    <group ref={group} {...kicker_positions[position].idle} dispose={null}>
      <group name="Scene">
        <group name="pnalty_kick" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="black_man1">
            <skinnedMesh
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={materials.shorts}
              skeleton={nodes.Mesh.skeleton}
            />
            <skinnedMesh
              name="Mesh_1"
              geometry={nodes.Mesh_1.geometry}
              material={materials.black_eyes_1}
              skeleton={nodes.Mesh_1.skeleton}
            />
            <skinnedMesh
              name="Mesh_2"
              geometry={nodes.Mesh_2.geometry}
              material={materials.black_hair_1}
              skeleton={nodes.Mesh_2.skeleton}
            />
            <skinnedMesh
              name="Mesh_3"
              geometry={nodes.Mesh_3.geometry}
              material={materials.shoes}
              skeleton={nodes.Mesh_3.skeleton}
            />
            <skinnedMesh
              name="Mesh_4"
              geometry={nodes.Mesh_4.geometry}
              material={materials.black_body_1}
              skeleton={nodes.Mesh_4.skeleton}
            />
            <skinnedMesh
              name="Mesh_5"
              geometry={nodes.Mesh_5.geometry}
              material={materials.head_black_1}
              skeleton={nodes.Mesh_5.skeleton}
            />
            <skinnedMesh
              name="Mesh_6"
              geometry={nodes.Mesh_6.geometry}
              material={materials.shirt}
              skeleton={nodes.Mesh_6.skeleton}
            />
            <skinnedMesh
              name="Mesh_7"
              geometry={nodes.Mesh_7.geometry}
              material={materials.socks}
              skeleton={nodes.Mesh_7.skeleton}
            />
            <skinnedMesh
              name="Mesh_8"
              geometry={nodes.Mesh_8.geometry}
              material={materials.brown_body}
              skeleton={nodes.Mesh_8.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/kicker/kick.gltf");