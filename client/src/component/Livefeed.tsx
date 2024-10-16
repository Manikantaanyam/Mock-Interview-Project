// LiveFeed.js
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import useSpeechToText from "react-hook-speech-to-text";

const LiveFeed = () => {
  const { results, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUseranswer] = useState(results);

  useEffect(() => {
    results.map((result) => {
      setUseranswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    const startStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setPreviewStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startStream();

    return () => {
      if (previewStream) {
        previewStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartRecording = (startRecording: () => void) => {
    startRecording();
    setIsRecording(true);
    startSpeechToText();
  };

  const handleStopRecording = (stopRecording: () => void) => {
    stopRecording();
    setIsRecording(false);
    stopSpeechToText();
    console.log(userAnswer);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: "400px",
          height: "300px",
          border: "1px solid black",
          transform: "scaleX(-1)",
        }}
      />
      <ReactMediaRecorder
        video
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p className="text-base font-medium my-2">{status}</p>
            <div className="w-full flex justify-between">
              <Button
                onClick={() => handleStartRecording(startRecording)}
                disabled={isRecording}
              >
                Start Recording
              </Button>
              <Button
                onClick={() => handleStopRecording(stopRecording)}
                disabled={!isRecording}
              >
                Stop Recording
              </Button>
              <Button>End Interview</Button>
            </div>
            <div>
              <a href={mediaBlobUrl} download="recorded-video.mp4">
                <Button className="w-full mt-4">Download Video</Button>
              </a>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default LiveFeed;
