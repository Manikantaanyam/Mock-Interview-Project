import { useState } from "react";
import { useRecoilValue } from "recoil";
import AccordionItem from "./Accordian";
import { dataAtom } from "../store/atoms/dataAtom";
import { Button } from "@/components/ui/button";

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
        <div className="w-[600px]  border shadow-md  p-4 h-[450px]">
          <h1 className="font-bold   text-2xl pb-10">Questions</h1>
          <div className="h-[200px]">
            {currentItems.map((item) => (
              <div key={item.id}>
                <h1>{item.techStack}</h1>

                <AccordionItem
                  title={item.question}
                  content={item.answer}
                  id={item.id}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="w-full p-2 mt-16 flex items-center justify-between">
            <Button
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
            </Button>

            <span>
              {" "}
              question {currentPage} of {totalPages}{" "}
            </span>

            <Button
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
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
