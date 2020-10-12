import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Router from './config/Router';


axios.defaults.baseURL= "http://localhost:8000/api/v1";
if (localStorage.moovers_token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.moovers_token}`
}

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
