import { useState } from "react";
import Header from "./component/features/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHorse from "./component/horse/AddHorse";
import AddMan from "./component/knight/AddMan";
import AddClub from "./component/club/AddClub";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Training from "./component/train/Training";
import Notes from "./component/Notes";
import Champion from "./pages/races/Champion";
import Races from "./pages/races/Races";
import RaceDetails from "./pages/races/RaceDetails";
import Contact from "./component/Contact";
import { ToastContainer } from "react-toastify";
import HorseDetails from "./component/horse/HorseDetails";
import Trains from "./component/train/Trains";
import Form from "./component/simile_form/Form";
import RaceStart from "./component/simile_form/RaceStart";
import Test from "./component/simile_form/Test";
import HorseRacingTables from "./component/simile_form/HorceRacingTable";
import Sidebar from "./component/admin/Sidebar";
import BuyingHorses from "./component/horse/BuyingHorses";
function App() {
  return (
    <div>
      <ToastContainer position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/add-man" element={<AddMan />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add-horse" element={<HorseDetails />}></Route>
          <Route path="/add-club" element={<AddClub />}></Route>
          <Route path="/add-horse" element={<AddHorse />}></Route>
          <Route path="/add-train" element={<Training />}></Route>
          <Route path="/trains" element={<Trains />}></Route>
          <Route path="/notes" element={<Notes />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/champ" element={<Champion />}></Route>
          <Route path="/races-details" element={<Races />}></Route>
          <Route path="/race-details/:id" element={<RaceDetails />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/admin" element={<Sidebar />}></Route>
          <Route path="/buy-horse" element={<BuyingHorses />}></Route>
          <Route path="/race/start/:id" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
