const User = require("../models/user.model");
const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


// signUp

// const saltRounds = 10; 

const signUp = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!(name && password)) {
      return res
        .status(400)
        .json({ message: `All fields are required`, status: 400 });
    } else {
      const userExist = await User.findOne({ name: req.body.name }).select(
        "_id"
      );
      if (userExist) {
        return res
          .status(400)
          .json({ message: "Name already exists", status: 400 });
      } else {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await new User({ name, password: hashedPassword }).save();
        return res
          .status(200)
          .json({ message: "User registered successfully!", status: 200 });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};




// loginform
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!(name && password)) {
      return res.status(400).json({ message: "Both name and password are required", status: 400 });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials", status: 401 });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials", status: 401 });
    }

    return res.status(200).json({ message: "Login successfull", user, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};



// forgotPassword
// const forgotPassword = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const user = await User.findOne({ name });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found', status: 404 });
//     }

//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetToken = token;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//           user: 'your-email@gmail.com',
//           pass: 'your-password'
//       }
//     });

//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: user.email,
//       subject: 'Password Reset Request',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
//         + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//         + `http://localhost:3000/reset-password/${token}\n\n`
//         + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Error sending reset email', status: 500 });
//       } else {
//         console.log('Email sent:' + info.response);
//         return res.status(200).json({ message: 'Reset password email sent', status: 200 });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message, status: 500 });
//   }
// };


module.exports = {
  signUp,
  // forgotPassword,
  login
};
