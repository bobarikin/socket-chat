import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const authRouter = express.Router();

// /api/auth/register
authRouter.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body

        const candidate = await User.findOne({ name })

        if (candidate) {
            return res.status(400).json({
                message: 'Такой пользователь уже существует...',
                type: 'error',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            name,
            password: hashedPassword,
        })

        await user.save()

        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован.',
            type: 'success',
        })

    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова...',
            type: 'error',
        })
    }
})

export default authRouter