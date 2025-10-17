import express from 'express';
import { addData, deleteData, getData, getSingleData, searchData, updateData } from '../controller/dataController.js';
import Jwt from 'jsonwebtoken';
import { User } from '../config/db.js';

let jwtSecret = "secretKey";

const dataRoute = express.Router();

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        try {
            let decode = Jwt.verify(token, jwtSecret);
            req.user = await User.findOne({ _id: decode.userId }).select("-password");
            // console.log(req.user);
            next();
        }
        catch (err) {
            return res.status(400).json({ success: false, message: "someting went wrong, login again..." });
        }
    }
    else {
        return res.status(500).json({ success: false, message: "please provide token..." });
    }
}

dataRoute.post("/addData",verifyToken,addData);
dataRoute.get("/getData",verifyToken,getData);
dataRoute.get("/getSingle/:id",verifyToken,getSingleData);
dataRoute.put("/update/:id",verifyToken,updateData);
dataRoute.delete("/delete/:id",verifyToken,deleteData);
dataRoute.get("/search/:key",verifyToken,searchData);

export default dataRoute;