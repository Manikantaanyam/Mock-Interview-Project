import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import { LoginForm } from "./component/Form";
import PermissionRequest from "./component/Permission";
import Dashboard from "./pages/Dashboard";
import { Navbar } from "./component/Navbar";
import Interview from "./pages/Interview";
import Protected from "./component/Protected";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Authpage children={<LoginForm type={"signup"} />} />}
          />
          <Route
            path="/login"
            element={<Authpage children={<LoginForm type={"Login"} />} />}
          />
          <Route
            path="/home"
            element={
              <Protected>
                <Navbar />
              </Protected>
            }
          >
            <Route
              path="/home/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/home/cam"
              element={
                <Protected>
                  <Interview />
                </Protected>
              }
            />

            <Route
              path="/home/permission"
              element={
                <Protected>
                  <PermissionRequest />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
