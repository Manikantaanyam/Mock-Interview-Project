import { BrowserRouter, Route, Routes } from "react-router-dom";
import Question from "./components/Question";
import Camera from "./components/Cam";
import From from "./components/From";
import PermissionRequest from "./components/PermissionRequest";
import LiveFeed from "./components/Livefeed";
import SpeechToText from "./components/Speech";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<From />} />
          <Route path="/cam" element={<Question />} />
          <Route path="/permission" element={<PermissionRequest />} />
          <Route path="/speech" element={<SpeechToText />} />
          {/* <Route path="/live-feed" element={<LiveFeed />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
