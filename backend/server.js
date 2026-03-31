require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();


app.use(cors({
  origin: "https://mini-project-omega-mauve.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});