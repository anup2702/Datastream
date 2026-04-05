import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import logRoutes from './src/routes/logRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import auth from './src/routes/authRoutes.js'

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use('/api', logRoutes)
app.use('/api/auth', authRoutes)

app.get("/", (req, res) => {
    res.send("Log System Running")
})

app.listen(3000, () => console.log('Server Running'))