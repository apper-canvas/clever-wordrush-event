import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from '@/components/pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Routes>
<Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-surface-800 text-white"
        progressClassName="bg-primary"
      />
    </div>
  )
}

export default App