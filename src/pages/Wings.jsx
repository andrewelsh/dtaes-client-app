import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./page.css";
import Budget from "./Budget";
import Documents from "./Documents";
import Observations from "./Observations";

const Wings = () => {
  const { name } = useParams();
  const [wing, setWing] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedWing, setUpdatedWing] = useState(null); // Initialize as null
  const [isOverdue, setIsOverdue] = useState(false);
  const [attachmentsInputKey, setAttachmentsInputKey] = useState(Date.now()); // Unique key for file input
  const [activeTab, setActiveTab] = useState("details"); // Track the active tab

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    fetch(`https://dtaes-server-643f3f55ab8b.herokuapp.com/api/wings/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wing data");
        }
        return response.json();
      })
      .then((data) => {
        setWing(data);
        const currentDate = new Date();
        const nextTaaAuditDate = new Date(data.nextTaaAudit);
        setIsOverdue(currentDate > nextTaaAuditDate);
        setUpdatedWing({
          ...data,
          nextTaaAudit: data.nextTaaAudit ? new Date(data.nextTaaAudit) : null,
        }); // Initialize updatedWing state
      })
      .catch((error) => {
        console.error(error);
        // Handle the error state accordingly
      });
  }, [name]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setUpdatedWing((prevWing) => ({
      ...prevWing,
      nextTaaAudit: prevWing.nextTaaAudit
        ? new Date(prevWing.nextTaaAudit)
        : null,
    }));
    setAttachmentsInputKey(Date.now()); // Reset file input key
  };

  const handleSave = () => {
    // Make the PUT request to update the wing data
    fetch(
      `https://dtaes-server-643f3f55ab8b.herokuapp.com/api/wings/${wing._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWing),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update wing data");
        }
        setWing(updatedWing);
        setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error state accordingly
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "squadrons" ||
      name === "aircraft" ||
      name === "attachments" ||
      name === "recommendedHotels" ||
      name === "recommendedRestaurants"
    ) {
      setUpdatedWing((prevWing) => ({
        ...prevWing,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else if (name === "notes") {
      setUpdatedWing((prevWing) => ({
        ...prevWing,
        notes: value.split("\n"),
      }));
    } else {
      setUpdatedWing((prevWing) => ({
        ...prevWing,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setUpdatedWing((prevWing) => ({
      ...prevWing,
      nextTaaAudit: date,
    }));
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const updatedAttachments = [...updatedWing.attachments];

    // Iterate over selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Add file to the updatedAttachments array
      updatedAttachments.push(file.name);

      // Create a new FormData instance
      const formData = new FormData();
      formData.append("file", file);

      // Send the file to the server (replace '/api/upload' with your upload endpoint)
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server (if needed)
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          // Handle any errors that occur during the upload process
          console.error("Error uploading file:", error);
        });
    }

    // Update the attachments in the updatedWing state
    setUpdatedWing((prevWing) => ({
      ...prevWing,
      attachments: updatedAttachments,
    }));
  };

  const handleDownloadFile = (filename) => {
    window.open(`/api/attachments/${filename}`, "_blank");
  };

  const handleDeleteAttachment = (attachment) => {
    const updatedAttachments = updatedWing.attachments.filter(
      (item) => item !== attachment
    );
    setUpdatedWing((prevWing) => ({
      ...prevWing,
      attachments: updatedAttachments,
    }));
  };

  // Handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      <div className="mt-4">
        {!wing ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="mb-4">
              Wing: <span className="text-primary">{wing.name}</span>
            </h2>
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "details" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("details")}
                >
                  Details
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "attachments" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("attachments")}
                >
                  Observation
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "budget" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("budget")}
                >
                  Budget
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "documents" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("documents")}
                >
                  Documents
                </button>
              </li>
              {/* Add more tabs as needed */}
            </ul>
            {activeTab === "details" && <div></div>}
            {activeTab === "attachments" && <Observations {...wing} />}

            {activeTab === "budget" && <Budget {...wing} />}
            {activeTab === "documents" && <Documents {...wing} />}
            {activeTab === "details" && (
              <>
                {!editMode && (
                  <>
                    <div className="mb-4">
                      <strong>Next TAA Audit:</strong>{" "}
                      <span
                        className={`text-${isOverdue ? "danger" : "success"}`}
                      >
                        {formatDate(wing.nextTaaAudit)}
                      </span>
                    </div>
                    <div className="mb-4">
                      <strong>City:</strong> {wing.location}
                    </div>
                    <div className="mb-4">
                      <strong>Squadrons:</strong>{" "}
                      {wing.squadrons.map((squadron, index) => (
                        <span key={index} className="badge bg-secondary me-1">
                          {squadron}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4">
                      <strong>Aircraft:</strong>{" "}
                      {wing.aircraft.map((aircraft, index) => (
                        <span key={index} className="badge bg-secondary me-1">
                          {aircraft}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4">
                      <strong>Recommended Hotels:</strong>{" "}
                      {wing.recommendedHotels.map((hotel, index) => (
                        <span key={index} className="badge bg-secondary me-1">
                          {hotel}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4">
                      <strong>Recommended Restaurants:</strong>{" "}
                      {wing.recommendedRestaurants.map((restaurant, index) => (
                        <span key={index} className="badge bg-secondary me-1">
                          {restaurant}
                        </span>
                      ))}
                    </div>
                    {wing.attachments.length > 0 && (
                      <div>
                        <strong>Attachments:</strong>
                        {wing.attachments.map((attachment, index) => (
                          <div key={index}>
                            <button
                              className="btn btn-link"
                              onClick={() => handleDownloadFile(attachment)}
                            >
                              {attachment}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mb-4">
                      <strong>Notes:</strong>
                      <ul>
                        {wing.notes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <Link to="/section/4-3" className="btn btn-secondary">
                      Back
                    </Link>
                  </>
                )}
                {editMode && (
                  <>
                    <div className="mb-4">
                      <strong>Next TAA Audit:</strong>
                      <DatePicker
                        selected={updatedWing.nextTaaAudit}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>City:</strong>
                      <input
                        type="text"
                        name="city"
                        value={updatedWing.location}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Squadrons:</strong>
                      <input
                        type="text"
                        name="squadrons"
                        value={updatedWing.squadrons.join(", ")}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Aircraft:</strong>
                      <input
                        type="text"
                        name="aircraft"
                        value={updatedWing.aircraft.join(", ")}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Recommended Hotels:</strong>
                      <input
                        type="text"
                        name="recommendedHotels"
                        value={updatedWing.recommendedHotels.join(", ")}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Recommended Restaurants:</strong>
                      <input
                        type="text"
                        name="recommendedRestaurants"
                        value={updatedWing.recommendedRestaurants.join(", ")}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Notes:</strong>
                      <textarea
                        name="notes"
                        value={updatedWing.notes.join("\n")}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Attachments:</strong>
                      {updatedWing.attachments.map((attachment, index) => (
                        <div key={index} className="mb-2">
                          <button
                            className="btn btn-link p-0 me-2"
                            onClick={() => handleDownloadFile(attachment)}
                          >
                            {attachment}
                          </button>
                          <button
                            className="btn btn-link p-0 text-danger"
                            onClick={() => handleDeleteAttachment(attachment)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <input
                        key={attachmentsInputKey}
                        type="file"
                        onChange={handleFileUpload}
                        multiple
                        className="form-control"
                      />
                    </div>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <Link to="/section/4-3" className="btn btn-secondary">
                      Back
                    </Link>
                  </>
                )}
              </>
            )}
            {activeTab === "attachments" && <div></div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Wings;
