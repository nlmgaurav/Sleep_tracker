const express = require("express");
const router = express.Router();
const SleepRecord = require("../models/SleepRecord");

// POST /sleep
router.post("/", async (req, res) => {
  const { userId, hours, timestamp } = req.body;

  const sleepRecord = new SleepRecord({
    userId,
    hours,
    timestamp,
  });

  try {
    const newSleepRecord = await sleepRecord.save();
    res.status(201).json(newSleepRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /sleep/:userId
router.get("/:userId", async (req, res) => {
  try {
    const sleepRecords = await SleepRecord.find({
      userId: req.params.userId,
    }).sort({ timestamp: -1 });
    res.json(sleepRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /sleep/:recordId
router.delete("/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params; // Destructuring for cleaner access

    const deletedSleepRecord = await SleepRecord.deleteOne({ _id: recordId });

    if (!deletedSleepRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" }); // Generic error message for user
  }
});

module.exports = router;
