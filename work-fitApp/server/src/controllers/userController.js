import User from '../models/User.js'

// ===== UPDATE FITNESS PROFILE =====
export const updateProfile = async (req, res) => {
  try {
    const {
      age, gender, height, weight,
      goal, activityLevel, dietType,
      fitnessLevel, healthIssues,
      targetWeight
    } = req.body

    // Calculate BMI
    const bmi = weight && height
      ? (weight / ((height / 100) ** 2)).toFixed(1)
      : null

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profile: {
          age, gender, height, weight,
          goal, activityLevel, dietType,
          fitnessLevel, healthIssues: healthIssues || [],
        },
        currentWeight:   weight,
        targetWeight:    targetWeight || null,
        profileComplete: true,
      },
      { new: true, runValidators: true }
    ).select('-password')

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
      bmi
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// ===== GET PROFILE =====
export const getProfile = async (req, res) => {
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