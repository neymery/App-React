import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserDemandes = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const id = useSelector((state) => state.user?.id); // ID de l'utilisateur

   
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération de l'utilisateur");
        console.log("Erreur:", err.response ? err.response.data : err.message);
      }
    };
    fetchUser();
  }, [id]);

  // Ajouter une demande
  const handleAddDemande = async () => {
    if (titre && description && user) {
      try {
        const newDemande = {
          titre,
          description,
          statut: "En attente",
          utilisateurId: id,
          dateCreation: new Date() ,  
        };

        if (!user.demandes) {
          user.demandes = []; // Initialiser le tableau des demandes s'il n'existe pas
        }
        user.demandes.push(newDemande);

        const response = await axios.put(
          `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`,
          user
        );

        setTitre("");
        setDescription("");
        setUser(response.data);
      } catch (err) {
        setError("Erreur lors de l'ajout de la demande");
        console.log("Erreur:", err.response ? err.response.data : err.message);
      }
    } else {
      setError("Tous les champs doivent être remplis");
    }
  };

  // Supprimer une demande
  const handleDeleteDemande = async (demandeIndex) => {
    if (user && user.demandes[demandeIndex].statut === "En attente") {
      try {
        user.demandes.splice(demandeIndex, 1);
        const response = await axios.put(
          `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`,
          user
        );
        setUser(response.data);
      } catch (err) {
        setError("Erreur lors de la suppression de la demande");
        console.log("Erreur:", err.response ? err.response.data : err.message);
      }
    } else {
      setError("Cette demande ne peut pas être supprimée.");
    }
  };

  // Supprimer toutes les demandes en attente
  const handleDeleteAllDemandes = async () => {
    if (user) {
      try {
        user.demandes = user.demandes.filter(
          (demande) => demande.statut !== "En attente"
        );

        const response = await axios.put(
          `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`,
          user
        );
        setUser(response.data);
      } catch (err) {
        setError("Erreur lors de la suppression des demandes en attente");
        console.log("Erreur:", err.response ? err.response.data : err.message);
      }
    }
  };

  return (  
    <div className="container mt-5">  
       <div className="mb-4">  
        <h2>Ajouter une Demande</h2>  
        <div className="mb-3">  
          <input  
            type="text"  
            className="form-control"  
            placeholder="Titre"  
            value={titre}  
            onChange={(e) => setTitre(e.target.value)}  
          />  
        </div>  
        <div className="mb-3">  
          <input  
            type="text"  
            className="form-control"  
            placeholder="Description"  
            value={description}  
            onChange={(e) => setDescription(e.target.value)}  
          />  
        </div>  
        <button className="btn btn-primary" onClick={handleAddDemande}>  
          Ajouter  
        </button>  
        {error && <p className="text-danger mt-2">{error}</p>}  
      </div>  
      
      <div>  
        <h2>Mes Demandes</h2>  
        {user && user.demandes && user.demandes.length > 0 ? (  
          <table className="table table-striped">  
            <thead >  
              <tr>  
                <th scope="col">Titre</th>  
                <th scope="col">Description</th>  
                <th scope="col">Statut</th>  
                <th scope="col">Date de Création</th>  
                <th scope="col">Actions</th>  
              </tr>  
            </thead>  
            <tbody>  
              {user.demandes.map((demande, index) => (  
                <tr key={index}>  
                  <td>{demande.titre}</td>  
                  <td>{demande.description}</td>  
                  <td>{demande.statut}</td>  
                  <td>  
                    {new Date(demande.dateCreation).toLocaleString("fr-FR")}  
                  </td>  
                  <td>  
                    {demande.statut === "En attente" &&  
                      demande.utilisateurId === id && (  
                        <button  
                          className="btn btn-danger"  
                          onClick={() => handleDeleteDemande(index)}  
                        >  
                          Supprimer  
                        </button>  
                      )}  
                  </td>  
                </tr>  
              ))}  
            </tbody>  
          </table>  
        ) : (  
          <p>Aucune demande disponible</p>  
        )}  
        
        <button   
          className="btn btn-warning mt-3"   
          onClick={handleDeleteAllDemandes}  
        >  
          Supprimer Toutes les Demandes en Attente  
        </button>  
      </div>  
    </div>  
  );
};

export default UserDemandes;
