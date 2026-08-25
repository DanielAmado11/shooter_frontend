import { Howl } from "howler";

export const sounds = {
  background_1: new Howl({
    src: ["/sounds/loop_1.mp3"],
    volume: 0.5,
    loop: true,
    preload: false,
    onplayerror: function () {
      sounds.background_1.once("unlock", function () {
        sounds.background_1.play();
      });
    },
  }),
  background_2: new Howl({
    src: ["/sounds/loop_2.mp3"],
    volume: 0.5,
    loop: true,
    preload: false,
    onplayerror: function () {
      sounds.background_2.once("unlock", function () {
        sounds.background_2.play();
      });
    },
  }),
  stadium: new Howl({
    src: ["/sounds/tribuna.mp3"],
    volume: 0.5,
    loop: true,
    preload: false,
    onplayerror: function () {
      sounds.stadium.once("unlock", function () {
        sounds.stadium.play();
      });
    },
  }),
  kick_1: new Howl({
    src: ["/sounds/Balon_1.mp3"],
    volume: 0.5,
    preload: false,
    onplayerror: function () {
      sounds.kick_1.once("unlock", function () {
        sounds.kick_1.play();
      });
    },
  }),
  kick_2: new Howl({
    src: ["/sounds/Balon_2.mp3"],
    volume: 0.5,
    preload: false,
  }),
  kick_3: new Howl({
    src: ["/sounds/Balon_3.mp3"],
    volume: 0.5,
    preload: false,
  }),
  keep_1: new Howl({
    src: ["/sounds/Arquero_1.mp3"],
    volume: 0.5,
    preload: false,
  }),
  keep_2: new Howl({
    src: ["/sounds/Arquero_2.mp3"],
    volume: 0.5,
    preload: false,
  }),
  keep_3: new Howl({
    src: ["/sounds/Arquero_3.mp3"],
    volume: 0.5,
    preload: false,
  }),
  goal: new Howl({
    src: ["/sounds/Gol.mp3"],
    volume: 0.5,
    preload: false,
  }),
  goal_stadium: new Howl({
    src: ["/sounds/tribuna_gol.mp3"],
    preload: false,
  }),
  whistle_1: new Howl({
    src: ["/sounds/Silbato_1.mp3"],
    volume: 0.5,
    preload: false,
  }),
  whistle_2: new Howl({
    src: ["/sounds/Silbato_2.mp3"],
    volume: 0.5,
    preload: false,
  }),
  post: new Howl({
    src: ["/sounds/Balon_3.mp3"],
    volume: 0.6,
    preload: false,
  }),
};

export const preloadSounds = () => {
  Object.values(sounds).forEach((sound) => {
    if (sound.state() !== "loaded") sound.load();
  });
};

const Sounds = () => {
  return (
    <div>
      <h1>Sounds</h1>
    </div>
  );
};

export default Sounds;
