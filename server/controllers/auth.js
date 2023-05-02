import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

//Register user
export const register = async (req, res) => {
    try {

        const { username, password } = req.body
        const isUser = await User.findOne({ username })

        if (isUser) {
            return res.json({
                message: 'That user already exists.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })
        
        const token = jsonwebtoken.sign(
            {
                id: newUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save()

        res.json({
            newUser, message: 'Successful registration.'
        })

    } catch (error) {
        res.json({ message: 'Registration new user error.' })
    }
}


//Login user
export const login = async (req, res) => {
    try {

        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'This user does not exist.'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({
                message: 'Incorrect password.'
            })
        }

        const token = jsonwebtoken.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token, user, message: 'Successful login.'
        })

    } catch (error) {
        res.json({ message: 'Login user error.' })
    }
}




//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'This user does not exist.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'No access.' })
    }
}