import React from 'react';
import MainApp from './pages/app';
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
   return (
      <BrowserRouter>
         <MainApp />
      </BrowserRouter>
   );
}

export default App;
