const mongoose = require("mongoose");
const app = require("./app");
const colors = require("colors");
const ProfileRouter = require("./controllers/ProfileRouter");
require("dotenv/config");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected".red.bold);
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT;

// app.use("/profile", ProfileRouter);

app.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}/`.blue.bold);
});
