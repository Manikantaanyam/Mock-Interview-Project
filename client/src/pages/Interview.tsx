import LiveFeed from "@/component/Livefeed";
import Question from "@/component/Question";

const Interview = () => {
  return (
    <div className="grid h-[calc(100vh-70px)] grid-cols-2 p-8 overflow-y-hidden">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center ">
          <Question />
        </div>
      </div>
      <div className="flex flex-col  items-center ">
        <div className="flex justify-center">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
};

export default Interview;
