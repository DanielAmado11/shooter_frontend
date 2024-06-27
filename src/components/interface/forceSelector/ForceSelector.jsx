import { useEffect, useRef, useState } from "react";
import styles from "./ForceSelector.module.css";

const ForceSelector = ({ onKick, setForce, arrowState, force }) => {
  // const [value, setValue] = useState(0.5);
  // const [isDragging, setIsDragging] = useState(false);
  // const sliderRef = useRef(null);

  // let realValue = 1;

  // const handleMouseDown = () => {
  //   if (arrowState.isRotating) return;
  //   setIsDragging(true);
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   const force = Math.round(realValue) || 1;
  //   setForce(force);
  //   setTimeout(() => {
  //     onKick();
  //   }, 200);
  // };

  // const handleMouseMove = (e) => {
  //   if (isDragging && sliderRef.current) {
  //     const sliderRect = sliderRef.current.getBoundingClientRect();
  //     const relativeX = e.clientX - sliderRect.left;
  //     const newValue = Math.min(
  //       Math.max((relativeX / sliderRect.width) * 5, 0),
  //       5
  //     );
  //     realValue = newValue;
  //     setValue(newValue);
  //   }
  // };

  // useEffect(() => {
  //   if (isDragging) {
  //     document.addEventListener("mousemove", handleMouseMove);
  //     document.addEventListener("mouseup", handleMouseUp);
  //   } else {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   }

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isDragging]);

  return (
    <div
      // id="slide-container"
      // // ref={sliderRef}
      // onMouseDown={handleMouseDown}
      className={styles.container}
    >
      <div id="bar" className={styles.bar} style={{ width: `${force}%` }}></div>
    </div>
  );
};

export default ForceSelector;
