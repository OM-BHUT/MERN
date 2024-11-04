import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./pages/Layout.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {User} from "./pages/User.jsx";


function handleLogin() {
  window.open('/api/auth/google', '_blank'); // Opens in a new tab
}


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout/>}>
            <Route index element={<HomePage/> }></Route>
            <Route path={'signUp'} element={<SignUp />}></Route>
          <Route path={'user'} element={<User/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
