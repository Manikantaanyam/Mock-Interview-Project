// AccordionItem.js
import { useState } from "react";

const AccordionItem = ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const textToSpeech = (title) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(title);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Hello");
    }
  };

  return (
    <div>
      <h2 id={`accordion-collapse-heading-${id}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium  focus:outline-none  rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl gap-3"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${id}`}
        >
          <button onClick={textToSpeech(title)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </button>
          <span className="text-black font-medium">{title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            } shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${id}`}
        className={`${isOpen ? "" : "hidden"}`}
        aria-labelledby={`accordion-collapse-heading-${id}`}
      >
        <div className="p-5 border h-[150px] overflow-scroll border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {content}
        </div>
      </div>
      {!isOpen ? (
        <div className="flex h-screen flex-col items-center">
          <div className="flex  items-center">
            <h1 className="mt-20 bg-black p-2 text-white rounded-full px-5">
              Don't look at the answer
            </h1>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AccordionItem;
