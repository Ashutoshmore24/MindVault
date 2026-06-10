import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetail from './pages/NoteDetail.jsx'
import toast , { Toaster } from 'react-hot-toast';


function App() {
 
  const notify = () => toast('Here is your toast.');
  return (
    <div data-theme="cupcake" className='min-h-screen'>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/notes/:id" element={<NoteDetail />} />
    </Routes>

    </div>
    
  )
}

export default App
