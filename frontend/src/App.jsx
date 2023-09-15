import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
