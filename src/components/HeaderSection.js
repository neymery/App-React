 import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderSection.css'; 
import { logoutUser } from '../redux/actions';
import logo from '../assets/logo.png';
 
 

const HeaderSection = () => {
  const user = useSelector(state => state.user);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const color = useSelector((state) => state.color);  
  

  const handleLogout = () => {  
    dispatch(logoutUser());  
    navigate('/');   
};  

  return (
<header className="header-section" style={{ backgroundColor: color || user.couleur }}>  
  <div className="logo">  
  <img src={logo} alt="Logo" style={{ width: '150px', height: '160px' }} />
  
  </div>  
  <div className="user-info">  
    {user && (  
      <>  
        <span className="user-name">  
        <img src={user.photo} alt={`${user.nom} ${user.prenom}`} className="user-avatar" /> {user.prenom} {user.nom} 
        </span>  
        <button className="logout-button" onClick={handleLogout}>  
          Déconnexion  
        </button>  
      </>  
    )}  
  </div>  
</header>
  );
};

export default HeaderSection;