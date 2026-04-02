import express from 'express'
import { addLog, getLogs } from '../controllers/logController.js'

const router = express.Router()

router.post('/log', addLog)
router.get('/logs', getLogs)

export default router