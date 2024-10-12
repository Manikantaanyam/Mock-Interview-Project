import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dataAtom } from "../store/atoms/dataAtom";

function From() {
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState("");
  const [techstack, setTechStack] = useState("");
  const [YOE, setYOE] = useState("");
  const setData = useSetRecoilState(dataAtom);

  const hanldeData = async (e) => {
    e.preventDefault();
    const reponse = await axios.post(
      "http://127.0.0.1:8787/api/user/start",
      { jobRole, techStack: techstack, YOE },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJVU0VSIn0.VFUHXQh74o9BG7ZUVqvm5bkvAIs97pjT_A5cqgb86YM",
        },
      }
    );
    setData(reponse.data.actualResponse);
    navigate("/permission");
  };
  return (
    <div>
      <div>
        <form action="" onSubmit={hanldeData}>
          <input
            onChange={(e) => setJobRole(e.target.value)}
            type="text"
            placeholder="jobrole"
            className="border border-black"
          />
          <br />
          <br />
          <input
            onChange={(e) => setTechStack(e.target.value)}
            type="text"
            placeholder="techstack"
            className="border border-black"
          />{" "}
          <br /> <br />
          <input
            onChange={(e) => setYOE(e.target.value)}
            type="text"
            placeholder="YOE"
            className="border border-black"
          />{" "}
          <br /> <br />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default From;
