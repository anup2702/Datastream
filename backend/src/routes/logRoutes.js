import express from 'express'
import { addLog, getLogs, getMetrices } from '../controllers/logController.js'

const router = express.Router()

router.post('/log', addLog)
router.get('/logs', getLogs)
router.get('/metrices', getMetrices)

export default router