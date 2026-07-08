const NOC = require("../models/NOC");
const Internship = require("../models/Internship");
const User = require("../models/User");
const createNOC = async (req, res) => {
    try {
        const { internship, student } = req.body;

        if (!internship || !student) {
            return res.status(400).json({
                success: false,
                message: "Internship and Student are required."
            });
        }

        const internshipExists = await Internship.findById(internship);

        if (!internshipExists) {
            return res.status(404).json({
                success: false,
                message: "Internship not found."
            });
        }

        const studentExists = await User.findById(student);

        if (!studentExists || studentExists.role !== "student") {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        const existingNOC = await NOC.findOne({
            internship,
            student
        });

        if (existingNOC) {
            return res.status(400).json({
                success: false,
                message: "NOC already exists for this student."
            });
        }

        const noc = await NOC.create({
            internship,
            student
        });

        return res.status(201).json({
            success: true,
            message: "NOC created successfully.",
            data: noc
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getAllNOCs = async (req, res) => {
    try {
        const nocs = await NOC.find()
            .populate("student", "name email rollNumber")
            .populate("internship", "companyName internshipTitle")
            .populate("issuedBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: nocs.length,
            data: nocs
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getNOCById = async (req, res) => {
    try {
        const { id } = req.params;

        const noc = await NOC.findById(id)
            .populate("student", "name email rollNumber")
            .populate("internship", "companyName internshipTitle")
            .populate("issuedBy", "name email");

        if (!noc) {
            return res.status(404).json({
                success: false,
                message: "NOC not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: noc
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const issueNOC = async (req, res) => {
    try {
        const { id } = req.params;
        const { nocFile } = req.body;

        const noc = await NOC.findById(id);

        if (!noc) {
            return res.status(404).json({
                success: false,
                message: "NOC not found."
            });
        }

        if (noc.status === "Issued") {
            return res.status(400).json({
                success: false,
                message: "NOC has already been issued."
            });
        }

        noc.status = "Issued";
        noc.issueDate = new Date();
        noc.nocFile = nocFile || "";

        // Logged-in admin/teacher issuing the NOC
        noc.issuedBy = req.user.id;

        await noc.save();

        return res.status(200).json({
            success: true,
            message: "NOC issued successfully.",
            data: noc
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const deleteNOC = async (req, res) => {
    try {
        const { id } = req.params;

        const noc = await NOC.findById(id);

        if (!noc) {
            return res.status(404).json({
                success: false,
                message: "NOC not found."
            });
        }

        await NOC.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "NOC deleted successfully."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
module.exports = {
    createNOC,
    getAllNOCs,
    getNOCById,
    issueNOC,
    deleteNOC
};