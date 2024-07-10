"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const TermConditions = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    const contentContainer = document.getElementById("contentTerms");
    // const readMoreButton = document.getElementById("read-more");
    const btnNoAcepted = document.getElementById("btnNoAcepted");
    const btnAcepted = document.getElementById("btnAcepted");

    function checkScroll() {
      if (
        contentContainer.scrollTop + contentContainer.clientHeight >=
        contentContainer.scrollHeight
      ) {
        btnNoAcepted.classList.add("btn");
        btnAcepted.classList.add("btn");
        btnNoAcepted.classList.remove("disabledBtn");
        btnAcepted.classList.remove("disabledBtn");
      } else {
        btnNoAcepted.classList.remove("btn");
        btnAcepted.classList.remove("btn");
        btnNoAcepted.classList.add("disabledBtn");
        btnAcepted.classList.add("disabledBtn");
      }
    }

    // readMoreButton.addEventListener("click", function () {
    //   contentContainer.scrollTo({
    //     top: contentContainer.scrollHeight,
    //     behavior: "smooth",
    //   });
    // });

    contentContainer.addEventListener("scroll", checkScroll);

    // Verificar el estado del scroll al cargar la página
    checkScroll();
  }, []);

  const handleNoAcepted = () => {
    signOut();
    router.push("/welcome");
  };

  const handleAccept = () => {
    router.push("/dashboard");
    redirect("/dashboard");
  };

  return (
    <>
      <button className="back" id="toggle-button">
        <img src="/images/back.png" alt="back" />
      </button>
      <div className="content terms_conditions">
        <div className="text" id="contentTerms">
          <p>
            By clicking "Consent" you consent to have your name displayed on the
            game's leaderboard. This allows other players to see your
            achievements and rank within the game. Your participation enhances
            the competitive spirit and community engagement, showcasing your
            skills and dedication to the game. If you have any concerns about
            privacy, please refer to our privacy policy at{" "}
            <a href="https://www.miamimocaad.org/privacy-policy">
              https://www.miamimocaad.org/privacy-policy
            </a>
            for more details on how your information will be used.
          </p>
        </div>
        <div className="contentBtn">
          <button id="btnNoAcepted" className="btn" onClick={handleNoAcepted}>
            Do not consent
          </button>
          <button id="btnAcepted" className="btn" onClick={handleAccept}>
            Consent
          </button>
        </div>
      </div>
    </>
  );
};

export default TermConditions;
