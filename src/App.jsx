import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ExactEditableInvoice from './components/ExactEditableInvoice';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Show back button only when not on landing page */}
      <Header 
        onNavigate={setCurrentPage} 
        showBackButton={currentPage !== 'landing'} 
      />
      
      <main>
        {currentPage === 'landing' ? (
          <LandingPage onNavigate={setCurrentPage} />
        ) : (
          <ExactEditableInvoice />
        )}
      </main>
    </div>
  );
};

export default App;