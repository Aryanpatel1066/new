 const user_model = require("../models/user.model");
const authConfig = require("../config/auth.config");
const jwt = require("jsonwebtoken");

// Signup Controller
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
    try {
      
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create new customer (admin is not allowed via signup)
        const newUser = new user_model({
            name,
            email,
            userType: "CUSTOMER", // Always set user as CUSTOMER
            password: bcrypt.hashSync(password, 8),
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Error while signing up." });
    }
};


// Signin Controller
exports.signin = async (req, res) => {
  try {
    // Find user based on userId
    const user = await user_model.findOne({email: req.body.email });

    // If user is not found, return an error
    if (!user) {
      return res.status(404).send({
        message: "email is not valid",
      });
    }

    // Validate password using bcrypt
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(500).send({
        message: "Wrong password provided",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name,   },
      authConfig.secrate,
      { expiresIn: 101120 } // Set your token expiration time
    );

    // Step 6: Send response with accessToken
    res.status(200).send({
      name: user.name,
      email: user.email,
      userId:user._id,
       accessToken: token,
       userType:user.userType
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Something went wrong while signing in",
    });
  }
};
 