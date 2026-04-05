import { hash } from 'zod'
import { pool } from '../db/db.js'
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword])
        res.status(200).json({ message: 'User created successfully' })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = pool.query("SELECT user from users where email = $1", [email])
        if (!user.rows) {
            res.status(500).json({ message: 'User not found' })
        }
        const isPasswordValid = await bcrypt.compare(password,)

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}