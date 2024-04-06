const { sendOtpInMail } = require("../middlewares/nodemailer");
const user = require("../models/userModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate a 4-digit numeric OTP
const otp = () => {
  let o = Number(
    otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    })
  );
  return o;
};

exports.createUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password, isVerification } = req.body;
    if (email) {
      let findEmailIsVerification = await user.findOne({
        email: email,
      });
      if (findEmailIsVerification) {
        throw {
          status: 400,
          message: "Email Is AllReady Register",
        };
      }
    }
    if (!firstName || !lastName || !email || !password || !isVerification) {
      throw {
        status: 400,
        message: !firstName
          ? "firstName is required"
          : !lastName
          ? "lastName is required"
          : !email
          ? "email is required"
          : !isVerification
          ? "otp Verification failed"
          : "password is required",
      };
    }

    let hash = bcrypt.hashSync(password, 10, (err) => {
      if (err) {
        return res.status(400).send({ success: true, message: err.message });
      }
    });
    let userCreate = await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      isVerification: isVerification,
    });
    const generate = await jwt.sign({ User: userCreate._id }, "SECRETEKEY", {
      expiresIn: "7d",
    });
    userCreate._doc.token = generate;
    return res.status(201).json({
      success: true,
      message: "Your Account Successfully Created",
      data: userCreate,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    let findMyAccount = await user.findById({ _id: req.params.userId });
    if (!findMyAccount) {
      throw {
        status: 404,
        message: "You Are Not Valied User",
      };
    }
    return res.status(200).json({
      success: true,
      message: "Your Account Fatch Successfully",
      data: findMyAccount,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    let { email } = req.body;
    let Otp = otp();
    if (!email) {
      throw {
        status: 400,
        message: "email is required",
      };
    }
    sendOtpInMail(email, Otp);
    return res.status(200).json({
      success: true,
      message: "Otp Send Successfully",
      data: Otp,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      throw {
        status: 400,
        message: "email is required",
      };
    }
    let findEmailIsVerification = await user.findOne({
      email: email,
    });
    if (!findEmailIsVerification) {
      throw {
        status: 400,
        message: "This Email Is Not Register",
      };
    }
    if (findEmailIsVerification.disable == true) {
      throw {
        status: 400,
        message: "Ban Your Account",
      };
    }
    if (!password) {
      throw {
        status: 400,
        message: "password is required",
      };
    }
    const comparePassword = bcrypt.compareSync(
      password,
      findEmailIsVerification.password
    );
    if (!comparePassword) {
      throw {
        status: 400,
        message: "Provide Valid Password",
      };
    }
    const generate = await jwt.sign(
      { User: findEmailIsVerification._id },
      "SECRETEKEY",
      {
        expiresIn: "7d",
      }
    );
    findEmailIsVerification._doc.token = generate;
    return res.status(200).json({
      success: true,
      message: "logIn Successfully",
      data: findEmailIsVerification,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let { firstName, lastName, mobileNumber } = req.body;
    let findUser = await user.findOne({
      _id: req.params.userId,
    });
    if (!findUser) {
      throw {
        status: 400,
        message: "User is not found",
      };
    }
    let image = req.file ? req.file.path : findUser.image;
    let updateData = await user.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          image: image,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "profile update successfully",
      data: updateData,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    let findAllUser = await user.find();
    return res.status(200).json({
      success: true,
      message: "All User Is Fatch",
      data: findAllUser,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.disableUser = async (req, res) => {
  try {
    let findUser = await user.findById({ _id: req.params.userId });
    let updateUser = await user.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          disable: !findUser.disable,
        },
      },
      { new: true }
    );
    if (updateUser.disable == true) {
      return res.status(200).json({
        success: true,
        message: "User Successfully Deleted...",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User Successfully Restore...",
      });
    }
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logInAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      throw {
        status: 400,
        message: "email is required",
      };
    }
    let findEmailIsVerification = await user.findOne({
      email: email,
      role: { $in: ["ADMIN", "SUBADMIN"] },
    });
    if (!findEmailIsVerification) {
      throw {
        status: 400,
        message: "Incorrect credential",
      };
    }
    if (findEmailIsVerification.disable == true) {
      throw {
        status: 400,
        message: "Ban Your Account By Admin",
      };
    }
    if (!password) {
      throw {
        status: 400,
        message: "password is required",
      };
    }
    const comparePassword = bcrypt.compareSync(
      password,
      findEmailIsVerification.password
    );
    if (!comparePassword) {
      throw {
        status: 400,
        message: "Provide Valid Password",
      };
    }
    const generate = await jwt.sign(
      { User: findEmailIsVerification._id },
      "SECRETEKEY",
      {
        expiresIn: "7d",
      }
    );
    findEmailIsVerification._doc.token = generate;
    return res.status(200).json({
      success: true,
      message: "logIn Successfully",
      data: findEmailIsVerification,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.staffCreation = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    if (email) {
      let findEmailIsVerification = await user.findOne({
        email: email,
      });
      if (findEmailIsVerification) {
        throw {
          status: 400,
          message: "Email Is AllReady Register",
        };
      }
    }
    if (!firstName || !lastName || !email || !password) {
      throw {
        status: 400,
        message: !firstName
          ? "firstName is required"
          : !lastName
          ? "lastName is required"
          : !email
          ? "email is required"
          : "password is required",
      };
    }

    let hash = bcrypt.hashSync(password, 10, (err) => {
      if (err) {
        return res.status(400).send({ success: true, message: err.message });
      }
    });
    let userCreate = await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      role: "SUBADMIN",
    });
    return res.status(201).json({
      success: true,
      message: "Your Account Successfully Created",
      data: userCreate,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.passwordForget = async (req, res) => {
  try {
    let { password } = req.body;
    if (!password) {
      throw {
        status: 400,
        message: "password is required",
      };
    }
    let hash = bcrypt.hashSync(password, 10, (err) => {
      if (err) {
        return res.status(400).send({ success: true, message: err.message });
      }
    });
    let updateData = await user.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          password: hash,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Forget password successfully",
      data: updateData,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("authorization");
    res
      .status(200)
      .json({ success: true, message: "Successfully Logout Your Account" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
