import { Navbar } from "@/component/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="w-[300px] cursor-pointer border shadow-md flex justify-center items-center h-[150px] text-xl p-4 text-black hover:scale-100">
          create interview
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
