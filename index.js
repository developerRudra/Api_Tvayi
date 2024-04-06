const express = require("express");
const app = express();
const http = require("http").createServer(app);
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { permissions } = require("./src/helper/permission");
const { role } = require("./src/helper/userRole");
const User = require("./src/models/userModel");
const Brand = require("./src/models/brandModel");
const Tax = require("./src/models/taxModel");

require("dotenv").config();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json({ limit: "10mb" })); // Adjusted body size limit

mongoose.set("strictQuery", true);

// Set up the database connection
mongoose
  .connect("mongodb+srv://tvayi:tvayi@cluster0.fk22sge.mongodb.net/", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to database");
    createFunction();
    // Call your initial function here if needed
  })
  .catch((err) => {
    console.error(err.message);
  });

// Serve static files
app.use("/", express.static(__dirname + "/components"));

app.use("/api", require("./src/routes/userRoute"));
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found..." });
});

// Start the server
const PORT = process.env.PORT || 4000; // Added a default port
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function createFunction() {
  try {
    const count = await User.countDocuments({ role: role.admin });
    const count1 = await Brand.countDocuments({ name: "TVAYI" });
    const count2 = await Tax.countDocuments();
    if (count === 0) {
      const hash = bcrypt.hashSync("tvayi@2023", 10);
      await User.create({
        email: "admin@tvayi.com",
        password: hash,
        permissions: permissions.all,
        role: role.admin,
      });
      // console.log("User created successfully.", user);
    }
    if (count1 === 0) {
      await Brand.create({
        image: "",
        name: "TVAYI",
      });
      // console.log("brand created successfully.", brand);
    } 
    if (count2 === 0) {
      await Tax.create({ taxPercent: 18 });
      await Tax.create({ taxPercent: 12 });
      await Tax.create({ taxPercent: 5 });
      await Tax.create({ taxPercent: 28 });
      await Tax.create({ taxPercent: 0 });
    } 
  } catch (error) {
    console.error("Error:", error);
  }
}
