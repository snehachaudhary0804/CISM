const AcademicSession = require("../models/AcademicSession");

// Create Academic Session
exports.createAcademicSession = async (req, res) => {
    try {

        const {
            sessionName,
            startDate,
            endDate,
            isActive
        } = req.body;

        // Validation
        if (!sessionName || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided."
            });
        }

        // Check duplicate session
        const existingSession = await AcademicSession.findOne({ sessionName });

        if (existingSession) {
            return res.status(400).json({
                success: false,
                message: "Academic Session already exists."
            });
        }

        // Only one active session
        if (isActive) {
            await AcademicSession.updateMany(
                {},
                { $set: { isActive: false } }
            );
        }

        const academicSession = await AcademicSession.create({
            sessionName,
            startDate,
            endDate,
            isActive
        });

        return res.status(201).json({
            success: true,
            message: "Academic Session created successfully.",
            data: academicSession
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// Get All Academic Sessions
exports.getAllAcademicSessions = async (req, res) => {
    try {

        const sessions = await AcademicSession.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// Get Academic Session by ID
exports.getAcademicSessionById = async (req, res) => {
    try {

        const { id } = req.params;

        const session = await AcademicSession.findById(id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Academic Session not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: session
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Academic Session
exports.updateAcademicSession = async (req, res) => {
    try {

        const { id } = req.params;
        const {
            sessionName,
            startDate,
            endDate,
            isActive
        } = req.body;

        const session = await AcademicSession.findById(id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Academic Session not found."
            });
        }

        // Check duplicate session name
        if (sessionName) {
            const existingSession = await AcademicSession.findOne({
                sessionName,
                _id: { $ne: id }
            });

            if (existingSession) {
                return res.status(400).json({
                    success: false,
                    message: "Academic Session already exists."
                });
            }
        }

        // Validate dates
        const newStartDate = startDate || session.startDate;
        const newEndDate = endDate || session.endDate;

        if (new Date(newStartDate) >= new Date(newEndDate)) {
            return res.status(400).json({
                success: false,
                message: "Start date must be before end date."
            });
        }

        // Only one active session
        if (isActive === true) {
            await AcademicSession.updateMany(
                { _id: { $ne: id } },
                { $set: { isActive: false } }
            );
        }

        session.sessionName = sessionName || session.sessionName;
        session.startDate = newStartDate;
        session.endDate = newEndDate;

        if (typeof isActive === "boolean") {
            session.isActive = isActive;
        }

        await session.save();

        return res.status(200).json({
            success: true,
            message: "Academic Session updated successfully.",
            data: session
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// Delete Academic Session
exports.deleteAcademicSession = async (req, res) => {
    try {

        const { id } = req.params;

        const session = await AcademicSession.findById(id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Academic Session not found."
            });
        }

        await AcademicSession.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Academic Session deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


