const express = require("express");
const mongoDB = require("./dataBase");
const app = express();
const port = 4000;
mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/OrderData"));
//app.use("/api", require("./Routes/MyOrderData"));
app.listen(port, () => {
  console.log(`Index.js file is running on port ${port}`);
});
