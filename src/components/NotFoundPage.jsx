import React from "react";
import { Link } from "react-router-dom";
import 'tailwindcss/tailwind.css';


const NotFound = () => {
  return (
    <div className="not-found min-h-screen flex flex-col items-center justify-center bg-blue-900">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          404 - Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-800 text-center mb-4">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="text-lg md:text-xl text-blue-700 text-center hover:underline">
          Back to homepage...
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
