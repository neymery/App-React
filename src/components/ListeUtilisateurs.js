import React, { useEffect, useState, useCallback } from 'react';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import '../styles/ListeUtilisateurs.css';  

const ListeUtilisateurs = () => {  
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  
  const [currentPage, setCurrentPage] = useState(1);  
  const usersPerPage = 5;  
  const [selectedUser, setSelectedUser] = useState(null);  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const navigate = useNavigate();  

  useEffect(() => {  
    const fetchUsers = async () => {  
      setLoading(true);  
      try {  
        const response = await axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire');  
        setUsers(response.data);  
      } catch (err) {  
        setError('Erreur lors du chargement des utilisateurs : ' + (err.response?.data?.message || err.message));  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchUsers();  
  }, []);  

  const handleDelete = useCallback(async (id) => {  
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;  

    try {  
      await axios.delete(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`);  
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));  
    } catch (err) {  
      setError('Erreur lors de la suppression de l\'utilisateur : ' + (err.response?.data?.message || err.message));  
    }  
  }, []);  

  const handleEdit = useCallback((id) => {  
    navigate(`/edit-user/${id}`);  
  }, [navigate]);  

  const handleToggleAdmin = useCallback(async (id, isAdmin) => {  
    try {  
      const updatedUser = { admin: !isAdmin };  
      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, updatedUser);  
      setUsers(prevUsers => prevUsers.map(user => (user.id === id ? { ...user, admin: !isAdmin } : user)));  
    } catch (err) {  
      setError('Erreur lors de la mise à jour du rôle : ' + (err.response?.data?.message || err.message));  
    }  
  }, []);  

  const handleInfo = useCallback((user) => {  
    setSelectedUser(user);  
    setIsModalOpen(true);  
  }, []);  
  
  const closeModal = () => {  
    setIsModalOpen(false);  
    setSelectedUser(null);  
  };  

  const indexOfLastUser = currentPage * usersPerPage;  
  const indexOfFirstUser = indexOfLastUser - usersPerPage;  
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);  
  const totalPages = Math.ceil(users.length / usersPerPage);  

  const handlePrevious = () => {  
    setCurrentPage(prev => Math.max(prev - 1, 1));  
  };  

  const handleNext = () => {  
    setCurrentPage(prev => Math.min(prev + 1, totalPages));  
  };  

  return (  
    <div className="liste-utilisateurs">  
      <h2>Liste des Utilisateurs</h2>  

      {loading && <p>Chargement des utilisateurs...</p>}  
      {error && <p className="error">{error}</p>}  

      {!loading && users.length === 0 && <p>Aucun utilisateur trouvé.</p>}  

      {!loading && currentUsers.length > 0 && (  
        <table>  
          <thead>  
            <tr>  
              <th>ID</th>  
              <th>Avatar</th>  
              <th>Nom</th>  
              <th>Prénom</th>  
              <th>Email</th>  
              <th>Pseudo</th>  
              <th>Rôle</th>  
              <th>Actions</th>  
            </tr>  
          </thead>  
          <tbody>  
            {currentUsers.map(user => (  
              <tr key={user.id}>  
                <td>{user.id}</td>  
                <td><img src={user.photo} alt={`${user.nom} ${user.prenom}`} className="user-avatar" /></td>  
                <td>{user.nom}</td>  
                <td>{user.prenom}</td>  
                <td>{user.email}</td>  
                <td>{user.pseudo}</td>  
                <td>  
                  <button  
                    onClick={() => handleToggleAdmin(user.id, user.admin)}  
                    className={`role-button ${user.admin ? 'admin' : 'user'}`}  
                    aria-label={user.admin ? `Retirer le rôle admin de ${user.nom}` : `Donner le rôle admin à ${user.nom}`}  
                  >  
                    {user.admin ? 'Admin' : 'Utilisateur'}  
                  </button>  
                </td>  
                <td>  
                  <button onClick={() => handleEdit(user.id)} className="edit-button" aria-label={`Editer ${user.nom}`}>Éditer</button>  
                  <button onClick={() => handleDelete(user.id)} className="delete-button" aria-label={`Supprimer ${user.nom}`}>Supprimer</button>  
                  <button onClick={() => handleInfo(user)} className="info-button" aria-label={`Afficher les informations de ${user.nom}`}>Infos</button>  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      )}  

      {/* Modal pour afficher les informations de l'utilisateur */}  
        {isModalOpen && selectedUser && (  
        <div className="modal">  
          <div className="modal-content">  
            <span className="close" onClick={closeModal}>&times;</span>  
            <img src={selectedUser.photo} alt={`${selectedUser.nom} ${selectedUser.prenom}`} />  
            <h1>{`${selectedUser.nom} ${selectedUser.prenom}`}</h1>
            <p><strong>ID:</strong> {selectedUser.id}</p> 
            <p><strong>Âge:</strong> {selectedUser.age}</p>  
            <p><strong>Admin:</strong> {selectedUser.admin ? 'Oui' : 'Non'} </p>  
            <p><strong>Email:</strong> {selectedUser.email}</p>  
            <p><strong>Mode de passe:</strong> {selectedUser.MotDePasse}</p>  
            <p><strong>Pseudo:</strong> {selectedUser.pseudo}</p>  
            <p><strong>Couleur:</strong> {selectedUser.couleur}</p>  
            <p><strong>Devise:</strong> {selectedUser.Devise}</p>  
            <p><strong>Pays:</strong> {selectedUser.Pays}</p>  
          </div>  
        </div>  
      )}

      {/* Pagination Controls */}  
      <div className="pagination">  
        <button onClick={handlePrevious} disabled={currentPage === 1} className="page-button">  
          Précédent  
        </button>  
        <span>{currentPage} / {totalPages}</span>  
        <button onClick={handleNext} disabled={currentPage === totalPages} className="page-button">  
          Suivant  
        </button>  
      </div>  
    </div>  
  );  
};  

export default ListeUtilisateurs;