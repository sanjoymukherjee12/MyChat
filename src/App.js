import { useState } from 'react';
import './App.css';
import datas from './components/data/User.json'
import Home from './components/pages/Home';

function App() {

  return (
    <div className="app">
      <Home/>
    </div>
  );
}

export default App;
