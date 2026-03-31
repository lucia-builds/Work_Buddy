import express from 'express'
import { updateProfile, getProfile } from '../controllers/userController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.get('/',        protect, getProfile)
router.put('/profile', protect, updateProfile)

export default router