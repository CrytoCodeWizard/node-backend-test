const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const { register, login } = require("./controller/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", (req, res) => {

});

app.post("/register", register);
app.post("/login", login);

app.listen(3000, () => {
    console.log("Server started on port 3000");
})