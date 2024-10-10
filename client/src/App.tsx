import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [jobRole, setJobRole] = useState("");
  const [techstack, setTechStack] = useState("");
  const [YOE, setYOE] = useState("");
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const hanldeData = async (e) => {
    e.preventDefault();
    const reponse = await axios.post(
      "http://127.0.0.1:8787/api/user/start",
      { jobRole, techStack: techstack, YOE },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJVU0VSIn0.VFUHXQh74o9BG7ZUVqvm5bkvAIs97pjT_A5cqgb86YM",
        },
      }
    );
    setData(reponse.data.actualResponse);
  };

  return (
    <div>
      <div>
        <form action="" onSubmit={hanldeData}>
          <input
            onChange={(e) => setJobRole(e.target.value)}
            type="text"
            placeholder="jobrole"
            name=""
            id=""
          />
          <br />
          <br />
          <input
            onChange={(e) => setTechStack(e.target.value)}
            type="text"
            placeholder="techstack"
          />{" "}
          <br /> <br />
          <input
            onChange={(e) => setYOE(e.target.value)}
            type="text"
            placeholder="YOE"
          />{" "}
          <br /> <br />
          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        <h1>Items</h1>
        <div>
          {currentItems.map((item, index) => (
            <div key={index}>
              <h2>{item.techstack}</h2>
              <p>{item.question}</p>
              <p>{item.answer}</p>
              <p>{item.source}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
