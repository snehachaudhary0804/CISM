const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing"
            });
        }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

             if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }
};
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
                  success: false,
                  message: "Access denied: Admin only"
              });
          }
            next();
};
const isTeacher = (req, res, next) => {
        if (req.user.role !== "teacher") {
             return res.status(403).json({
                  success: false,
                  message: "Access denied: Teacher only"
            });
       }
    next();
};

// Student only
const isStudent = (req, res, next) => {
         if (req.user.role !== "student") {
             return res.status(403).json({
                  success: false,
                  message: "Access denied: Student only"
           });
        }
      next();
};



module.exports = {auth,isAdmin,isStudent,isTeacher};

