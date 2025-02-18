import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Statistiques = () => {
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [error, setError] = useState('');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire');
        const users = response.data;

        // Calcul de la répartition par âge
        const ageCounts = { '18-25': 0, '26-35': 0, '36-45': 0, '46+': 0 };
        
        // Calcul des statuts de demandes
        const requestStats = { pending: 0, approved: 0, rejected: 0 };

        users.forEach(user => {
          // Distribution par âge
          if(user.age) {
            if(user.age >= 18 && user.age <= 25) ageCounts['18-25']++;
            else if(user.age <= 35) ageCounts['26-35']++;
            else if(user.age <= 45) ageCounts['36-45']++;
            else ageCounts['46+']++;
          }

          // Statistiques des demandes
          if(user.demandes) {
            user.demandes.forEach(demande => {
              const statut = demande.statut?.toLowerCase()?.replace(/\s/g, '');
              if(statut === 'Enattente') requestStats.pending++;
              else if(statut === 'approuvé' || statut === 'approuvee' || statut === 'approuvée') requestStats.approved++;
              else if(statut === 'rejeté' || statut === 'rejetee' || statut === 'rejetée') requestStats.rejected++;
            });
          }
        });

        // Formatage des données pour les graphiques
        setAgeDistribution(
          Object.entries(ageCounts).map(([ageGroup, count]) => ({
            ageGroup,
            count
          }))
        );

        setRequestsData([
          { name: 'En attente', value: requestStats.pending },
          { name: 'Approuvées', value: requestStats.approved },
          { name: 'Rejetées', value: requestStats.rejected }
        ]);

      } catch (err) {
        setError('Erreur de chargement des données');
        console.error('Détails de l\'erreur:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Tableau de Bord Administrateur</h1>

      {error && <div className="error">{error}</div>}

      <div className="charts-container">
        {/* Histogramme des âges */}
        <div className="chart">
          <h2>Répartition par Âge des Utilisateurs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#8884d8"
                name="Nombre d'utilisateurs"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Camembert des demandes */}
        <div className="chart">
          <h2>Répartition des Demandes</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={requestsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {requestsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;