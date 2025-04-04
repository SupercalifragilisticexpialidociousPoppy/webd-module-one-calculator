const bcrypt = require("bcrypt");
const User = require("../models/users");

async function signUp (req, res) {
    try {
        const {username, email, password} = req.body;
        let alreadyExists = await User.findOne({email});
        if(alreadyExists) {
            return res.status(400).json({
                message: "email already registered."
            });
        }
        alreadyExists = await User.findOne({username});
        if(alreadyExists) {
            return res.status(400).json({
                message: "username taken."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const signupthisbro = new User({
            username,
            email,
            password: hashedPassword
        });
        await signupthisbro.save();

        res.status(201).json({
            message: "sign up successful."
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "server error :("
        });        
    }
}

async function login (req, res) {
    try {
        const { email, password } = req.body;
        const whobro = await User.findOne({email});
        if(whobro == null) {
            return res.status(404).json({
                message: "account not found"
            });
        }
        if(await bcrypt.compare(password, whobro.password)) {
            res.status(201).json({message: "Successfully logged in."});
        } else {
            res.status(401).json({
                message: "wrong password."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "server error :("
        });
    }
}

module.exports = {
    signUp,
    login
}