// RepoDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RepoDetail = () => {
  const { repoId } = useParams(); // Get the repoId from the URL params
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    // Fetch data for the single repository using the repoId
    fetch(`https://api.github.com/repositories/${repoId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setRepoDetails(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [repoId]);

  if (!repoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{repoDetails.name}</h2>
      <p>{repoDetails.description}</p>
      <p>Created at: {repoDetails.created_at}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RepoDetail;
