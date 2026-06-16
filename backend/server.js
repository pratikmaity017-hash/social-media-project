// server run korlam

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(3000, "0.0.0.0", () => {
  console.log("server is running on port 3000");
});
