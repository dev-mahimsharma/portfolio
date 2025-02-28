const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    skills: [
      {
        type: String,
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

const skillsModel = mongoose.model("skills", skillsSchema);

module.exports = skillsModel;
