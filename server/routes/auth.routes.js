import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { JWT_SECRET } from '../config.js'

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

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '3h',
        })

        res.json({
            token,
            userId: user.id,
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

// /api/auth/login
authRouter.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body

        const user = await User.findOne({ name })

        if (!user) {
            return res.status(400).json({
                message: 'Такой пользователь не найден...',
                type: 'error'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Неверный пароль, попробуйте снова.',
                type: 'error',
            })
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '3h',
        })

        res.json({
            token,
            userId: user.id,
            message: 'Добро пожаловать',
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