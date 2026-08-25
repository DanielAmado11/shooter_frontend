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
  { name: "left_superOut", start: 0, end: 0.07625000238418579 },
  { name: "left_out", start: 0.07625000238418579, end: 0.20333333969116213 },
  { name: "left", start: 0.20333333969116213, end: 0.381250011920929 },
  { name: "left_center", start: 0.381250011920929, end: 0.5591666841506959 },
  { name: "center", start: 0.5591666841506959, end: 0.7116666889190675 },
  { name: "right_center", start: 0.7116666889190675, end: 0.8895833611488344 },
  { name: "right", start: 0.8895833611488344, end: 1.0675000333786013 },
  { name: "right_out", start: 1.0675000333786013, end: 1.1945833706855777 },
  { name: "right_superOut", start: 1.1945833706855777, end: 1.2708333730697636 },
  { name: "right_superOut", start: 1.2708333730697636, end: 1.3470833754539495 },
  { name: "right_out", start: 1.3470833754539495, end: 1.474166712760926 },
  { name: "right", start: 1.474166712760926, end: 1.6520833849906928 },
  { name: "right_center", start: 1.6520833849906928, end: 1.8300000572204598 },
  { name: "center", start: 1.8300000572204598, end: 1.9825000619888313 },
  { name: "left_center", start: 1.9825000619888313, end: 2.1604167342185985 },
  { name: "left", start: 2.1604167342185985, end: 2.338333406448365 },
  { name: "left_out", start: 2.338333406448365, end: 2.4654167437553416 },
  { name: "left_superOut", start: 2.4654167437553416, end: 2.5416667461395273 },
];
const porcetages = {
  left_superOut: 6,
  left_out: 10,
  left: 14,
  left_center: 14,
  center: 12,
  right_center: 14,
  right: 14,
  right_out: 10,
  right_superOut: 6,
};
const porcentajesSeparados = {
  left_superOut: 3,
  left_out: 5,
  left: 7,
  left_center: 7,
  center: 6,
  right_center: 7,
  right: 7,
  right_out: 5,
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
