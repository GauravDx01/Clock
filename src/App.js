import React from 'react'
import Wacth from './Watch/Wacth'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import AllPages from './AllPages'
import Bingo from './Bingo/Bingo'
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path= '/' element={<AllPages/>}/>
            <Route path = '/clock' element={<Wacth/>} />
            <Route path = '/bingo' element={<Bingo/>} />
        </Routes>
        
        </BrowserRouter>
    </>
  )
}

export default App