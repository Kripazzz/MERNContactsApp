import React from 'react';


import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import AllContact from './pages/AllContact';

const App = () => {
  return (
    <Router>
    <AuthContextProvider >
   
      <Navbar />
       <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateContact />} /> 
        <Route path="/mycontacts" element={<AllContact />} /> 

        </Routes>
      
       </AuthContextProvider>
       </Router>


  );
};

export default App;















