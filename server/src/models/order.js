const mongoose = require('mongoose');

// Define the schema
const orderSchema = new mongoose.Schema({
  RecordType: String,
  PONumber: String,
  PONumber_1: String,
  PONumber_2: String,
  Chg: String,
  Com: String,
  Type: String,
  Conf: String,
  OrderDate: String,
  Buyer: String,
  AccountNumber: String,
  Supplier: String,
  Curr: String,
  Item: Number,
  CommodityCode: String,
  Description: String,
  Qty: Number,
  Un: String,
  OrderValue: Number,
  AmountInvoiced: Number,
  WBSCode: String,
  Contract: String,
  Remarks: String
});

// Create a Mongoose model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
