import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TrackerPage = () => {
  const [observations, setObservations] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [members, setMembers] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [extensionDate, setExtensionDate] = useState(null);
  const [capFollowup, setCapFollowup] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleAddObservation = (e) => {
    e.preventDefault();

    const newObservation = {
      text,
      members: members.split(",").map((member) => member.trim()),
      dueDate,
      extensionDate,
      capFollowup,
      additionalNotes,
    };

    if (editingIndex === -1) {
      setObservations([...observations, newObservation]);
    } else {
      const updatedObservations = [...observations];
      updatedObservations[editingIndex] = newObservation;
      setObservations(updatedObservations);
      setEditingIndex(-1);
    }

    resetForm();
  };

  const handleEditObservation = (index) => {
    const observation = observations[index];
    setText(observation.text);
    setMembers(observation.members.join(", "));
    setDueDate(observation.dueDate);
    setExtensionDate(observation.extensionDate);
    setCapFollowup(observation.capFollowup);
    setAdditionalNotes(observation.additionalNotes);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteObservation = (index) => {
    if (window.confirm("Are you sure you want to delete this observation?")) {
      const updatedObservations = [...observations];
      updatedObservations.splice(index, 1);
      setObservations(updatedObservations);
    }
  };

  const resetForm = () => {
    setText("");
    setMembers("");
    setDueDate(null);
    setExtensionDate(null);
    setCapFollowup(false);
    setAdditionalNotes("");
    setEditingIndex(-1);
    setShowForm(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {showForm ? (
            <form onSubmit={handleAddObservation}>
              <h2>
                {editingIndex === -1
                  ? "Create a New Observaton"
                  : "Edit Observation"}
              </h2>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Observation Text:
                </label>
                <textarea
                  id="text"
                  className="form-control"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="ex. A001 - Work Intstuctions ..."
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="members" className="form-label">
                  Members:
                </label>
                <input
                  id="members"
                  type="text"
                  className="form-control"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  required
                />
                <small className="form-text text-muted">
                  Enter member names separated by commas (e.g., John Doe, Jane
                  Smith)
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date:
                </label>
                <br />
                <DatePicker
                  id="dueDate"
                  className="form-control"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select due date"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="extensionDate" className="form-label">
                  Extension Date:
                </label>
                <br />
                <DatePicker
                  id="extensionDate"
                  className="form-control"
                  selected={extensionDate}
                  onChange={(date) => setExtensionDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select extension date"
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  id="capFollowup"
                  type="checkbox"
                  className="form-check-input"
                  checked={capFollowup}
                  onChange={(e) => setCapFollowup(e.target.checked)}
                />
                <label htmlFor="capFollowup" className="form-check-label">
                  CAP Follow-up Required
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="additionalNotes" className="form-label">
                  Additional Notes:
                </label>
                <textarea
                  id="additionalNotes"
                  className="form-control"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>

              <div>
                <button type="submit" className="btn btn-primary">
                  {editingIndex === -1 ? "Add" : "Update"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              {!showForm && (
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    Add Observation
                  </button>
                </div>
              )}

              {observations.length === 0 ? (
                <p className="mt-5">
                  No observations found. Add an observation selecting the button
                  above.
                </p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Observation</th>
                      <th>Members</th>
                      <th>Due Date</th>
                      <th>Extension Date</th>
                      <th>CAP Follow-up</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {observations.map((observation, index) => (
                      <tr key={index}>
                        <td>{observation.text}</td>
                        <td>{observation.members.join(", ")}</td>
                        <td>{observation.dueDate?.toLocaleDateString()}</td>
                        <td>
                          {observation.extensionDate?.toLocaleDateString()}
                        </td>
                        <td>{observation.capFollowup ? "Yes" : "No"}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEditObservation(index)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteObservation(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
