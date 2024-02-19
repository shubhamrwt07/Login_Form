const User = require("../models/user.model");
const signUp = async (req, res) => {
  try {
    const { name,  password, } = req.body;
    if (!(name &&  password )) {
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
          .json({ message: "Email already exists", status: 400 });
      } else {
        new User({ name, password: password }).save();
        return res
          .status(200)
          .json({ message: "User registered successfully!", status: 200 });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
module.exports ={
    signUp
}
