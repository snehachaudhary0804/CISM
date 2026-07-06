const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    domainName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Domain", domainSchema);