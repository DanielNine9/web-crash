import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
const register = async (req, res, next) => {
    try {
        const conflic = await User.findOne({ username: req.body.username })
        if (conflic)
            return res.status(409).send("conflic username")
        const { username, password } = req.body
        const hash = bcrypt.hashSync(password, 10)
        const newUser = await new User({
            username,
            password: hash
        }).save()
        res.status(200).json(newUser)
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next("Not found username")
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next("Password is not correct")
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN)
        res.cookie("access_token", accessToken, {httpOnly: true}).status(200).send("User login success")
    } catch (e) {
        next(e)
    }
}

export { register, login }