import { getItem } from "@/session";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItem("token");
    const realToken = JSON.parse(token);
    if (!realToken) {
      navigate("/");
    }
  }, []);
  return <div>{children}</div>;
};

export default Protected;
