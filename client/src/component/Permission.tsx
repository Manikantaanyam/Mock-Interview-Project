// PermissionRequest.js
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PermissionRequest = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      navigate("/cam");
    } catch (error) {
      console.error("Permission denied:", error);
      setPermissionDenied(true);
    }
  };

  return (
    <div className="p-8 grid grid-cols-2">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="mb-3 text-lg font-semibold ">
            We need access to your camera and microphone
          </h2>
          <div className="bg-slate-200 w-[500px] h-[300px] shadow-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <Button className="w-[300px] mt-6" onClick={requestPermission}>
            Allow Access
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-yellow-500 p-4 rounded-md">
          <h1 className="font-bold text-3xl">
            Enable Webcam & Audio to Begin Your AI Interview
          </h1>
          <p className="mt-2">
            Get Ready for a Real Interview Experience! To provide you with the
            most realistic interview simulation, we need access to your webcam
            and audio. This allows you to: Engage Interactively: Answer
            questions as if you were in a live interview. Practice with
            Real-Time Feedback: Our AI will analyze your answers, including how
            you present them. Improve Your Confidence: Speaking aloud during
            your mock interview helps you prepare better for the real thing.
          </p>
        </div>
      </div>

      {permissionDenied && (
        <p className="text-center mt-2">
          You have denied access to the camera and microphone.
        </p>
      )}
    </div>
  );
};

export default PermissionRequest;
