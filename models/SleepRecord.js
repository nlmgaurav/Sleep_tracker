const mongoose = require("mongoose");

const sleepRecordSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    hours: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SleepRecord", sleepRecordSchema);
