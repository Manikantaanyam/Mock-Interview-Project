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
    <div className="grid grid-cols-2 gap-5 h-screen items-center">
      <div>
        <div>
          <h1>Items</h1>
          <div>
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
                {/* <h2>{item.techstack}</h2>
                <p>{item.question}</p>
                <p>{item.answer}</p>
                <p>{item.source}</p> */}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div>
            <button
              className="border p-2 border-black"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous question
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
              Next question
            </button>
          </div>
        </div>
      </div>
      <div>
        <LiveFeed />
        <SpeechToText />
      </div>
    </div>
  );
}

export default Question;
