// AccordionItem.js
import React, { useState } from "react";

const AccordionItem = ({ title, content, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
            <h1 className="mt-20">Don't look at the answer</h1>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AccordionItem;
