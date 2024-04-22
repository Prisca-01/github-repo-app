import React, { useState, useEffect } from "react";
import "./App.css";
import MyCard from "./components/myCard";
import ReactPaginate from "react-paginate";

const text = "This Project has No Description from the Github repo";

function App() {
  const [repoData, setRepoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch repo data about the GitHub user
    fetch("https://api.github.com/users/prisca-01/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setRepoData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  };

  // Filter repository data based on search query
  const filteredRepoData = repoData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredRepoData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredRepoData.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <p className="text-3xl font-bold text-center p-5">My GitHub Repos </p>
      <div className="flex justify-center mb-5">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-3 gap-10 p-10">
        {currentPageData.map((item) => (
          <MyCard
            key={item.id}
            Title={item.name}
            description={item.description ? null : text}
            created={formatDate(item.created_at)} // Format the created date
          />
        ))}
      </div>
      <div className="flex justify-center mb-10 pb-10 border-t pt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"inline-block m-2"}
          previousClassName={"inline-block m-2"}
          nextClassName={"inline-block m-2"}
          breakClassName={"inline-block m-2"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          previousLinkClassName={"border px-3 py-1 rounded-lg"}
          nextLinkClassName={"border px-3 py-1 rounded-lg"}
          breakLinkClassName={"border px-3 py-1 rounded-lg"}
          pageLinkClassName={"border px-3 py-1 rounded-lg"}
        />
      </div>
    </div>
  );
}

export default App;
