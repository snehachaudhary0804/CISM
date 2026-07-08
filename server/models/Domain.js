const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    domainName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Domain", domainSchema);