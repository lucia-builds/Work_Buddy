import mongoose from 'mongoose'

const foodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // ===== FOOD INFO =====
  foodName:      { type: String, required: true },
  imageUrl:      { type: String, default: null },
  calories:      { type: Number, default: 0 },
  caloriesTotal: { type: Number, default: 0 },
  portionGrams:  { type: Number, default: 100 },

  // ===== NUTRITION =====
  nutrition: {
    protein: { type: Number, default: 0 },
    carbs:   { type: Number, default: 0 },
    fat:     { type: Number, default: 0 },
    fiber:   { type: Number, default: 0 },
    sugar:   { type: Number, default: 0 },
  },

  // ===== WORKOUT NEEDED =====
  workoutNeeded: {
    minutes:   { type: Number, default: 0 },
    exercises: { type: [String], default: [] },
  },

  mealType: {
    type: String,
    enum: ['breakfast','lunch','dinner','snack'],
    default: 'snack'
  },

  aiAnalysis: { type: String, default: '' },
})

export default mongoose.model('FoodLog', foodLogSchema)