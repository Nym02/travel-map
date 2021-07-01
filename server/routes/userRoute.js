const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");

//register user

router.post("/register", async (req, res) => {
  try {
    //generating salt
    const salt = await bcrypt.genSalt(10);
    //generating hashed password
    const hashPass = await bcrypt.hash(req.body.password, salt);

    //create new user

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });

    const createUser = await newUser.save();
    res.status(200).json(createUser._id);
  } catch (err) {
    res.status(500).send({
      error: "Please Enter Unique Username & Email",
    });
  }
});

//login user

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // console.log(user);
    !user && res.status(400).json("Invalid username or password");

    //validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    !validPass && res.status(400).json("Invalid username or password");

    // if (user === null) {
    //   res.status(400).json("Invalid username or password");
    // } else if (!validPass) {
    //   res.status(400).json("Invalid username or password");
    // } else {
    res.status(200).json({ _id: user._id, username: user.username });
    // }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
