import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const RepoDetail = () => {
  const { repoName } = useParams(); // Get the repoName from the URL params
  const [repoDetails, setRepoDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for the single repository using the repoName
    fetch(`https://api.github.com/repos/prisca-01/${repoName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch repository data");
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          setRepoDetails(result);
        },
        (err) => {
          console.log(err);
          setError(err);
        }
      );
  }, [repoName]);

  if (error) {
    throw error;
  }

  if (!repoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-900">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg font-semibold">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Repository Details
          </h1>
          <p>Created at: {repoDetails.created_at}</p>
          <p>Default: {repoDetails.default_branch}</p>
          <p>Description: {repoDetails.description}</p>
          <p>Forks: {repoDetails.forks}</p>
          <p>Full_name: {repoDetails.full_name}</p>
          <p>Git url: {repoDetails.git_url}</p>
          <p>
            Go to:{" "}
            <a
              href={repoDetails.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repoDetails.html_url}
            </a>
          </p>
          <p>Homepage: {repoDetails.homepage}</p>
          <p>id: {repoDetails.id}</p>
          <p>Language: {repoDetails.language}</p>
          <p>Languages_url: {repoDetails.languages_url}</p>
          <p>Name: {repoDetails.name}</p>
          <p>Pushed at: {repoDetails.pushed_at}</p>
          <p>Visibility: {repoDetails.visibility}</p>
          <Button class="bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 flex justify-center items-center">
          <Link
            to="/"
            className=" md:text-xl text-white text-center hover:underline"
          >
            Back to homepage
          </Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default RepoDetail;
