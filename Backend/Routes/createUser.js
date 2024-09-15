const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Iwanttobecomeasuccessfullman";

//For signup
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body(
      "password",
      "password length should be greater than 6 character"
    ).isLength({ min: 6 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(
      req.body.name,
      req.body.password,
      req.body.location,
      req.body.email
    );
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email,
      });
      res.json({ succes: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
//For login 
router.post(
  "/loginuser",
  [
    body("email", "Email not match").isEmail(),
    body("password", "password not match").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Credentials are not correct" });
      }
      const passwordComapre = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!passwordComapre) {
        return res.status(400).json({ errors: "Credentials are not correct" });
      }
      const datas = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(datas, jwtSecret);
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
     console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
