import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import { LoginForm } from "./component/Form";
import From from "./component/From";
import PermissionRequest from "./component/Permission";
import LiveFeed from "./component/Livefeed";
import Dashboard from "./pages/Dashboard";
import { Navbar } from "./component/Navbar";
import Interview from "./pages/Interview";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Authpage children={<LoginForm type={"signup"} />} />}
          />
          <Route
            path="/login"
            element={<Authpage children={<LoginForm type={"Login"} />} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cam" element={<Interview />} />

          <Route path="/permission" element={<PermissionRequest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
