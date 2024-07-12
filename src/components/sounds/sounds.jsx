import { Howl } from "howler";

export const sounds = {
  background_1: new Howl({
    src: ["/sounds/loop_1.mp3"],
    volume: 0.5,
    loop: true,
    onplayerror: function () {
      background_1.once("unlock", function () {
        background_1.play();
      });
    },
  }),
  background_2: new Howl({
    src: ["/sounds/loop_2.mp3"],
    volume: 0.5,
    loop: true,
    onplayerror: function () {
      background_2.once("unlock", function () {
        background_2.play();
      });
    },
  }),
  stadium: new Howl({
    src: ["/sounds/tribuna.mp3"],
    volume: 0.5,
    loop: true,
    onplayerror: function () {
      stadium.once("unlock", function () {
        stadium.play();
      });
    },
  }),
  kick_1: new Howl({
    src: ["/sounds/Balon_1.mp3"],
    volume: 0.5,
    onplayerror: function () {
      kick_1.once("unlock", function () {
        kick_1.play();
      });
    },
  }),
  kick_2: new Howl({
    src: ["/sounds/Balon_2.mp3"],
    volume: 0.5,
  }),
  kick_3: new Howl({
    src: ["/sounds/Balon_3.mp3"],
    volume: 0.5,
  }),
  keep_1: new Howl({
    src: ["/sounds/Arquero_1.mp3"],
    volume: 0.5,
  }),
  keep_2: new Howl({
    src: ["/sounds/Arquero_2.mp3"],
    volume: 0.5,
  }),
  keep_3: new Howl({
    src: ["/sounds/Arquero_3.mp3"],
    volume: 0.5,
  }),
  goal: new Howl({
    src: ["/sounds/Gol.mp3"],
    volume: 0.5,
  }),
  goal_stadium: new Howl({
    src: ["/sounds/tribuna_gol.mp3"],
  }),
  whistle_1: new Howl({
    src: ["/sounds/Silbato_1.mp3"],
    volume: 0.5,
  }),
  whistle_2: new Howl({
    src: ["/sounds/Silbato_2.mp3"],
    volume: 0.5,
  }),
};

const Sounds = () => {
  return (
    <div>
      <h1>Sounds</h1>
    </div>
  );
};

export default Sounds;
