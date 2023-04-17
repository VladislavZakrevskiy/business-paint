import React from 'react'
import './styles/app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CanvasPage from './pages/CanvasPage'
import Header from './components/Header'

type Props = {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/:id' element={<CanvasPage/>}/>
        <Route
          path="*"
          element={<Navigate to={`f${(+new Date).toString(16)}`}/>}
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App