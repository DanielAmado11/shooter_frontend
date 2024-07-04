"use client";
import { redirect, useRouter } from "next/navigation";
const Selection = () => {
  const router = useRouter();

  const redirectToUserName = (id) => {
    router.push(`/login?avatar_id=${id}`);
    redirect(`/login?avatar_id=${id}`);
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
            <button
              onClick={() => redirectToUserName(1)}
              value="1"
              className="character"
            >
              <img src="/images/characters/character-1.png" alt="" />
            </button>
            <button onClick={() => redirectToUserName(2)} className="character">
              <img src="/images/characters/character-2.png" alt="" />
            </button>
            <button onClick={() => redirectToUserName(3)} className="character">
              <img src="/images/characters/character-3.png" alt="" />
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
            <button onClick={() => redirectToUserName(4)} className="character">
              <img src="/images/characters/character-4.png" alt="" />
            </button>
            <button onClick={() => redirectToUserName(5)} className="character">
              <img src="/images/characters/character-5.png" alt="" />
            </button>
            <button onClick={() => redirectToUserName(6)} className="character">
              <img src="/images/characters/character-6.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;
