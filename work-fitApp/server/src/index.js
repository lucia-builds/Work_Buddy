import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
// ===== ROUTES =====
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ===== MIDDLEWARE =====
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5000'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ===== TEST ROUTE =====
app.get('/', (req, res) => {
  res.json({
    message: 'WorkFit API running ✅',
    version: '1.0.0',
    endpoints: {
      auth:     '/api/auth',
      user:     '/api/user',
      exercise: '/api/exercise',
      diet:     '/api/diet',
      food:     '/api/food',
      chatbot:  '/api/chatbot',
      progress: '/api/progress',
    }
  })
})
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  })
})

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err)
  console.error('Stack:', err.stack)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.toString() : undefined
  })
})

// ===== DB + START =====
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected ✅')

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 5000} ✅`)
    })
  } catch (err) {
    console.error('Failed to connect to MongoDB ❌', err.message)
    process.exit(1)
  }
}

startServer()