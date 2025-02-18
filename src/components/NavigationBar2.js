import React from 'react';  
import { Link } from 'react-router-dom';  
import { useSelector } from 'react-redux';  
import '../styles//NavigationBar2.css';  
import 'font-awesome/css/font-awesome.min.css';   

const NavigationBar2 = () => {  
  const user = useSelector((state) => state.user);  
  const isAdmin = user?.admin || false;  
  const isLoggedIn = Boolean(user);  
  const color = useSelector((state) => state.color);  

  return (  
    <nav className="navigation-bar-2" style={{ backgroundColor: color || user.couleur }}>  
      <ul className="vertical-menu-2">   
       
        {/* Main Navigation Links for all logged-in users */}  
        {isLoggedIn && (  
          <>  
            <li><Link to="/Home"><i className="fa fa-home"></i>   Home</Link></li>  
            <li><Link to="/VoirProfil"><i className="fa fa-user"></i> Voir Mon Profil</Link></li>  
            <li><Link to="/ChangeColor"><i className="fa fa-paint-brush"></i> Modifier Couleur</Link></li>  
            {/* User-specific link */}  
            {!isAdmin && <li><Link to="/demandes"><i className="fa fa-paper-plane"></i> Mes Demandes</Link></li>}  
          </>  
        )}  

        {/* Admin Links */}  
        {isAdmin && (  
          <>  
            <li><Link to="/AjouterUtilisateur"><i className="fa fa-user-plus"></i> Ajouter un Utilisateur</Link></li>  
            <li><Link to="/ListeUtilisateurs"><i className="fa fa-list"></i> Liste Utilisateurs</Link></li>  
            <li><Link to="/admin/demandes"><i className="fa fa-cogs"></i> Gérer les Demandes</Link></li> 
            <li><Link to="/Statistiques"><i className="fas fa-chart-bar"></i> Statistiques</Link></li>  
              
          </>  
        )}  
        
      </ul>  
    </nav>  
  );  
};  

export default NavigationBar2;