import React from "react";
import { Link } from "react-router-dom";
import "./page.css"; // Import custom CSS file for additional styles

const MainPage = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-5" id="title">
        DTAES
      </h1>
      <h3 id="subtitle">Help Manage and Orginize Your Work Online.</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                4-1: Assignment of Technical Airworthiness Authority
              </h5>
              <Link to="/section/4-1" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                4-2: Quality Management System Requirements
              </h5>
              <Link to="/section/4-2" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">4-3: Military Standards</h5>
              <Link to="/section/4-3" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">4-4: Acceptable Organizations</h5>
              <Link to="/section/4-4" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">4-5: Industry Standards</h5>
              <Link to="/section/4-5" className="stretched-link"></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
