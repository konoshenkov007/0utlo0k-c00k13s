import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content px-4 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-base-content/70">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => window.open('https://outlook.com', 'noopener,noreferrer')}
          className="cursor-pointer inline-flex items-center justify-center rounded-[.33333em] px-4 py-2 bg-[#115ea3] text-white font-bold text-sm transition-colors duration-300 hover:bg-[#114ba3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fe6e00]"
        >
          Go Back
        </button>



      </div>
    </>
  );
};
