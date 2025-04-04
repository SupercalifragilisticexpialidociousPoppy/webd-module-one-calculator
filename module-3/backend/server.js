require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const {signUp, login} = require("./processes/accountAccess")

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("mongo connected"))
.catch(err => console.error("failed to connect", err));

app.post("/signup", signUp);
app.post("/login", login);

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});