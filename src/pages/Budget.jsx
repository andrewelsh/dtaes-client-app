import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import data from "../data";
import "./page.css";

const BudgetPage = (props) => {
  const [perDiemRate, setPerDiemRate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(props.location); // City name received from props
  const [clickedItems, setClickedItems] = useState([]);
  const [dateError, setDateError] = useState("");

  const { airForceBases } = data;

  const extractPerDiemRate = () => {
    const matchedBase = airForceBases.find((base) => base.city === city);
    if (matchedBase) {
      setPerDiemRate(matchedBase.rates);
      setProvince(matchedBase.province);
    } else {
      setPerDiemRate(null);
      setProvince(null);
    }
  };

  const calculateTotalAmount = () => {
    if (startDate && endDate && perDiemRate) {
      const { breakfast, lunch, dinner } = perDiemRate;
      const perDiemTotal = (breakfast + lunch + dinner) * getDuration();
      const incidentals = 17.5 * getDuration();
      const carRentalBudget = 100 * getDuration();
      const hotelBudget = 150 * getDuration();
      const flightBudget = 1500;
      let total =
        perDiemTotal +
        incidentals +
        carRentalBudget +
        hotelBudget +
        flightBudget;

      // Subtract clicked items from the total
      clickedItems.forEach((item) => {
        if (item === "perDiemTotal") total -= perDiemTotal;
        else if (item === "incidentals") total -= incidentals;
        else if (item === "carRentalBudget") total -= carRentalBudget;
        else if (item === "hotelBudget") total -= hotelBudget;
        else if (item === "flightBudget") total -= flightBudget;
      });

      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  };

  const getDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = Math.ceil((end - start + 1) / (1000 * 60 * 60 * 24));
      return duration;
    }
    return 0;
  };

  useEffect(() => {
    extractPerDiemRate();
  }, [city]);

  useEffect(() => {
    calculateTotalAmount();
  }, [startDate, endDate, perDiemRate, clickedItems]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setDateError("Start date cannot be later than the end date");
    } else {
      setDateError("");
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setDateError("End date cannot be earlier than the start date");
    } else {
      setDateError("");
    }
  };

  const handleItemClick = (item) => {
    if (clickedItems.includes(item)) {
      // Item is already clicked, remove it from the clickedItems array
      const updatedItems = clickedItems.filter((i) => i !== item);
      setClickedItems(updatedItems);
    } else {
      // Item is not clicked, add it to the clickedItems array
      setClickedItems([...clickedItems, item]);
    }
  };

  return (
    <div className="container mt-5">
      {perDiemRate ? (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Per Diem Rates For {city}</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Breakfast</th>
                      <th scope="col">Lunch</th>
                      <th scope="col">Dinner</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        onClick={() => handleItemClick("perDiemTotal")}
                        className={
                          clickedItems.includes("perDiemTotal")
                            ? "clicked-item"
                            : ""
                        }
                      >
                        ${perDiemRate.breakfast.toFixed(2)}
                      </td>
                      <td
                        onClick={() => handleItemClick("perDiemTotal")}
                        className={
                          clickedItems.includes("perDiemTotal")
                            ? "clicked-item"
                            : ""
                        }
                      >
                        ${perDiemRate.lunch.toFixed(2)}
                      </td>
                      <td
                        onClick={() => handleItemClick("perDiemTotal")}
                        className={
                          clickedItems.includes("perDiemTotal")
                            ? "clicked-item"
                            : ""
                        }
                      >
                        ${perDiemRate.dinner.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Travel Dates</h5>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <DatePicker
                    id="startDate"
                    className="form-control"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <DatePicker
                    id="endDate"
                    className="form-control"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="MMMM d, yyyy"
                  />
                  {dateError && <p className="text-danger">{dateError}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No per diem rates available for {city}.</p>
      )}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Cost Estimate</h5>
          <hr />
          {totalAmount > 0 ? (
            <div>
              <p className="mb-3" id="text-strikethough">
                <strong>Per Diem Total:</strong>{" "}
                <span
                  onClick={() => handleItemClick("perDiemTotal")}
                  className={
                    clickedItems.includes("perDiemTotal") ? "clicked-item" : ""
                  }
                >
                  $
                  {perDiemRate &&
                    (
                      perDiemRate.breakfast +
                      perDiemRate.lunch +
                      perDiemRate.dinner
                    ).toFixed(2)}{" "}
                  x {getDuration()} days = $
                  {(
                    perDiemRate &&
                    (perDiemRate.breakfast +
                      perDiemRate.lunch +
                      perDiemRate.dinner) *
                      getDuration()
                  ).toFixed(2)}
                </span>
              </p>
              <p className="mb-3" id="text-strikethough">
                <strong>Incidentals:</strong>{" "}
                <span
                  onClick={() => handleItemClick("incidentals")}
                  className={
                    clickedItems.includes("incidentals") ? "clicked-item" : ""
                  }
                >
                  $17.50 x {getDuration()} days = $
                  {(17.5 * getDuration()).toFixed(2)}
                </span>
              </p>
              <p className="mb-3" id="text-strikethough">
                <strong>Car Rental:</strong>{" "}
                <span
                  onClick={() => handleItemClick("carRentalBudget")}
                  className={
                    clickedItems.includes("carRentalBudget")
                      ? "clicked-item"
                      : ""
                  }
                >
                  $100.00 x {getDuration()} days = $
                  {(100 * getDuration()).toFixed(2)}
                </span>
              </p>
              <p className="mb-3" id="text-strikethough">
                <strong>Hotel:</strong>{" "}
                <span
                  onClick={() => handleItemClick("hotelBudget")}
                  className={
                    clickedItems.includes("hotelBudget") ? "clicked-item" : ""
                  }
                >
                  $150.00 x {getDuration()} days = $
                  {(150 * getDuration()).toFixed(2)}
                </span>
              </p>
              <p className="mb-3" id="text-strikethough">
                <strong>Flight:</strong>{" "}
                <span
                  onClick={() => handleItemClick("flightBudget")}
                  className={
                    clickedItems.includes("flightBudget") ? "clicked-item" : ""
                  }
                >
                  $1500.00
                </span>
              </p>
              <hr />
              <p className="mt-3">
                <strong>Total Amount:</strong>{" "}
                <span style={{ color: "green" }}>
                  ${totalAmount.toFixed(2)}
                </span>
              </p>
            </div>
          ) : (
            <p>
              <i>
                No total amount available. Make sure you've selected your start
                and end dates.
              </i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
