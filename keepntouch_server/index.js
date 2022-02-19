const express = require('express');
const app = express();
const PORT = 3001;
const cookieParser = require("cookie-parser");
const cors = require("cors");


const db = require("./models");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers
const userRouter = require('./routes/User');
app.use("/user", userRouter);

const jwt = require('express-jwt');

db.sequelize.sync().then(() => {  
    app.listen(PORT, () => {
        console.log("Server Up!");
    });
});