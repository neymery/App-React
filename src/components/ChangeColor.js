import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../redux/actions"; 
import { SketchPicker } from "react-color";  

const ChangeColor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);  
  const [color, setColor] = useState("#ffffff"); 
  const [error, setError] = useState("");

  const handleChangeComplete = (color) => {
    setColor(color.hex); // Mettre à jour l'état de la couleur avec la couleur sélectionnée
  };

  const handleApply = async () => {
    if (user.age <= 15) {
      setError("Vous devez avoir plus de 15 ans pour changer la couleur.");
      return;  
    }

    try {
      const response = await axios.put(
        `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`,
        { ...user, couleur: color }
      );
      if (response.status === 200) {
        dispatch(changeColor(color));
        setError("");
      }
    } catch (error) {
      console.error("Erreur lors du changement de couleur :", error);
      setError("Échec du changement de couleur. Veuillez réessayer.");  
    }
  };

  return (
    <div className="text-center py-4">
      <h3>Choisir Votre Couleur Préférée</h3>
      {error && <p className="text-danger">{error}</p>}
      <div className="d-flex justify-content-center my-3">
        <SketchPicker 
          color={color} 
          onChangeComplete={handleChangeComplete} 
        />
      </div>
      <button onClick={handleApply} style={{ backgroundColor: color, color: '#fff' }}>
        Appliquer
      </button>
    </div>
  );
};

export default ChangeColor;