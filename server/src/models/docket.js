const mongoose = require('mongoose');

// Define a schema for the docket
const docketSchema = new mongoose.Schema({
  name: String,
  startTime: String,
  endTime: String,
  hoursWorked: Number,
  ratePerHour: Number,
  supplierName: String,
  purchaseOrder: String,
 
});

// Create a model based on the schema
const Docket = mongoose.model('Docket', docketSchema);

module.exports = Docket;
