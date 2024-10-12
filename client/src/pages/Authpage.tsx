import { ReactNode } from "react";

const Authpage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex  items-center h-screen justify-center">{children}</div>
  );
};

export default Authpage;
