import { Howl } from "howler";

export const sounds = {
  background_1: new Howl({
    src: ["/sounds/loop_1.ogg"],
    volume: 0.5,
    loop: true,
    onplayerror: function () {
      background_1.once("unlock", function () {
        background_1.play();
      });
    },
  }),
  background_2: new Howl({
    src: ["/sounds/loop_2.ogg"],
    volume: 0.5,
    loop: true,
  }),
  stadium: new Howl({
    src: ["/sounds/tribuna.ogg"],
    volume: 0.5,
    loop: true,
  }),
  kick_1: new Howl({
    src: ["/sounds/Balon_1.ogg"],
    volume: 0.5,
  }),
  kick_2: new Howl({
    src: ["/sounds/Balon_2.ogg"],
    volume: 0.5,
  }),
  kick_3: new Howl({
    src: ["/sounds/Balon_3.ogg"],
    volume: 0.5,
  }),
  keep_1: new Howl({
    src: ["/sounds/Arquero_1.ogg"],
    volume: 0.5,
  }),
  keep_2: new Howl({
    src: ["/sounds/Arquero_2.ogg"],
    volume: 0.5,
  }),
  keep_3: new Howl({
    src: ["/sounds/Arquero_3.ogg"],
    volume: 0.5,
  }),
  goal: new Howl({
    src: ["/sounds/Gol.ogg"],
    volume: 0.5,
  }),
  goal_stadium: new Howl({
    src: ["/sounds/tribuna_gol.ogg"],
  }),
  whistle_1: new Howl({
    src: ["/sounds/Silbato_1.ogg"],
    volume: 0.5,
  }),
  whistle_2: new Howl({
    src: ["/sounds/Silbato_2.ogg"],
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
