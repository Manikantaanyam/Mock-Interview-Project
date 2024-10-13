import { FormEvent, useState } from "react";
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
  const [loader, setLoader] = useState(false);
  const setData = useSetRecoilState(dataAtom);

  const hanldeData = async (e: FormEvent<HTMLFormElement>) => {
    setLoader(true);
    const token: string | null = getItem("token");
    const realToken = JSON.parse(token);
    e.preventDefault();
    const reponse = await axios.post(
      "http://127.0.0.1:8787/api/user/start",
      { jobRole, techStack: techstack, YOE },
      {
        headers: {
          Authorization: `Bearer ${realToken.token}`,
        },
      }
    );
    setData(reponse.data.actualResponse);
    setLoader(false);
    navigate("/home/permission");
  };
  return (
    <div className="grid grid-cols-2 h-full mt-10 ">
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
            onChange={(e) => setTechStack(e.target.value)}
            id="email"
            type="email"
            placeholder="react, javascript, typescript"
            required
          />
          <Label htmlFor="email">year of experience</Label>
          <Input
            onChange={(e) => setYOE(e.target.value)}
            id="email"
            type="email"
            placeholder="5 years of exp"
            required
          />
          <Button onClick={hanldeData} className="mt-2">
            {!loader ? (
              "submit"
            ) : (
              <div role="status" className="flex gap-3 items-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <p className="text-md">Generating</p>
              </div>
            )}
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[600px] h-[200px] bg-yellow-600 p-4 rounded-md">
          <h1 className="text-3xl font-bold mb-3">Get Interviewed by AI!</h1>
          <p className="text-md text-black">
            Prepare for Your Dream Job Let our AI help you get ready for your
            next interview! Based on your job role, tech stack, and years of
            experience, we generate personalized interview questions to simulate
            a real-life interview scenario.
          </p>
        </div>
      </div>
    </div>
  );
}

export default From;
