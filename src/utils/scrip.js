// const intervals = [
//   { name: "left_superOut", start: 0, end: 0.18154762472425187 },
//   { name: "left_out", start: 0.18154762472425187, end: 0.36309524944850375 },
//   { name: "left", start: 0.36309524944850375, end: 0.5446428741727556 },
//   { name: "center", start: 0.5446428741727556, end: 0.7261904988970075 },
//   { name: "right", start: 0.7261904988970075, end: 0.9077381236212593 },
//   { name: "right_out", start: 0.9077381236212593, end: 1.0892857483455111 },
//   { name: "right_superOut", start: 1.0892857483455111, end: 1.270833373069763 },
//   { name: "right_superOut", start: 1.270833373069763, end: 1.452380997794015 },
//   { name: "right_out", start: 1.452380997794015, end: 1.6339286225182668 },
//   { name: "right", start: 1.6339286225182668, end: 1.8154762472425187 },
//   { name: "center", start: 1.8154762472425187, end: 1.9970238719667705 },
//   { name: "left", start: 1.9970238719667705, end: 2.1785714966910224 },
//   { name: "left_out", start: 2.1785714966910224, end: 2.360119121415274 },
//   { name: "left_superOut", start: 2.360119121415274, end: 2.5416667461395264 },
// ];

// const porcentajesAgrupados = {
//   left_superOut: 14.26,  // Suma de left_superOut y superLeft2
//   left_out: 14.26,    // Suma de left_out y leftOut2
//   left: 14.26,       // Suma de left y left2
//   center: 14.26,     // Suma de center y center2
//   right: 14.26,      // Suma de right y right2
//   right_out: 14.26,   // Suma de right_out y rightOut2
//   right_superOut: 14.26, // Suma de superRight1 y superRight2
// };

// const porcentajesIntervalos = {
//     left_superOut: 7.13,
//     left_out: 7.13,
//     left: 7.13,
//     center: 7.13,
//     right: 7.13,
//     right_out: 7.13,
//     superRight1: 7.13,
//     superRight2: 7.13,
//     rightOut2: 7.13,
//     right2: 7.13,
//     center2: 7.13,
//     left2: 7.13,
//     leftOut2: 7.13,
//     superLeft2: 7.13
//   };

//-------------------------------------------//---------------------------------------------

// 1 menos a los lados
const intervals = [
  { name: "left_superOut", start: 0, end: 0.0762490023841858 },
  { name: "left_out", start: 0.0762490023841858, end: 0.2287470071525574 },
  { name: "left", start: 0.2287470071525574, end: 0.5464553504199982 },
  { name: "center", start: 0.5464553504199982, end: 0.7243720236547661 },
  { name: "right", start: 0.7243720236547661, end: 1.0410803669222069 },
  { name: "right_out", start: 1.0410803669222069, end: 1.1935783716905785 },
  {
    name: "right_superOut",
    start: 1.1935783716905785,
    end: 1.2698273740747644,
  },
  {
    name: "right_superOut",
    start: 1.2698273740747644,
    end: 1.3460763764589503,
  },
  { name: "right_out", start: 1.3460763764589503, end: 1.498574381227322 },
  { name: "right", start: 1.498574381227322, end: 1.8152827244947628 },
  { name: "center", start: 1.8152827244947628, end: 1.9931993977295307 },
  { name: "left", start: 1.9931993977295307, end: 2.3099077419969716 },
  { name: "left_out", start: 2.3099077419969716, end: 2.4624057467653433 },
  { name: "left_superOut", start: 2.4624057467653433, end: 2.5416667461395264 },
];
const porcetages = {
  left_superOut: 6,
  left_out: 12,
  left: 25,
  center: 14,
  right: 25,
  right_out: 12,
  right_superOut: 6,
};
const porcentajesSeparados = {
  left_superOut: 3,
  left_out: 6,
  left: 12.5,
  center: 7,
  right: 12.5,
  right_out: 6,
  right_superOut: 3,
  left_superOut: 3,
  left_out: 6,
  left: 12.5,
  center: 7,
  right: 12.5,
  right_out: 6,
  right_superOut: 3,
};
// Función para encontrar el nombre del intervalo correspondiente a un número
export const getIntervalName = (time) => {
  function findIntervalName(number) {
    for (let interval of intervals) {
      if (number >= interval.start && number < interval.end) {
        return interval.name;
      }
    }
    // Si el número es exactamente igual al final de la duración, pertenece al último intervalo
    let lastInterval = intervals[intervals.length - 1];
    if (number === lastInterval.end) {
      return lastInterval.name;
    }
    return null; // Si no se encuentra ningún intervalo, devolver null
  }
  let intervalName = findIntervalName(time);
  return intervalName;
};

// siguiendo este patron:

// const intervals = [
//   { name: "left_superOut", start: 0, end: 0.18154762472425187 },
//   { name: "left_out", start: 0.18154762472425187, end: 0.36309524944850375 },
//   { name: "left", start: 0.36309524944850375, end: 0.5446428741727556 },
//   { name: "center", start: 0.5446428741727556, end: 0.7261904988970075 },
//   { name: "right", start: 0.7261904988970075, end: 0.9077381236212593 },
//   { name: "right_out", start: 0.9077381236212593, end: 1.0892857483455111 },
//   { name: "right_superOut", start: 1.0892857483455111, end: 1.270833373069763 },
//   { name: "right_superOut", start: 1.270833373069763, end: 1.452380997794015 },
//   { name: "right_out", start: 1.452380997794015, end: 1.6339286225182668 },
//   { name: "right", start: 1.6339286225182668, end: 1.8154762472425187 },
//   { name: "center", start: 1.8154762472425187, end: 1.9970238719667705 },
//   { name: "left", start: 1.9970238719667705, end: 2.1785714966910224 },
//   { name: "left_out", start: 2.1785714966910224, end: 2.360119121415274 },
//   { name: "left_superOut", start: 2.360119121415274, end: 2.5416667461395264 },
// ];

// y con los mismos nombres, dame cada intervalo en el array, tomando como  limites 0 - 2.5416667461395264 pero tomand como referencia para cada valor: del array:

// left_superOut: 3%,
// left_out: 6%,
// left: 12.5%,
// center: 7%,
// right: 12.5%,
// right_out: 6%,
// right_superOut: 3%,
// left_superOut: 3%,
// left_out: 6%,
// left: 12.5%,
// center: 7%,
// right: 12.5%,
// right_out: 6%,
// right_superOut: 3%
