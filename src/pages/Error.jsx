import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after a delay of 3 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/"); // Replace "/" with the desired URL to redirect to
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout); // Clear the timeout when the component unmounts
    };
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="error-heading">Server Error 500</h1>
      <p className="error-message">
        We apologize for the inconvenience. Attachments are not yet implemented.
      </p>
      <p className="error-tip">
        Please try again later or contact support for further assistance.
      </p>
    </div>
  );
};

export default Error;
