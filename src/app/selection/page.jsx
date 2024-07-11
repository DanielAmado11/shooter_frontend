"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { changeAvatar } from "@/services/user";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "react-query";

const Selection = () => {
  const router = useRouter();
  const { status } = useAuth();

  const changeAvatar_ = useMutation(changeAvatar, {
    onSuccess: (res) => {
      router.push("/dashboard");
      redirect("/dashboard");
    },
    onError: (error) => {
      alert(`ERROR: ${error.response.data}`);
    },
  });

  const handleSelect = (id) => {
    if (status === "AUTHENTICATED") {
      changeAvatar_.mutate(id);
    } else {
      router.push(`/login?avatar_id=${id}`);
      redirect(`/login?avatar_id=${id}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (status === "AUTHENTICATED") {
      router.push("/dashboard");
      redirect("/dashboard");
    } else {
      alert("Please select an avatar");
    }
  };

  return (
    <div>
      <button className="back" id="toggle-button" onClick={handleBack}>
        <img src="/images/back.png" alt="" />
      </button>
      <div className="content">
        <div className="item selector">
          <div className="text-selector">
            <p>Select your avatar</p>
          </div>
          <div className="characters">
            <button onClick={() => handleSelect(1)} className="character">
              <img src="/images/characters/kicker_1.png" alt="player women 1" />
            </button>
            <button className="character" onClick={() => handleSelect(2)}>
              <img src="/images/characters/kicker_2.png" alt="payer women 2" />
            </button>
            <button className="character" onClick={() => handleSelect(3)}>
              <img
                src="/images/characters/kicker_3.png"
                alt="player woment 3"
              />
            </button>
          </div>
          <div className="characters">
            <button className="character" onClick={() => handleSelect(4)}>
              <img src="/images/characters/kicker_4.png" alt="player men 1" />
            </button>
            <button className="character" onClick={() => handleSelect(5)}>
              <img src="/images/characters/kicker_5.png" alt="player men 2" />
            </button>
            <button className="character" onClick={() => handleSelect(6)}>
              <img src="/images/characters/kicker_6.png" alt="player men 3" />
            </button>
          </div>
          <button className="btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;
