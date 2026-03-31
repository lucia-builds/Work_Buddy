import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },

  // ===== FITNESS PROFILE =====
  profile: {
    age:           { type: Number, default: null },
    gender:        { type: String, enum: ['male','female','other'], default: null },
    height:        { type: Number, default: null }, // cm
    weight:        { type: Number, default: null }, // kg
    goal:          { type: String, enum: ['lose_weight','gain_muscle','stay_fit','improve_endurance'], default: null },
    activityLevel: { type: String, enum: ['sedentary','lightly_active','moderately_active','very_active'], default: null },
    dietType:      { type: String, enum: ['vegetarian','vegan','non_vegetarian','eggetarian'], default: null },
    fitnessLevel:  { type: String, enum: ['beginner','intermediate','advanced'], default: null },
    healthIssues:  { type: [String], default: [] },
  },

  currentWeight:   { type: Number, default: null },
  targetWeight:    { type: Number, default: null },
  profileComplete: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
})

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)