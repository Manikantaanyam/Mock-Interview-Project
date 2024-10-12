import axios from "axios";
import { useState } from "react";
import Camera from "./Cam";
import { useRecoilValue } from "recoil";
import LiveFeed from "./Livefeed";
import AccordionItem from "./Accordian";
import SpeechToText from "./Speech";
import { dataAtom } from "../store/atoms/dataAtom";
function Question() {
  const data = useRecoilValue(dataAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className=" ">
      <div>
        <div className="w-[600px] border shadow-md  p-4 h-[450px]">
          <h1 className="font-bold text-2xl pb-10">Questions</h1>
          <div className="h-[200px]">
            {currentItems.map((item, index) => (
              <div key={index}>
                <h1>{item.techStack}</h1>

                <AccordionItem
                  title={item.question}
                  content={
                    <>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {item.answer}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Check out this guide to learn how to{" "}
                        <a
                          href="/docs/getting-started/introduction/"
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          get started
                        </a>{" "}
                        and start developing websites even faster with
                        components on top of Tailwind CSS.
                      </p>
                    </>
                  }
                  id={index}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="w-full p-2 mt-16 flex items-center justify-between">
            <button
              className="border p-2 border-black"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <div className="flex gap-3 items-center">
                {" "}
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
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                <p>prev</p>
              </div>
            </button>

            <span>
              {" "}
              question {currentPage} of {totalPages}{" "}
            </span>

            <button
              className="border p-2 border-black"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <div className="flex gap-3 items-center">
                <p>Next</p>
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
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
