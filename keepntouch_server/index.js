// Set the app
const express = require('express');
const app = express();

// Get the port
const { port } = require('./helpers/config')
const PORT = port;

// Get other modules
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./models");

// Activate them
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ================== Routers ================== //
// User authentication route
const userRouter = require('./routes/user');
app.use("/user", userRouter);

// Activate the server
db.sequelize.sync().then(() => {  
    app.listen(PORT, () => {
        console.log("Server Up!");
    });
});