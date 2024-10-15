import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes,useParams } from 'react-router-dom'
import Home from './pages/Home'
import Suggestions from './pages/Suggestions'
import Report from './pages/Report'
import Reports from './pages/Reports'
import ShowReport from './pages/ShowReport'
import NotesReport from './pages/NotesReport'
import SuggestionList from './pages/SuggestionList'
import AddNotesSugg from './components/suggList/NotesSugg'
import ShowSugg from './pages/ShowSugg'
import Create from './pages/Create'
import Disables from './pages/Disables'
import SuggDis from './pages/SuggDisables'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import ProtectedRoutes from './utils/ProtectedRoute'
import {useSelector} from 'react-redux'
function App() {
 const {id} = useParams()
 const usersDetails = useSelector((state)=> state.users)
     const {user} = usersDetails
  return (
    <>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<Login />} path='/login'></Route>
        <Route element={<Register />} path='/register'></Route>
        <Route element={<Disables />} path='/dis'></Route>
        <Route element={<SuggDis />} path='/suggDis'></Route>
        <Route element={<ProtectedRoutes/>}>
       
        <Route element={<Suggestions/>} path='/suggestion'></Route>
        <Route element={<Report/>} path='/report'></Route>
        <Route element={<Reports/>} path='/reports'></Route>
        <Route element={<ShowReport/>} path='/show-report/:id'></Route>
        <Route element={<NotesReport/>} path='/notes/:id'></Route>
        <Route element={<AddNotesSugg/>} path='/notes-sugg/:id'></Route>
        <Route element={<SuggestionList/>} path='/suggList'></Route>
        <Route element={<ShowSugg id={id}/>} path='/show-sugg/:id'></Route>
        <Route element={<Create/>} path='/create'></Route>
        {
        user?.data?.isAdmin == 'true' &&
        (
        <Route element={user?.data?.isAdmin == "true" ? <Admin/> : <Login/>} path='/admin'></Route>

        )
        }
        </Route>
        <Route element={<NotFound/>} path='/*'></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
