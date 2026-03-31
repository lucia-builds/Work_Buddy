import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// ===== REGISTER =====
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields'
      })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Create user
    const user = await User.create({ name, email, password })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id:              user._id,
        name:            user.name,
        email:           user.email,
        profileComplete: user.profileComplete,
      }
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// ===== LOGIN =====
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id:              user._id,
        name:            user.name,
        email:           user.email,
        profileComplete: user.profileComplete,
        profile:         user.profile,
      }
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// ===== GET CURRENT USER =====
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}