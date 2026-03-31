import express from 'express'
import { register, login, getMe } from '../controllers/authController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// Wrapper to catch async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))
router.get('/me', protect, asyncHandler(getMe))

export default router