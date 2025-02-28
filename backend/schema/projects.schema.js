const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectsUrl: [String],
    projectsImages: [String],
    projectsTitle: [String],
    projectsDescription: [String],
    projectsTechnologies: [String],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
