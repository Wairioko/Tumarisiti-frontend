import logo from './logo.svg';
import './App.css';
import HomePage from './home.js';
import { Routes, Route } from'react-router-dom';
import LoginPage from './users/page/loginPage.mjs';
import SignUpPage from './users/page/signupPage.mjs';


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage /> } />
        
      </Routes>
    
  );
}

export default App;


