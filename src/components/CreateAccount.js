import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateAccount.css';

const CreateAccount = () => {
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
  const navigate = useNavigate();

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Gestion des checkbox
    });
  };

  // Fonction de validation du mot de passe
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    // Validation des champs obligatoires
    Object.keys(formData).forEach((field) => {
      if (!formData[field] && field !== 'admin') {
        newErrors[field] = `${field} est obligatoire.`;
      }
    });

    // Validation du mot de passe
    if (formData.MotDePasse && !validatePassword(formData.MotDePasse)) {
      newErrors.MotDePasse =
        'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial.';
    }

    // Vérification de la confirmation du mot de passe
    if (formData.MotDePasse !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Arrêter si le formulaire est invalide
    }

    try {
      await axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', formData);
      alert('Compte créé avec succès !');
      navigate('/');  
    } catch (error) {
      console.error('Erreur lors de la création du compte', error);
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          required
        />
        {errors.nom && <p className="error">{errors.nom}</p>}

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          required
        />
        {errors.prenom && <p className="error">{errors.prenom}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="MotDePasse"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        {errors.MotDePasse && <p className="error">{errors.MotDePasse}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
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
          onChange={handleChange}
          required
        />
        {errors.pseudo && <p className="error">{errors.pseudo}</p>}

        <input
          type="number"
          name="age"
          placeholder="Âge"
          onChange={handleChange}
          required
        />
        {errors.age && <p className="error">{errors.age}</p>}

        <input
          type="text"
          name="couleur"
          placeholder="Couleur préférée"
          onChange={handleChange}
          required
        />
        {errors.couleur && <p className="error">{errors.couleur}</p>}

        <input
          type="text"
          name="Pays"
          placeholder="Pays"
          onChange={handleChange}
          required
        />
        {errors.Pays && <p className="error">{errors.Pays}</p>}

        {/* Case à cocher pour le rôle admin */}
        <label> Admin :
          <input
            type="checkbox"
            name="admin"
            checked={formData.admin}
            onChange={handleChange}
          />
          
        </label>

        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
};

export default CreateAccount;
