// src/Login.js  
import React, { useState } from 'react';  
import axios from 'axios';  
import { useDispatch } from 'react-redux';  
import { useNavigate, Link } from 'react-router-dom';  
import '../styles/Login.css';  
import { loginUser } from '../redux/actions';  

const Login = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [errorMessages, setErrorMessages] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);  
  const dispatch = useDispatch();  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {  
    e.preventDefault();  
    setErrorMessages([]);  
    setIsLoading(true);  

    if (!username || !password) {  
      setErrorMessages(['Username and password are required.']);  
      setIsLoading(false);  
      return;  
    }  

    const normalizedUsername = username.trim().toLowerCase();  
    const normalizedPassword = password.trim();  

    try {  
      const response = await axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire');  
      const user = response.data.find(  
        (user) =>  
          user.email.trim().toLowerCase() === normalizedUsername &&  
          user.MotDePasse === normalizedPassword  
      );  

      if (user) {  
        console.log('User found:', user);  
        dispatch(loginUser(user));  
        navigate('/home');   
      } else {  
        setErrorMessages(['Incorrect username or password.']);  
      }  
    } catch (error) {  
      console.error('Error during login:', error);  
      setErrorMessages(['Error during login. Please try again.']);  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  return (  
    <div className="login-container">  
      <h2>Login</h2>  
      <form onSubmit={handleLogin} className="login-form">  
        <input  
          type="text"  
          placeholder="Username"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          required  
        />  
        <input  
          type="password"  
          placeholder="Password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          required  
        />  
        <button type="submit" disabled={isLoading}>  
          {isLoading ? 'Loading...' : 'LOGIN'}  
        </button>  
      </form>  
      {errorMessages.length > 0 && (  
        <ul className="error-messages">  
          {errorMessages.map((msg, index) => (  
            <li key={index}>{msg}</li>  
          ))}  
        </ul>  
      )}  
      <Link to="/create-account" className="create-account-link">Create an account</Link>  
    </div>  
  );  
};  

export default Login;