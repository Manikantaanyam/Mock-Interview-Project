import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dataAtom } from "../store/atoms/dataAtom";
import { getItem } from "@/session";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

function From() {
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState("");
  const [techstack, setTechStack] = useState("");
  const [YOE, setYOE] = useState("");
  const setData = useSetRecoilState(dataAtom);

  const hanldeData = async (e) => {
    const token = getItem("token");
    e.preventDefault();
    const reponse = await axios.post(
      "http://127.0.0.1:8787/api/user/start",
      { jobRole, techStack: techstack, YOE },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(reponse.data.actualResponse);
    navigate("/permission");
  };
  return (
    <div className="grid grid-cols-2 h-screen items-center border border-l-black ">
      <div className="flex justify-center ">
        <div className="w-[350px] border shadow-md p-4 flex flex-col gap-3">
          <Label htmlFor="email">JobRole</Label>
          <Input
            onChange={(e) => setJobRole(e.target.value)}
            id="email"
            type="email"
            placeholder="full stack dev"
            required
          />
          <Label htmlFor="email">Techstack</Label>
          <Input
            id="email"
            type="email"
            placeholder="react, javascript, typescript"
            required
          />
          <Label htmlFor="email">year of experience</Label>
          <Input
            id="email"
            type="email"
            placeholder="5 years of exp"
            required
          />
          <Button onClick={hanldeData} className="mt-2">
            submit
          </Button>
        </div>
      </div>
      <div className="w-[600px] bg-yellow-600 p-4 rounded-md">
        <h1 className="text-3xl font-bold mb-3">Get Interviewed by AI!</h1>
        <p className="text-md text-black">
          Prepare for Your Dream Job Let our AI help you get ready for your next
          interview! Based on your job role, tech stack, and years of
          experience, we generate personalized interview questions to simulate a
          real-life interview scenario.
        </p>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default From;
