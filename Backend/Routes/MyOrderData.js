const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (err) {
    console.log(err.message);
    res.send("Server Error", err.message);
  }
});
module.exports = router;
