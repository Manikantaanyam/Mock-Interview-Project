import From from "@/component/From";
import { useState } from "react";
const Dashboard = () => {
  const [isJobFrom, setIsJobForm] = useState(false);

  return (
    <div className="overflow-y-hidden">
      <div className="p-8">
        <div>
          {isJobFrom ? (
            <From />
          ) : (
            <div
              onClick={() => {
                setIsJobForm((p) => !p);
              }}
              className="w-[300px] cursor-pointer border shadow-md flex justify-center items-center h-[150px] text-xl p-4 text-black hover:scale-100"
            >
              create interview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
