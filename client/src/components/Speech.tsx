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

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
};

export default SpeechToText;
