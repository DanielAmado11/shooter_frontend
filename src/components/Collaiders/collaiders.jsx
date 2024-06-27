import { useBox, useCylinder, usePlane, useSphere } from "@react-three/cannon";
import { useEffect } from "react";

export const BoxCollaider = (props) => {
  const [BoxCollaider, BoxCollaiderAPI] = useBox(() => ({
    args: props.args,
    position: props.position,
    rotation: props.rotation,
    mass: props.mass,
    type: props.type,
    material: props.material,
    name: props.name,
    onCollide: (e) => {
      if (props.onCollide) props.onCollide(e);
    },
  }));

  useEffect(() => {
    BoxCollaiderAPI.position.set(
      props.position[0],
      props.position[1],
      props.position[2]
    );
    BoxCollaiderAPI.rotation.set(
      props.rotation[0],
      props.rotation[1],
      props.rotation[2]
    );
  }, [props.position, props.rotation]);

  return <group ref={BoxCollaider}>{props.children}</group>;
};

export const SphereCollaider = (props) => {
  const [SphereCollaider, SphereCollaiderAPI] = useSphere(() => ({
    args: props.args,
    position: props.position,
    rotation: props.rotation,
    mass: props.mass,
    type: props.type,
    onCollide: (e) => {
      if (props.onCollide) props.onCollide(e);
    },
  }));
  return <group ref={SphereCollaider}>{props.children}</group>;
};

export const CylinderCollaider = (props) => {
  const [CilinderCollaider, CilinderCollaiderAPI] = useCylinder(() => ({
    args: props.args,
    position: props.position,
    rotation: props.rotation,
    mass: props.mass,
    type: props.type,
    onCollide: (e) => {
      if (props.onCollide) props.onCollide(e);
    },
  }));
  return (
    <group dispose={null}>
      <mesh ref={CilinderCollaider}>{props.children}</mesh>
    </group>
  );
};

export const useSphereCollaider = (props) => {
  const [sphereCollaider, sphereCollaiderAPI] = useSphere(() => ({
    args: props.args,
    position: props.position,
    rotation: props.rotation,
    mass: props.mass,
    type: props.type,
    scale: props.scale,
    name: props.name,
    material: props.material,
    onCollide: (e) => {
      if (props.onCollide) props.onCollide(e);
    },
  }));

  // useEffect(() => {
  //   sphereCollaiderAPI.position.set(
  //     props.position[0],
  //     props.position[1],
  //     props.position[2]
  //   );
  //   sphereCollaiderAPI.rotation.set(
  //     props.rotation[0],
  //     props.rotation[1],
  //     props.rotation[2]
  //   );
  // }, [props.position, props.rotation]);

  return {
    sphereCollaider,
    sphereCollaiderAPI,
  };
};

export const useBoxCollaider = (props) => {
  const [boxCollaider, boxCollaiderAPI] = useBox(() => ({
    args: props.args,
    position: props.position,
    rotation: props.rotation,
    mass: props.mass,
    type: props.type,
  }));

  return {
    boxCollaider,
    boxCollaiderAPI,
  };
};
