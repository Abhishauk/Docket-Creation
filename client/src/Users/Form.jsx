import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [message, setMessage] = useState("");
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [purchaseOrderOptions, setPurchaseOrderOptions] = useState([]);
  const handleSubmit = () => {
    if (
      !name ||
      !startTime ||
      !endTime ||
      isNaN(hoursWorked) ||
      isNaN(ratePerHour) ||
      !supplierName ||
      !purchaseOrder
    ) {
      setMessage("Please fill in all fields.");
    } else {
      const data = {
        name,
        startTime,
        endTime,
        hoursWorked,
        ratePerHour,
        supplierName,
        purchaseOrder
      };

      axios({
        method: "post",
        url: "http://localhost:5000/save-docket",
        data: data
      })
        .then((response) => {
          console.log("aaa", response);
          setMessage("Docket data saved successfully.");
          var form = document.getElementById("myForm");
          form.reset();
          setName("");
          setStartTime("");
          setEndTime("");
          setHoursWorked("");
          setRatePerHour("");
          setSupplierName("");
          setPurchaseOrder("");
        })
        .catch((error) => {
          console.error(error);
          setMessage("An error occurred while saving the docket data.");
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        console.log("Supplier data:", response.data);
        setSupplierOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleSupplierChange = (selectedSupplier) => {
    setSupplierName(selectedSupplier);

    axios
      .get(`http://localhost:5000/purchase-orders?supplier=${selectedSupplier}`)
      .then((response) => {
        setPurchaseOrderOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="form-container">
        <h1 className="form-heading">Create a Docket</h1>
        <form className="form" id="myForm">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime" className="form-label">
              Start Time:
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime" className="form-label">
              End Time:
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hoursWorked" className="form-label">
              No. of Hours Worked:
            </label>
            <input
              type="number"
              id="hoursWorked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ratePerHour" className="form-label">
              Rate per Hour:
            </label>
            <input
              type="number"
              step="0.01"
              id="ratePerHour"
              value={ratePerHour}
              onChange={(e) => setRatePerHour(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplierName" className="form-label">
              Supplier Name:
            </label>
            <select
              id="supplierName"
              value={supplierName}
              onChange={(e) => handleSupplierChange(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select a Supplier</option>
              {supplierOptions.map((supplier) => (
                <option key={supplier.id} value={supplier.Supplier}>
                  {supplier.Supplier}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="purchaseOrder" className="form-label">
              Purchase Order:
            </label>
            <select
              id="purchaseOrder"
              value={purchaseOrder}
              onChange={(e) => setPurchaseOrder(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select a Purchase Order</option>
              {purchaseOrderOptions.map((po) => (
                <option key={po} value={po}>
                  {po.PONumber} - {po.Description}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button
              type="button"
              onClick={handleSubmit}
              className="form-button"
            >
              Create Docket
            </button>
          </div>
        </form>
        <div
          id="message"
          className="form-message"
          dangerouslySetInnerHTML={{ __html: message }}
        ></div>
      </div>
    </div>
  );
}

export default App;
