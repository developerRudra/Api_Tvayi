const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { upload } = require("../middlewares/multer");

// Route for creating a new user
router.post("/accountCreation", UserController.createUser);

// Route for send otp
router.post("/sendOtp", UserController.sendOtp);

// Route for logIn
router.post("/logIn", UserController.logIn);

// Route for getting a specific user by ID
router.get("/getUserById/:userId", UserController.getUserById);

// Route for updating a user by ID
router.put(
  "/updateProfile/:userId",
  upload.single("image"),
  UserController.updateProfile
);

// Route for logOut a user
router.post("/logOut", UserController.logOut);

// Route for passwordForget a user by ID
router.put("/passwordForget/:userId", UserController.passwordForget);

// Admin
// Route for getting all users
router.get("/getAllUser", UserController.getAllUser);

// Route for Ban a user by ID
router.put("/disableUser/:userId", UserController.disableUser);

// Route for logInAdmin
router.post("/logInAdmin", UserController.logInAdmin);

// Route for staffCreation by Admin
router.post("/staffCreation", UserController.staffCreation);

module.exports = router;
