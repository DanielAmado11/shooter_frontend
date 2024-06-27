import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { usePlane } from "@react-three/cannon";

const Grass = (props) => {
  const { grandLength = 100, grandWidth = 80 } = props;
  const [planeColaider, planeColaiderAPI] = usePlane(() => ({
    type: "Static",
    position: [0, 0, 0],
    rotation: [-Math.PI / 4, 0, 0],
    args: [grandLength, grandWidth],
    mass: 1,
    onCollide: (e) => {
      console.log("collided");
    },
  }));
  const [colorMap, heightMap, normalMap, roughnessMap, aoMap, metallicMap] =
    useLoader(TextureLoader, [
      "./models/grass/stylized-grass1_albedo.png",
      "./models/grass/stylized-grass1_height.png",
      "./models/grass/stylized-grass1_normal-ogl.png",
      "./models/grass/stylized-grass1_roughness.png",
      "./models/grass/stylized-grass1_ao.png",
      "./models/grass/stylized-grass1_metallic.png",
    ]);
  // ajustar la textura
  const length = grandLength * 2;
  const width = grandWidth * 2;
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(length, width);
  heightMap.wrapS = THREE.RepeatWrapping;
  heightMap.wrapT = THREE.RepeatWrapping;
  heightMap.repeat.set(length, width);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(length, width);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(length, width);
  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;
  aoMap.repeat.set(length, width);
  metallicMap.wrapS = THREE.RepeatWrapping;
  metallicMap.wrapT = THREE.RepeatWrapping;
  metallicMap.repeat.set(length, width);

  return (
    <group ref={planeColaider}>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 4, 0, 0]} receiveShadow>
        <planeGeometry args={[grandLength, grandWidth]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={heightMap}
          displacementScale={0}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          metalnessMap={metallicMap}
        />
      </mesh>
    </group>
  );
};

export default Grass;
