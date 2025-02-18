import React from 'react';  
import { useSelector } from 'react-redux';  
import '../styles/UserProfile.css';  

const UserProfile = () => {  
  const user = useSelector(state => state.user);  

  return (  
    <div className="container mt-4">  
      <div className="card user-profile-card shadow-lg">  
        <div className="card-header text-center">  
          <img  
            src={user.photo || '/default-avatar.png'}  
            alt="Avatar"  
            className="rounded-circle mb-2"  
            style={{ width: '100px' }}   
          />  
          <h1 className="card-title">{user.prenom} {user.nom}</h1>  
          <p className="user-role badge badge-secondary">  
            {user.admin ? 'Administrateur' : 'Visiteur'}  
          </p>  
        </div>  
        <div className="card-body">  
          <p><strong>Nom:</strong> {user.nom}</p>  
          <p><strong>Email:</strong> {user.email}</p>  
          <p><strong>Pseudo:</strong> {user.pseudo}</p>  
          <p><strong>Âge:</strong> {user.age}</p>  
          <p><strong>Couleur préférée:</strong> {user.couleur}</p>  
          <p><strong>Pays:</strong> {user.Pays}</p>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default UserProfile;