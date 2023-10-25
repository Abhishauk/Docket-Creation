const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const XLSX = require("xlsx");
const Order = require("./models/order");
const app = express();
const cors = require("cors");
const Docket = require("./models/docket");
dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch(error => console.log(`${error} did not connect`));

const workbook = XLSX.readFile("myexcel.xlsx");
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

function removeNonAlphanumericCharsFromKeys(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/[^a-zA-Z0-9_]/g, "");
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}

const transformedData = data.map(removeNonAlphanumericCharsFromKeys);

// console.log(transformedData);

// Order.insertMany(transformedData)
app.use(express.json());
app.use(cors());
app.get("/orders", async (req, res) => {
  await Order.aggregate([
    {
      $match: {
        Supplier: { $ne: "" }
      }
    },
    {
      $project: {
        Supplier: 1,
        _id: 0
      }
    }
  ])
    .limit(100)
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/purchase-orders", async (req, res) => {
  const supplier = req.query.supplier;

  const purchaseOrders = await Order.aggregate([
    {
      $match: {
        Supplier: supplier
      }
    }
  ]);

  res.json(purchaseOrders);
});
app.post("/save-docket", async (req, res) => {
  try {
    const docketData = req.body;

    if (!docketData) {
      throw new Error("Docket data is missing or invalid.");
    }

    const newDocket = new Docket(docketData);

    await newDocket.save();

    console.log("Data saved successfully.");
    return res.status(200).json({ message: "Docket data saved successfully" });
  } catch (error) {
    console.error("error", error);
    return res
      .status(500)
      .json({ error: "An error occurred while saving the docket data." });
  }
});
