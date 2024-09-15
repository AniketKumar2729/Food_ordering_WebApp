const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  console.log(data);
  await data.splice(0, 0, { Order_date: req.body.order_date });
  // is email is not present in db then create and if present insertMany()
  let emailID = await Order.findOne({ email: req.body.email });
  console.log(emailID);
  if (emailID === null) {
    try {
      await Order.create({ email: req.body.email, order_data: [data] }).then(
        () => {
          res.json({ success: true });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.send("Server Error", err.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (err) {
      console.log(err.message);
      res.send("Server Error", err.message);
    }
  }
});
router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ 'email': req.body.email });
    res.json({ orderData: myData });
  } catch (err) {
    console.log(err.message);
    res.send("Server Error", err.message);
  }
});
module.exports = router;
