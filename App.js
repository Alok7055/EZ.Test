import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div className="content-wrapper">
          <div className="header-section">
            <h1 className="main-title">Get in Touch</h1>
            <p className="subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default App;

