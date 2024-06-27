export const kicker_positions = {
  penalty: {
    idle: {
      position: [-1, 0, 12],
      rotation: [0, Math.PI, 0],
      animation: "idle",
      camera_position: [0, 2.5, 15],
    },
    penalty: {
      position: [-1, 0, 12],
      rotation: [0, Math.PI, 0],
      animation: "penalty",
      camera_position: [0, 2.5, 15],
    },
  },
  freekick_center: {
    idle: {
      position: [-1, 0, 19],
      rotation: [0, Math.PI, 0],
      animation: "idle",
      camera_position: [0, 2.5, 22],
    },
    penalty: {
      position: [-1, 0, 19],
      rotation: [0, Math.PI, 0],
      animation: "penalty",
      camera_position: [0, 2.5, 22],
    },
  },
  freekick_left: {
    idle: {
      position: [-16, 0, 18],
      rotation: [0, Math.PI - Math.PI / 4, 0],
      animation: "idle",
      camera_position: [-14, 2.5, 24],
    },
    penalty: {
      position: [-16, 0, 18],
      rotation: [0, Math.PI - Math.PI / 4, 0],
      animation: "penalty",
      camera_position: [-19, 2.5, 24],
    },
  },
  freekick_right: {
    idle: {
      position: [18, 0, 18.5],
      rotation: [0, -Math.PI / 2 - Math.PI / 4, 0],
      animation: "idle",
      camera_position: [24, 2.5, 19],
    },
    penalty: {
      position: [18, 0, 18.5],
      rotation: [0, Math.PI - Math.PI / 4, 0],
      animation: "penalty",
      camera_position: [24, 2.5, 19],
    },
  },
};
