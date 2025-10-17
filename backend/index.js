import express from 'express';
import cors from 'cors';
import authRoute from './route/authRoute.js';
import dataRoute from './route/dataRoute.js';

const port = 5000;

const app = express();

app.use(express.json());
app.use(cors());

// for auth
app.use("/auth",authRoute);

// for data
app.use("/data",dataRoute);

app.get("/test",(req, res) => {
    res.send("Api working...");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});