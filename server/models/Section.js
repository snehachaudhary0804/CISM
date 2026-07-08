const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    
},
{
    timestamps: true
});

module.exports = mongoose.model("Section", sectionSchema);