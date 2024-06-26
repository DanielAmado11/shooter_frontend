"use client"
const { createContext, useContext, useState } = require("react");

const CharacterAnimationContext = createContext();

export const CharacterAnimationProvider = ({ children }) => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animations, setAnimations] = useState([]);

  return (
    <CharacterAnimationContext.Provider
      value={{
        animationIndex,
        setAnimationIndex,
        animations,
        setAnimations,
      }}
    >
      {children}
    </CharacterAnimationContext.Provider>
  );
};

export const useCharacterAnimation = () => {
  return useContext(CharacterAnimationContext);
};
