const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const itemRoutes = require("./routes/productsRoutes");

dotenv.config();
const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use("/api/product", itemRoutes);
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});