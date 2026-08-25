import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { GAME_TIMING } from "@/utils/gameTiming";

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

const CameraShake = ({ trigger }) => {
  const camera = useThree((s) => s.camera);
  const stateRef = useRef(null);
  const lastTrigger = useRef(0);

  useEffect(() => {
    if (trigger > lastTrigger.current) {
      lastTrigger.current = trigger;
      stateRef.current = {
        base: camera.position.clone(),
        until: performance.now() + GAME_TIMING.shakeDuration,
        amplitude: GAME_TIMING.shakeAmplitude * (IS_MOBILE ? 0.6 : 1),
      };
    }
  }, [trigger, camera]);

  useFrame(() => {
    const s = stateRef.current;
    if (!s) return;
    const now = performance.now();
    if (now < s.until) {
      const t = 1 - (s.until - now) / GAME_TIMING.shakeDuration;
      const amp = s.amplitude * t;
      camera.position.x = s.base.x + (Math.random() - 0.5) * amp;
      camera.position.y = s.base.y + (Math.random() - 0.5) * amp;
    } else {
      camera.position.copy(s.base);
      stateRef.current = null;
    }
  });

  return null;
};

export default CameraShake;
