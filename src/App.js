import './App.css';
import HomePage from './home.mjs';
import LoginPage from './users/page/loginPage.mjs';
import SignUpPage from './users/page/signupPage.mjs';
import { AuthProvider } from './authprovider.mjs';
import CheckedInvoices from './invoice/page/invoiceCheckerPage.mjs';
import Dashboard from './dashboard/page/dashboard.mjs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
  
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />   
          <Route path='/invoices/status' element={<CheckedInvoices />} />
          <Route path='/dashboard' element={<Dashboard />} />
          
        </Routes>
      </AuthProvider>
   
  );
}

export default App;


