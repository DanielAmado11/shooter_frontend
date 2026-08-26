// import * as THREE from "three";
// const { EXRLoader } = require("three/examples/jsm/loaders/EXRLoader");

import { useLoader, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
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
  const { gl, scene } = useThree();
  const loader = useLoader(EXRLoader, url);

  React.useEffect(() => {
    const texture = loader;
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const envRT = pmremGenerator.fromEquirectangular(texture);
    scene.background = texture;
    scene.environment = envRT.texture;
    return () => {
      scene.background = null;
      scene.environment = null;
      envRT.dispose();
      pmremGenerator.dispose();
    };
  }, [loader, gl, scene]);

  return null;
};
