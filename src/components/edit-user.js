import React, { useEffect, useState } from 'react';  
import { useSelector } from 'react-redux';  
import { useNavigate, useParams } from 'react-router-dom';  
import axios from 'axios';  

const EditUser = () => {  
  const { id } = useParams();  
  const navigate = useNavigate();  

    
  const user = useSelector((state) => state.user);  

  const [userData, setUserData] = useState({  
    nom: '',  
    prenom: '',  
    email: '',  
    pseudo: '',  
    couleur: '',  
    Pays: '',  
  });  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  

  // Vérification du rôle de l'utilisateur  
  useEffect(() => {  
    if (user && !user.admin) {  
      navigate('/');   
    }  
  }, [user, navigate]);  

  // Charger les données de l'utilisateur  
  useEffect(() => {  
    const fetchUser = async () => {  
      try {  
        const response = await axios.get(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`);  
        setUserData(response.data);  
      } catch (err) {  
        setError('Erreur lors du chargement de l\'utilisateur : ' + (err.response?.data?.message || err.message));  
        console.log('Erreur lors de la récupération :', err);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchUser();  
  }, [id]);  

  // Gérer la soumission du formulaire  
  const handleSubmit = async (e) => {  
    e.preventDefault();  

    try {  
      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, userData);  
      navigate('/ListeUtilisateurs');   
    } catch (err) {  
      setError('Erreur lors de la mise à jour de l\'utilisateur : ' + (err.response?.data?.message || err.message));  
      console.log('Erreur lors de la mise à jour :', err);  
    }  
  };  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));  
  };  

  const handleCancel = () => {  
    navigate('/ListeUtilisateurs');  
  };  

  // Afficher un loader ou un message d'erreur  
  if (loading) {  
    return <p>Chargement des données de l'utilisateur...</p>;  
  }  

  if (error) {  
    return <p className="error">{error}</p>;  
  }  

  return (  
    <div className="edit-user">  
      <h2>Éditer l'Utilisateur</h2>  
      <form onSubmit={handleSubmit}>  
        <div>  
          <label>Nom :</label>  
          <input type="text" name="nom" value={userData.nom} onChange={handleChange} required />  
        </div>  
        <div>  
          <label>Prénom :</label>  
          <input type="text" name="prenom" value={userData.prenom} onChange={handleChange} required />  
        </div>  
        <div>  
          <label>Email :</label>  
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />  
        </div>  
        <div>  
          <label>Pseudo :</label>  
          <input type="text" name="pseudo" value={userData.pseudo} onChange={handleChange} required />  
        </div>  
        <div>  
          <label>Couleur :</label>  
          <input type="text" name="couleur" value={userData.couleur} onChange={handleChange} />  
        </div>  
        <div>  
          <label>Pays :</label>  
          <input type="text" name="Pays" value={userData.Pays} onChange={handleChange} />  
        </div>  
        <button type="submit" className="submit-button">Sauvegarder</button>  
        <button type="button" className="cancel-button" onClick={handleCancel}>Annuler</button>  
      </form>  
    </div>  
  );  
};  

export default EditUser;  
