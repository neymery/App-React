import React from 'react';  
import { FaFacebook, FaInstagram,  FaLinkedin } from 'react-icons/fa';   
import '../styles/Footer.css';
import { useSelector } from 'react-redux';  


const Footer = () => { 
  const color = useSelector((state) => state.color);
  const user = useSelector((state) => state.user);
  
  return (  
    <footer className="footer" style={{ backgroundColor: color || user.couleur }}>  
      <p>&copy; 2024 MERY'S Application. Tous droits réservés.</p>  
      <p>Adresse : 123 Rue hay Sallam , Salé, Maroc</p>  
      <div className="social-links">  
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">  
          <FaFacebook size={24} />  
        </a>  
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">  
          <FaInstagram size={24} />  
        </a>  
 
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">  
          <FaLinkedin size={24} />  
        </a>  
         
      </div>  
    </footer>  
  );  
};  

export default Footer;