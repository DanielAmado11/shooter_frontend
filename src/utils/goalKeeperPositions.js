export const goal_keeper_positions = {
  penalty: {
    idle: {
      position: [0, 0, 0],
      collider_position: [0, 0, 0],
      collider_rotation: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      animation: "idle",
    },
    left_down: {
      position: [0, 0, 0],
      collider_position: [-1.6, 0.3, 0],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left down",
    },
    left_up: {
      position: [0, 0, 0],
      collider_position: [-1.9, 1, 0.5],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left up",
    },
    right_down: {
      position: [0, 0, 0],
      collider_position: [1.6, 0.3, 0],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right down",
    },
    right_up: {
      position: [0, 0, 0],
      collider_position: [1.9, 1, 0.5],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right up",
    },
    center: {
      position: [0, 0, 0],
      collider_position: [-0.3, 1.4, 0.5],
      collider_rotation: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      animation: "center",
    },
  },
  freekick_center: {
    idle: {
      position: [0, 0, 0],
      collider_position: [0, 0, 0],
      collider_rotation: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      animation: "idle",
    },
    left_down: {
      position: [0, 0, 0],
      collider_position: [-1.6, 0.3, 0],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left down",
    },
    left_up: {
      position: [0, 0, 0],
      collider_position: [-1.9, 1, 0.5],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left up",
    },
    right_down: {
      position: [0, 0, 0],
      collider_position: [1.6, 0.3, 0],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right down",
    },
    right_up: {
      position: [0, 0, 0],
      collider_position: [1.9, 1, 0.5],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right up",
    },
    center: {
      position: [0, 0, 0],
      collider_position: [-0.3, 1.4, 0.5],
      collider_rotation: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      animation: "center",
    },
  },
  freekick_left: {
    idle: {
      position: [0, 0, 0],
      collider_position: [0, 0, 0],
      collider_rotation: [0, 0, 0],
      rotation: [Math.PI / 2, 0, Math.PI / 4],
      animation: "idle",
    },
    left_down: {
      position: [0, 0, 0],
      collider_position: [-1.6, 0.3, 0],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left down",
    },
    left_up: {
      position: [0, 0, 0],
      collider_position: [-2.2, 1, 0.5],
      collider_rotation: [0, 0, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left up",
    },
    center: {
      position: [0, 0, 0],
      collider_position: [-0.6, 1.4, 0.5],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 3, 0],
      rotation: [Math.PI / 2, 0, 0],
      animation: "center",
    },
    right_down: {
      position: [0, 0, 0],
      collider_position: [1.6, 0.3, 1],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 3, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right down",
    },
    right_up: {
      position: [0, 0, 0],
      collider_position: [1.9, 1, 1.5],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 3, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right up",
    },
  },
  freekick_right: {
    idle: {
      position: [1, 0, 1],
      collider_position: [0, 0, 0],
      collider_rotation: [0, 0, 0],
      rotation: [Math.PI / 2, 0, -Math.PI / 4],
      animation: "idle",
    },
    left_down: {
      position: [0, 0, 1],
      collider_position: [1, 0.3, 2.3],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 1.4, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left down",
    },
    left_up: {
      position: [0, 0, 0],
      collider_position: [0, 1, 2],
      collider_rotation: [0, Math.PI / 4, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "left up",
    },
    center: {
      position: [0, 0, 0],
      collider_position: [0.6, 1.4, 1.2],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 1.5, 0],
      rotation: [Math.PI / 2, 0, 0],
      animation: "center",
    },
    right_down: {
      position: [0, 0, 0],
      collider_position: [2.4, 0.3, 1],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 1.5, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right down",
    },
    right_up: {
      position: [0, 0, 0],
      collider_position: [2.8, 1, 1.5],
      // collider_position: [2.4, 0.3, 1],
      collider_rotation: [0, Math.PI / 2 + Math.PI / 1.5, Math.PI / 2],
      rotation: [Math.PI / 2, 0, 0],
      animation: "right up",
    },
  },
};
