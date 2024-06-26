"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TermConditions = () => {
  const router = useRouter();

  const redirectTo = () => {
    router.push("/dashboard");
    router.push("/dashboard");
  };

  return (
    <div className="content terms_conditions">
      <button id="read-more" className="readMore">
        <img src="/images/icon-read-more.png" alt="Learn more" />
        Learn more
      </button>
      <div className="text" id="contentTerms">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Vitae, quod
          cum, ipsum magni repellat assumenda eum nihil autem hic voluptatum,
          quasi officia ab quas officiis dicta alias molestias voluptate porro!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          placeat ducimus laudantium repudiandae deleniti iure doloribus nemo
          itaque saepe pariatur neque assumenda molestiae maiores ad ut eius
          exercitationem, sed officia.
        </p>
        <p>
          Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          iure! Veritatis est vero vitae quam reprehenderit! Inventore ut at
          rerum, quos molestias, non, molestiae aperiam incidunt culpa modi est
          dicta.
        </p>
        <p>
          Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          iure! Veritatis est vero vitae quam reprehenderit! Inventore ut at
          rerum, quos molestias, non, molestiae aperiam incidunt culpa modi est
          dicta.
        </p>
        <p>
          Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          iure! Veritatis est vero vitae quam reprehenderit! Inventore ut at
          rerum, quos molestias, non, molestiae aperiam incidunt culpa modi est
          dicta.
        </p>
        <p>
          Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          iure! Veritatis est vero vitae quam reprehenderit! Inventore ut at
          rerum, quos molestias, non, molestiae aperiam incidunt culpa modi est
          dicta.
        </p>
        <p>
          Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          iure! Veritatis est vero vitae quam reprehenderit! Inventore ut at
          rerum, quos molestias, non, molestiae aperiam incidunt culpa modi est
          dicta.
        </p>
      </div>
      <div className="contentBtn">
        <button onClick={redirectTo} id="btnNoAcepted" className="disabledBtn">
          Do not consent
        </button>
        <button onClick={redirectTo} id="btnAcepted" className="disabledBtn">
          Consent
        </button>
      </div>
    </div>
  );
};

export default TermConditions;
