const express = require("express");
const mongoose = require("mongoose");
const cor = require("cors");
const pinRoute = require("./routes/pinRoute");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const app = express();
app.use(cor());
app.use(express.json());

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//connecting to database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.sn2gl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Database Connected Successfully");
  }
);
// .then((res) => {
//   console.log("Database Connected Successfully");
// })
// .catch((err) => console.log(err));

app.use("/api/pin", pinRoute);
app.use("/api/user", userRoute);
