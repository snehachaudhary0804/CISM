const Notification = require("../models/Notification");
const User = require("../models/User");

const createNotification = async (req, res) => {
    try {
        const {
            receiver,
            title,
            message,
            type
        } = req.body;

        if (!receiver || !title || !message) {
            return res.status(400).json({
                success: false,
                message: "Receiver, Title and Message are required."
            });
        }

        const receiverExists = await User.findById(receiver);

        if (!receiverExists) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found."
            });
        }

        const notification = await Notification.create({
            sender: req.user.id,
            receiver,
            title,
            message,
            type
        });

        return res.status(201).json({
            success: true,
            message: "Notification created successfully.",
            data: notification
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate("sender", "name email role")
            .populate("receiver", "name email role")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getMyNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            receiver: req.user.id
        })
        .populate("sender", "name email role")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const markAsRead = async (req, res) => {
    try {

        const { id } = req.params;

        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        notification.isRead = true;

        await notification.save();

        return res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            data: notification
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const deleteNotification = async (req, res) => {
    try {

        const { id } = req.params;

        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        await Notification.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully."
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
    createNotification,
    getAllNotifications,
    getMyNotifications,
    markAsRead,
    deleteNotification
};