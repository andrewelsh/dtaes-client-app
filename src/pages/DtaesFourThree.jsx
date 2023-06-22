import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./page.css";
import Fuse from "fuse.js";

const DtaesFourThree = () => {
  const [wings, setWings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWings, setFilteredWings] = useState([]);
  const [filterOption, setFilterOption] = useState("default");

  useEffect(() => {
    fetch("https://dtaes-server-643f3f55ab8b.herokuapp.com/api/wings/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wings data");
        }
        return response.json();
      })
      .then((data) => {
        setWings(data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error state accordingly
      });
  }, []);

  useEffect(() => {
    filterWings();
  }, [filterOption, searchTerm, wings]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCancel = () => {
    setSearchTerm("");
    filterWings();
  };

  const isOverdue = (wing) => {
    return new Date() > new Date(wing.nextTaaAudit);
  };

  const isUpcoming = (wing) => {
    const nextTaaAudit = new Date(wing.nextTaaAudit);
    const today = new Date();
    const daysUntilNextAudit = Math.ceil(
      (nextTaaAudit - today) / (1000 * 60 * 60 * 24)
    );

    return daysUntilNextAudit <= 60 && daysUntilNextAudit > 0;
  };

  const filterWings = () => {
    let filtered = [];

    if (filterOption === "By Date") {
      filtered = wings.filter(
        (wing) => wing.nextTaaAudit !== null && wing.nextTaaAudit !== ""
      );
      filtered.sort((wing1, wing2) => {
        if (isOverdue(wing1)) {
          return -1;
        } else if (isOverdue(wing2)) {
          return 1;
        } else {
          const date1 = new Date(wing1.nextTaaAudit);
          const date2 = new Date(wing2.nextTaaAudit);
          return date1 - date2;
        }
      });
    } else if (filterOption === "Alphabetically") {
      filtered = wings.sort((wing1, wing2) =>
        wing1.name.localeCompare(wing2.name)
      );
    }

    if (filterOption === "default" && searchTerm.trim() !== "") {
      try {
        const fuse = new Fuse(wings, {
          keys: [
            "name",
            "location",
            "squadrons",
            "aircraft",
            "attachments",
            "recommendedHotels",
            "recommendedRestaurants",
            "notes",
          ],
          includeScore: true,
        });
        const searchResults = fuse.search(searchTerm);
        filtered = searchResults.map((result) => result.item);

        // Sort the filtered results by search score
        filtered.sort((a, b) => a.score - b.score);
      } catch (error) {
        console.error(error);
        filtered = [];
      }
    }

    setFilteredWings(filtered);
  };

  return (
    <div className="container">
      {/* Main title */}
      <h1 className="mt-5 mb-4">DTAES 4-3 Audits</h1>

      {/* Search bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Any Keyword ..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleCancel}
        >
          Reset
        </button>
      </div>

      {/* Filter options */}
      <div className="mb-3">
        <label htmlFor="filterOptions" className="form-label">
          Filter:
        </label>
        <select
          id="filterOptions"
          className="form-select"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="default">-- Search Bar --</option>
          <option value="By Date">By Date</option>
          <option value="Alphabetically">Alphabetically</option>
        </select>
      </div>

      {/* Wings / Squadron list */}
      {filteredWings.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredWings.map((wing) => (
            <div className="col" key={wing._id}>
              <Link
                to={`/wing/${encodeURIComponent(wing.name)}`}
                className="text-decoration-none"
              >
                <div
                  className={`card h-100 ${
                    isOverdue(wing)
                      ? "border border-danger"
                      : isUpcoming(wing)
                      ? "border border-warning"
                      : ""
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title">{wing.name}</h5>
                    <p className="card-text">Location: {wing.location}</p>
                    <p className="card-text">
                      Squadrons: {wing.squadrons.join(", ")}
                    </p>
                    <p className="card-text">
                      Aircraft: {wing.aircraft.join(", ")}
                    </p>
                    {isOverdue(wing) && (
                      <div className="custom-message">
                        <p>Technical Airworthiness Audit Overdue!</p>
                      </div>
                    )}
                    {isUpcoming(wing) && (
                      <div className="custom-message caution-message">
                        <p>Next TAA Audit less than 60 days away</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-wings-text">
          {searchTerm ? (
            <>
              Sorry, nothing was found in your search. Try using a different
              keyword ☹
              <br />
              <br />
            </>
          ) : (
            <>
              <i>Search Any Keyword Or Use The Filters.</i>
              <br />
              <br />
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default DtaesFourThree;
