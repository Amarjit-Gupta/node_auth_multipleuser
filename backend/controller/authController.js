import Jwt from 'jsonwebtoken';
import { User } from '../config/db.js';

let jwtSecret = "secretKey";

// for signup
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ success: false, message: "Email already exist..." });
        }
        let data = new User({ name, email, password });
        let result = await data.save();
        let token = Jwt.sign({ userId: result.id }, jwtSecret, { expiresIn: "7d" });
        // console.log("token: ",token);
        return res.status(200).json({ success: true, message: "user signup successfully...", result, token });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}


// for login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email..." });
        }
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid Password..." });
        }

        let token = Jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "7d" });
        // console.log("token: ", token);
        return res.status(200).json({ success: true, message: "user login successfully...", user, token });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}