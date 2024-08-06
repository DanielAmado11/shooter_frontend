"use client";
import { getUserData } from "@/services/user";
import { useState } from "react";
import { useQuery } from "react-query";

const PreviewPage = ({ params }) => {
  const [screenShot, setScreenShot] = useState("");
  const { username } = params;

  const { data } = useQuery("screenShot", () => getUserData(username));
  return (
    <>
      <div className="content">
        <img src={data?.image} alt="screenShot" />
      </div>
    </>
  );
};

export default PreviewPage;
