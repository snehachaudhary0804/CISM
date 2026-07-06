const Department = require("../models/Department");

// Create Departmen
const createDepartment = async (req, res) => {
    try {

        const { departmentName, departmentCode } = req.body;

        // Validation
        if (!departmentName || !departmentCode) {
            return res.status(400).json({
                success: false,
                message: "Department name and code are required."
            });
        }

        // Check duplicate
        const existingDepartment = await Department.findOne({
            $or: [{ departmentName }, { departmentCode }]
        });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department already exists."
            });
        }

        // Create department
        const department = await Department.create({
            departmentName,
            departmentCode
        });

        return res.status(201).json({
            success: true,
            message: "Department created successfully.",
            data: department
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
module.exports={createDepartment};