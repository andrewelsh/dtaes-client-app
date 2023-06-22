import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-light text-center text-muted py-2 mt-auto"
      style={{ height: "130px" }}
    >
      <div className="container d-flex justify-content-end align-items-center h-100">
        <p className="me-auto">
          For more information about the Technical Airworthiness Program, please
          contact DTAES 2-2: by email, or by phone, at: +1-613-808-3408 &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <img
          src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
          alt="Symbol of the Government of Canada"
          className="gov-canada-logo align-self-end"
          width="100"
          height="100"
        />
      </div>
    </footer>
  );
};

export default Footer;
