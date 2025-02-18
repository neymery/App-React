import React, { useState, useEffect, useCallback } from "react";  
import axios from "axios";  

const AdminDemande = () => {  
  const [demandes, setDemandes] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [search, setSearch] = useState("");  
  const [statutFilter, setStatutFilter] = useState("");  
  
  // Pagination  
  const [currentPage, setCurrentPage] = useState(1);  
  const demandesPerPage = 5; // Nombre de demandes par page  

  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const response = await axios.get("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire");  
        const allDemandes = response.data.flatMap(user =>  
          (user.demandes || []).map(d => ({  
            ...d,  
            userId: user.id,  
            createdAt: new Date(d.createdAt) 
          }))  
        );  
        setDemandes(allDemandes);  
      } catch (error) {  
        console.error("Erreur de chargement:", error);  
        alert("Erreur de chargement des données");  
      }  
      setLoading(false);  
    };  
    fetchData();  
  }, []);  

  const updateStatut = useCallback(async (demandeId, userId, newStatut) => {  
    try {  
      const userResponse = await axios.get(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`);  
      const demandeIndex = userResponse.data.demandes.findIndex(d => d.id === demandeId);  
      if (demandeIndex === -1) throw new Error("Demande introuvable");  

      const updatedUser = {  
        ...userResponse.data,  
        demandes: userResponse.data.demandes.map((d, index) =>  
          index === demandeIndex ? { ...d, statut: newStatut } : d  
        )  
      };  

      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`, updatedUser);  

      setDemandes(demandes.map(d =>   
        d.id === demandeId ? { ...d, statut: newStatut } : d  
      ));  
    } catch (error) {  
      console.error("Erreur de mise à jour:", error);  
      alert("Échec de la mise à jour");  
    }  
  }, [demandes]);  

  const filteredDemandes = demandes.filter(d =>  
    d.titre?.toLowerCase().includes(search.toLowerCase()) &&  
    (statutFilter ? d.statut === statutFilter : true)  
  );  

  // Pagination logic  
  const indexOfLastDemande = currentPage * demandesPerPage; // Index de la dernière demande  
  const indexOfFirstDemande = indexOfLastDemande - demandesPerPage; // Index de la première demande  
  const currentDemandes = filteredDemandes.slice(indexOfFirstDemande, indexOfLastDemande); // Demandés pour la page actuelle  

  const totalPages = Math.ceil(filteredDemandes.length / demandesPerPage); // Nombre total de pages  

  const handleNextPage = () => {  
    if (currentPage < totalPages) {  
      setCurrentPage(currentPage + 1);  
    }  
  };  

  const handlePreviousPage = () => {  
    if (currentPage > 1) {  
      setCurrentPage(currentPage - 1);  
    }  
  };  

  if (loading) return <div>Chargement...</div>;  

  return (  
    <div className="container">  
      <h1>Gestion des Demandes</h1>  

      <div className="filters">  
        <input  
          type="text"  
          placeholder="Rechercher"  
          value={search}  
          onChange={e => setSearch(e.target.value)}  
        />  

        <select value={statutFilter} onChange={e => setStatutFilter(e.target.value)}>  
          <option value="">Tous</option>  
          <option value="En attente">En attente</option>  
          <option value="Approuvé">Approuvé</option>  
          <option value="Rejeté">Rejeté</option>  
        </select>  
      </div>  

      <table>  
        <thead>  
          <tr>  
            <th>#</th>  
            <th>Titre</th>  
            <th>Description</th>  
            <th>Date de Création</th>  
            <th>Statut</th>  
            <th>Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {currentDemandes.map((demande, index) => (  
            <tr key={`${demande.userId}-${demande.id}`}>  
              <td>{indexOfFirstDemande + index + 1}</td>   
              <td>{demande.titre}</td>  
              <td>{demande.description}</td>  
              <td>{demande.createdAt}</td>  
              <td>{demande.statut}</td>  
              <td>  
                <button  
                  onClick={() => updateStatut(demande.id, demande.userId, "Approuvé")}  
                  disabled={demande.statut === "Approuvé"}  
                  className="btn btn-success m-1"  
                >  
                  ✓ Approuver  
                </button>  

                <button  
                  onClick={() => updateStatut(demande.id, demande.userId, "Rejeté")}  
                  disabled={demande.statut === "Rejeté"}  
                  className="btn btn-danger"  
                >  
                  ✗ Rejeter  
                </button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  

      {/* Pagination buttons */}  
      <div className="pagination">  
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-success"  >  
          Précédent  
        </button>  
        <span>Page {currentPage} sur {totalPages}</span>  
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-success"  >  
          Suivant  
        </button>  
      </div>  
    </div>  
  );  
};  

export default AdminDemande;