import React, { useState } from 'react';  
import axios from 'axios';  
import '../styles/CreateAccount.css';  

const AjouterUtilisateur = () => {  
  const [formData, setFormData] = useState({  
    nom: '',  
    prenom: '',  
    email: '',  
    MotDePasse: '',  
    confirmPassword: '',  
    pseudo: '',  
    age: '',  
    couleur: '',  
    Pays: '',  
    admin: false,   
  });  

  const [errors, setErrors] = useState({});  
    

  const handleChange = (e) => {  
    const { name, value, type, checked } = e.target;  
    setFormData({  
      ...formData,  
      [name]: type === 'checkbox' ? checked : value,  
    });  
  };  

  const validatePassword = (password) => {  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;  
    return passwordRegex.test(password);  
  };  

  const validateForm = () => {  
    const newErrors = {};  
    Object.keys(formData).forEach((field) => {  
      if (!formData[field] && field !== 'admin') {  
        newErrors[field] = `${field} est obligatoire.`;  
      }  
    });  

    if (formData.MotDePasse && !validatePassword(formData.MotDePasse)) {  
      newErrors.MotDePasse =  
        'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial.';  
    }  

    if (formData.MotDePasse !== formData.confirmPassword) {  
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';  
    }  

    setErrors(newErrors);  
    return Object.keys(newErrors).length === 0;  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    if (!validateForm()) {  
      return; // Stop if form is invalid  
    }  

    try {  
      await axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', formData);  
      alert('Utilisateur ajouté avec succès !');  
      
       
      setFormData({  
        nom: '',  
        prenom: '',  
        email: '',  
        MotDePasse: '',  
        confirmPassword: '',  
        pseudo: '',  
        age: '',  
        couleur: '',  
        Pays: '',  
        admin: false,  
      });  
      
       
    } catch (error) {  
      console.error('Erreur lors de l\'ajout de l\'utilisateur', error);  
    }  
  };  

  return (  
    <div>  
      <h2>Ajouter un Utilisateur</h2>  
      <form onSubmit={handleSubmit}>  
        <input  
          type="text"  
          name="nom"  
          placeholder="Nom"  
          value={formData.nom}  
          onChange={handleChange}  
          required  
        />  
        {errors.nom && <p className="error">{errors.nom}</p>}  

        <input  
          type="text"  
          name="prenom"  
          placeholder="Prénom"  
          value={formData.prenom}  
          onChange={handleChange}  
          required  
        />  
        {errors.prenom && <p className="error">{errors.prenom}</p>}  

        <input  
          type="email"  
          name="email"  
          placeholder="Email"  
          value={formData.email}  
          onChange={handleChange}  
          required  
        />  
        {errors.email && <p className="error">{errors.email}</p>}  

        <input  
          type="password"  
          name="MotDePasse"  
          placeholder="Mot de passe"  
          value={formData.MotDePasse}  
          onChange={handleChange}  
          required  
        />  
        {errors.MotDePasse && <p className="error">{errors.MotDePasse}</p>}  

        <input  
          type="password"  
          name="confirmPassword"  
          placeholder="Confirmer le mot de passe"  
          value={formData.confirmPassword}  
          onChange={handleChange}  
          required  
        />  
        {errors.confirmPassword && (  
          <p className="error">{errors.confirmPassword}</p>  
        )}  

        <input  
          type="text"  
          name="pseudo"  
          placeholder="Pseudo"  
          value={formData.pseudo}  
          onChange={handleChange}  
          required  
        />  
        {errors.pseudo && <p className="error">{errors.pseudo}</p>}  

        <input  
          type="number"  
          name="age"  
          placeholder="Âge"  
          value={formData.age}  
          onChange={handleChange}  
          required  
        />  
        {errors.age && <p className="error">{errors.age}</p>}  

        <input  
          type="text"  
          name="couleur"  
          placeholder="Couleur préférée"  
          value={formData.couleur}  
          onChange={handleChange}  
          required  
        />  
        {errors.couleur && <p className="error">{errors.couleur}</p>}  

        <input  
          type="text"  
          name="Pays"  
          placeholder="Pays"  
          value={formData.Pays}  
          onChange={handleChange}  
          required  
        />  
        {errors.Pays && <p className="error">{errors.Pays}</p>}  

        <label> Admin :  
          <input  
            type="checkbox"  
            name="admin"  
            checked={formData.admin}  
            onChange={handleChange}  
          />  
        </label>  

        <button type="submit">Ajouter Utilisateur</button>  
      </form>  
    </div>  
  );  
};  

export default AjouterUtilisateur;