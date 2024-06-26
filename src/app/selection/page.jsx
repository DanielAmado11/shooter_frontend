"use client";
import { useRouter } from "next/navigation";
const Selection = () => {
  const router = useRouter();

  const redirectToUserName = () => {
    router.push("/login");
  };

  const changeGender = () => {
    const female = document.getElementById("female");
    const male = document.getElementById("male");
    const toggleImage = document.getElementById("toggle-image");

    female.classList.toggle("hidden");
    male.classList.toggle("hidden");

    if (female.classList.contains("hidden")) {
      toggleImage.src = "/images/icon-female.png";
      toggleImage.alt = "Male";
    } else {
      toggleImage.src = "/images/icon-male.png";
      toggleImage.alt = "Female";
    }
  };

  return (
    <div>
      <button className="gender" id="toggle-button" onClick={changeGender}>
        <img id="toggle-image" src="/images/icon-male.png" alt="Male" />
      </button>
      <div className="content female " id="female">
        <div className="item selector">
          <div className="text-selector">
            <p>To start select an avatar</p>
          </div>
          <div className="icon-gender">
            <img src="/images/icon-female.png" alt="Female" />
          </div>
          <div className="characters">
            <button onClick={redirectToUserName} className="character">
              <img src="/images/characters/character-female-1.png" alt="" />
            </button>
            <button onClick={redirectToUserName} className="character">
              <img src="/images/characters/character-female-2.png" alt="" />
            </button>
            <button onClick={redirectToUserName} className="character">
              <img src="/images/characters/character-female-3.png" alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="content male hidden" id="male">
        <div className="item selector">
          <div className="text-selector">
            <p>To start select an avatar</p>
          </div>
          <div className="icon-gender">
            <img src="/images/icon-male.png" alt="Female" />
          </div>
          <div className="characters">
            <button onClick={redirectToUserName} className="character">
              <img src="/images/characters/character-male-1.png" alt="" />
            </button>
            <button onClick={redirectToUserName} className="character">
              <img src="/images/characters/character-male-2.png" alt="" />
            </button>
            <button onClick={redirectToUserName} className="character">
              <img src="/images/characters/character-male-3.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;
