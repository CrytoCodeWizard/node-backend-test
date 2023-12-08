const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const exitUser = await User.findOne({
            where: { email }
        });

        if(exitUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: newUser.id },
            "secret key"
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email}});

    if(!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.comparePassword(password, user.password);
    if(!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: user.id
    }, 'secret');

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token
    });
}

module.exports = {
    register,
    login
};