const router = require("express").Router();
const Pin = require("../model/Pin");

//create pin

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();

    if (savedPin) {
      return res.status(200).json(savedPin);
    } else {
      return res.status(400).json("There was a problem.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get all pins

router.get("/", async (req, res) => {
  try {
    const getPins = await Pin.find();
    res.status(200).json(getPins);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
