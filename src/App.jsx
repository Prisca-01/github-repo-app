import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyCard from "./components/myCard";
import RepoDetail from "./components/MyRepoDetail";
import ReactPaginate from "react-paginate";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFoundPage";
import "tailwindcss/tailwind.css";

function App() {
  const [repoData, setRepoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch repo names
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/prisca-01/repos",
          {
            headers: {
              Authorization: "",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repository names");
        }
        const data = await response.json();
        setRepoData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRepoData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  // Filter
  const filteredRepoData = repoData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredRepoData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredRepoData.slice(offset, offset + itemsPerPage);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="bg-blue-900 text-white min-h-screen py-12 px-4">
              <p className="text-3xl font-bold text-center mb-8">
                My GitHub Repos
              </p>
              <div className="flex justify-center mb-5">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 mb-8 text-black"
                />
              </div>
              {error ? (
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <p className="text-red-500 text-lg font-bold mb-2">
                      Something went wrong.
                    </p>
                    <p className="text-gray-100">{error}</p>
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentPageData.map((item) => (
                      <MyCard key={item.id} Title={item.name} />
                    ))}
                  </div>
                  <div className="flex justify-center my-10">
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
                </React.Fragment>
              )}
            </div>
          }
        />
        <Route
          path="/repo/:repoName"
          element={
            <ErrorBoundary>
              <RepoDetail />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
