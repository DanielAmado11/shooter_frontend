export const GAME_TIMING = {
  // Delay (ms) between the kick starting and the ball being launched, per avatar.
  shootDelayByPlayer: {
    1: 600,
    2: 500,
    3: 500,
    4: 700,
    5: 500,
    6: 500,
  },
  // The goalkeeper dives this many ms before the kick animation ends.
  keeperDiveOffset: 1000,
  // How long to wait after a shot before resolving the attempt (goal/no goal).
  resultWindow: 1800,
  // How long the result label (GOAL/SAVED/MISS) stays on screen.
  resultDisplay: 900,
  // Length of the fade used to transition between attempts.
  fadeDuration: 160,
  // How long the kicker holds the follow-through before returning to idle.
  kickFollowThroughHold: 150,
  // Ball spin (angular velocity, rad/s) applied at launch.
  spin: {
    roll: 6,
    lateral: 5,
  },
  // Magnus effect coefficient: curves the ball via k * (omega x v).
  magnus: 0.045,
  // Camera shake on kick.
  shakeDuration: 180,
  shakeAmplitude: 0.08,
  // Impact visual (ring + flash + squash) duration.
  impactDuration: 300,
  // Goal slow-mo: ball drag applied while active.
  slowMoDuration: 500,
  slowMoDrag: 0.05,
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
