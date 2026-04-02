import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import logRoutes from './src/routes/logRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', logRoutes)

app.get("/", (req, res) => {
    res.send("Log System Running")
})

app.listen(3000, () => console.log('Server Running'))