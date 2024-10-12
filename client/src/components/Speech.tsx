import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";

const SpeechToText = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUseranswer] = useState(results);

  useEffect(() => {
    results.map((result) => {
      setUseranswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button
        onClick={() => {
          console.log(userAnswer);
        }}
      >
        end
      </button>

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {/* <ul>
        {userAnswer}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
      <p>{userAnswer}</p>
    </div>
  );
};

export default SpeechToText;
