import express from 'express'
import { signup, login } from '../controllers/authController.js'

const auth = express.Router()

auth.post('/signup', signup)
auth.post('/login', login)

export default auth