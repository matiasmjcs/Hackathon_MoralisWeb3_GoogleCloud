import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CoverPage from './routes/coverPage/coverPage';
import Center from './components/center/center';
import Patient from './routes/patient/patient';
import Specialist from './routes/specialist/specialist';
import UserProvider from './context/userProvider';
import History from './routes/history/history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<CoverPage/>} />
            <Route path='/center' element={<Center />}/>
            <Route path='/patients' element={<Patient/>}/>
            <Route path='/specialists' element={<Specialist />} />
            <Route path='/transactions' element={<History/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);


