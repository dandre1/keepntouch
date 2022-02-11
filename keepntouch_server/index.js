const express = require('express');
const app = express();
const PORT = 3001;
const cookieParser = require("cookie-parser");

const db = require("./models");

app.use(express.json());
app.use(cookieParser());

// Routers
const userRouter = require('./routes/User');
app.use("/user", userRouter);

db.sequelize.sync().then(() => {  
    app.listen(PORT, () => {
        console.log("Server Up!");
    });
});