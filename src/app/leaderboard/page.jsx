"use client";
import { useEffect, useState } from "react";

const LeaderBoard = ({ params }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // get goals from params
  const goals = params.goals;

  useEffect(() => {}, []);

  return (
    <div>
      <div>game over!! web static demo game version</div>
    </div>
  );
};

export default LeaderBoard;
