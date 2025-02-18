// src/App.js  
import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import {useSelector } from 'react-redux';  
import Login from './components/Login';  
import CreateAccount from './components/CreateAccount';  
import Layout from './Layout';  
import './styles/App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'font-awesome/css/font-awesome.min.css';  
import ChangeColor from './components/ChangeColor';  
import VoirProfil from './components/VoirProfil';  
import ListeUtilisateurs from './components/ListeUtilisateurs';  
import EditUser from './components/edit-user';  
import UserDemandes from './components/UserDemandes';  
import AdminDemandes from './components/AdminDemandes';  
import AjouterUtilisateur from './components/AjouterUtilisateur';  
import Home from './components/home';  
import Statistiques from './components/Statistiques';

const App = () => {  
  const couleur = useSelector((state) => state.couleur); 

  return (  
    <div style={{ backgroundColor: couleur, minHeight: '100vh' }}>  
      <BrowserRouter>  
        <Routes>  
          {/* Pages sans mise en page */}  
          <Route path="/" element={<Login />} />  
          <Route path="/create-account" element={<CreateAccount />} />  
          
          {/* Pages utilisant la mise en page */}  
          <Route element={<Layout backgroundColor={couleur} />}>  
            <Route path="/Statistiques" element={<Statistiques />} />  
            <Route path="/home" element={<Home />} />  
            <Route path="/ChangeColor" element={<ChangeColor />} />  
            <Route path="/VoirProfil" element={<VoirProfil />} />  
            <Route path="/ListeUtilisateurs" element={<ListeUtilisateurs />} />  
            <Route path="/edit-user/:id" element={<EditUser />} />  
            <Route path="/demandes" element={<UserDemandes />} />  
            <Route path="/admin/demandes" element={<AdminDemandes />} />  
            <Route path="/AjouterUtilisateur" element={<AjouterUtilisateur />} />  
          </Route>  
        </Routes>  
      </BrowserRouter>  
    </div>  
  );  
};  

export default App;