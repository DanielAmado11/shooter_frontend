// import * as THREE from "three";
// const { EXRLoader } = require("three/examples/jsm/loaders/EXRLoader");

import { useLoader, useThree } from "@react-three/fiber";
import React from "react";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";

// export const loadSkybox = (scene) => {
//   const loaderexr = new EXRLoader();
//   loaderexr.load(
//     "skybox/skybox.exr",
//     (texture) => {
//       console.log("LOADING SKYBOX", scene);
//       texture.mapping = THREE.EquirectangularReflectionMapping;
//       scene.background = texture;
//       scene.environment = texture;
//     },
//     (xhr) => {
//       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     },
//     (error) => {
//       console.log("An error happened");
//     }
//   );
// };

export const SkyBox = ({ url }) => {
  const { scene } = useThree();
  const loader = useLoader(EXRLoader, url);

  React.useEffect(() => {
    const texture = loader;
    scene.background = texture;
    return () => (scene.background = null);
  }, [loader, scene]);

  return null;
};
