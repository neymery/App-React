// src/components/Admin.js
import React from 'react';  
import { useSelector } from 'react-redux';  
import '../styles/home.css';   

const Home = () => {  
  const user = useSelector((state) => state.user);  

  return (  
    <div className="home-container">  
      <h1 className="welcome-text">Bienvenue, {user.prenom} !</h1>  
      <h2 className="dashboard-text">Voici votre tableau de bord .</h2>  
      <div className="admin-info">
        <p>Utilisez le menu pour naviguer entre les différentes fonctionnalités  .</p>
      </div>
    </div>  
  );  
};  

export default Home;