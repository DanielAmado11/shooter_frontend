import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Mute.module.css";
import { sounds } from "../sounds/sounds";

const Mute = () => {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("ar_muted") !== "1";
  });

  useEffect(() => {
    const volume = isPlaying ? 0.5 : 0;
    Object.values(sounds).forEach((sound) => sound.volume(volume));
  }, [isPlaying]);

  const toggleSounds = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      localStorage.setItem("ar_muted", next ? "0" : "1");
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <Image
        src={isPlaying ? "/images/SoundOn.png" : "/images/SoundOff.png"}
        alt="Sound"
        onClick={toggleSounds}
        width={20}
        height={20}
        className={styles.image}
      />
    </div>
  );
};

export default Mute;
