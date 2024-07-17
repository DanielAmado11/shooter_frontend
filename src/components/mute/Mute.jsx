import Image from "next/image";
import { useState } from "react";
import styles from "./Mute.module.css";
import { sounds } from "../sounds/sounds";

const Mute = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSounds = () => {
    if (isPlaying) {
      Object.values(sounds).forEach((sound) => {
        sound.volume(0);
      });
    } else {
      Object.values(sounds).forEach((sound) => {
        sound.volume(0.5);
      });
    }
    setIsPlaying(!isPlaying);
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
