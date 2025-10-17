import { Student } from "../config/db.js";

// for addData
export const addData = async (req, res) => {
    try {
        const { rollNo, name, email, contact, course } = req.body;
        let data = new Student({ userId: req.user.id, rollNo, name, email, contact, course });
        let result = await data.save();
        return res.status(200).json({ success: true, message: "data inserted...", result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

// for getData
export const getData = async (req, res) => {
    try {
        let result = await Student.find({ userId: req.user._id });
        return res.status(200).json({ success: true, message: "all data...", result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

// for getSingleData
export const getSingleData = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Student.findOne({ _id: id, userId: req.user._id });
        return res.status(200).json({ success: true, message: "single data...", result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

// for updateData
export const updateData = async (req, res) => {
    try {
        let id = req.params.id;
        const { rollNo, name, email, contact, course } = req.body;
        let result = await Student.updateOne({ _id: id, userId: req.user._id }, { $set: { rollNo, name, email, contact, course } });
        return res.status(200).json({ success: true, message: "update data...", result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

// for deleteData
export const deleteData = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Student.deleteOne({ _id: id, userId: req.user._id });
        return res.status(200).json({ success: true, message: "delete data...", result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

// for searchData 
export const searchData = async (req, res) => {
    try {
        let query = req.params.key;
        let result = await Student.find({
            userId: req.user._id,
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { course: { $regex: query, $options: "i" } },
            ]
        });
        return res.status(200).json({ success: true, message: "search data...", result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}