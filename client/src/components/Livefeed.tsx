// LiveFeed.js
import React, { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const LiveFeed = () => {
  const videoRef = useRef(null);
  const [previewStream, setPreviewStream] = useState(null);
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

  const handleStartRecording = (startRecording) => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = (stopRecording) => {
    stopRecording();
    setIsRecording(false);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "300px", border: "2px solid black" }}
      />
      <ReactMediaRecorder
        video
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button
              onClick={() => handleStartRecording(startRecording)}
              disabled={isRecording}
            >
              Start Recording
            </button>
            <button
              onClick={() => handleStopRecording(stopRecording)}
              disabled={!isRecording}
            >
              Stop Recording
            </button>

            {mediaBlobUrl && (
              <div>
                <h3>Recorded Video:</h3>
                <video
                  src={mediaBlobUrl}
                  controls
                  autoPlay
                  loop
                  style={{ width: "300px" }}
                />
                <a href={mediaBlobUrl} download="recorded-video.mp4">
                  <button>Download Video</button>
                </a>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default LiveFeed;
