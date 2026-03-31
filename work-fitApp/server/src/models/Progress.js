import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // ===== BODY METRICS =====
  weight:     { type: Number, default: null },
  bodyFat:    { type: Number, default: null },
  muscleMass: { type: Number, default: null },
  bmi:        { type: Number, default: null },

  // ===== WORKOUT =====
  workoutDone:     { type: Boolean, default: false },
  workoutDuration: { type: Number, default: 0 },
  caloriesBurned:  { type: Number, default: 0 },
  exercisesDone:   { type: [String], default: [] },

  // ===== DIET =====
  caloriesConsumed: { type: Number, default: 0 },
  waterIntake:      { type: Number, default: 0 },
  mealsLogged:      { type: Number, default: 0 },

  // ===== MOOD =====
  mood:  { type: String, enum: ['great','good','okay','tired','bad'], default: 'good' },
  notes: { type: String, default: '' },
})

export default mongoose.model('Progress', progressSchema)