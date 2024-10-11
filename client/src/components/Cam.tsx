import { useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const Cam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  }, []);

  return (
    <div>
      <ReactMediaRecorder
        video
        audio
        render={({
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
          previewStream,
        }) => {
          useEffect(() => {
            if (videoRef.current && previewStream) {
              videoRef.current.srcObject = previewStream;
            }
          }, [previewStream]);

          return (
            <div>
              <p>{status}</p>
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>

              <video
                ref={videoRef}
                autoPlay
                controls
                muted
                style={{ width: "300px" }}
              />

              {mediaBlobUrl && (
                <div>
                  <video
                    src={mediaBlobUrl}
                    controls
                    autoPlay
                    loop
                    style={{ width: "300px" }}
                  />
                  {/* Download button */}
                  <a href={mediaBlobUrl} download="recorded-video.mp4">
                    <button>Download Video</button>
                  </a>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Cam;
