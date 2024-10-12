import { useState, useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const Camera = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [previewStream, setPreviewStream] = useState(null);
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // Request permission for webcam and microphone
  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setHasPermission(true); // Permission granted
      setPreviewStream(stream); // Store the stream
    } catch (error) {
      console.error("Permission denied:", error);
      setPermissionDenied(true); // Permission denied
    }
  };

  // Set up video stream when permission is granted
  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream; // Assign stream to video element for live preview
    }

    return () => {
      // Stop all tracks when the component is unmounted
      if (previewStream) {
        previewStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [previewStream]);

  // Handle recording start and stop
  const handleStartRecording = (startRecording) => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = (stopRecording) => {
    stopRecording();
    setIsRecording(false);
  };

  // Step 1: Permission Page
  if (!hasPermission && !permissionDenied) {
    return (
      <div>
        <h2>We need access to your camera and microphone</h2>
        <button onClick={requestPermission}>Allow Access</button>
      </div>
    );
  }

  // Step 2: Live Preview and Recording Component
  return hasPermission ? (
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

            {/* Recorded Video */}
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
  ) : (
    <div>
      <h2>Permission denied</h2>
      <p>You have denied access to the camera and microphone.</p>
    </div>
  );
};

export default Camera;
