// server run korlam

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.listen(config.PORT, "0.0.0.0", () => {
  console.log(`server is running on port ${config.PORT}`);
});
