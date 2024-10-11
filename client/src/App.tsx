import { BrowserRouter, Route, Routes } from "react-router-dom";
import Question from "./components/Question";
import Camera from "./components/Cam";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Question />} />
          <Route path="/cam" element={<Camera />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
