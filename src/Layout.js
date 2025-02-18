// Layout.js  

import React from 'react';  
import HeaderSection from './components/HeaderSection';  
import NavigationBar from './components/NavigationBar'; // Horizontal Nav  
import Footer from './components/Footer';  
import { Outlet } from 'react-router-dom'; // For dynamic child routes  
import NavigationBar2 from './components/NavigationBar2'; // Vertical Nav  
import './styles/Layout.css'; // Ensure to import your CSS  

const Layout = () => {  
  return (  
    <div className="layout">  
      <HeaderSection />  
      <NavigationBar /> {/* The horizontal navigation */}  

      <div className="main-content">  
        <NavigationBar2 className="sidebar" /> {/* The vertical navigation */}  
        <main className="content-section">  
          <Outlet /> {/* Show dynamic routes here */}  
        </main>  
      </div>  

      <Footer />  
    </div>  
  );  
};  

export default Layout;