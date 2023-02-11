const mongoose = require("mongoose");
const app = require("./app");
const colors = require("colors");
const ProfileRouter = require("./controllers/ProfileRouter");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB || "mongodb+srv://nitin:nitin@cluster0.og3ncih.mongodb.net/test")
  .then(() => {
    console.log("Connected".red.bold);
  })
  .catch((err) => {
    console.log(err);
  });

const port = 5000;

app.use("/profile", ProfileRouter);

app.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}/`.blue.bold);
});
