import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="text-primary text-4xl font-display flex items-center justify-center h-screen">WorkFit ✅ Tailwind Working</div>} />
      </Routes>
    </Router>
  )
}

export default App;