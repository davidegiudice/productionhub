// File: src/App.js
import React from 'react';
import './App.css';
import Artists from './components/Artists';
import Requests from './components/Requests';
import Calendar from './components/Calendar';
import AddEvent from './components/AddEvent';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Artists />
        <Requests />
        <AddEvent />
        <Calendar />
      </main>
    </div>
  );
}

export default App;
