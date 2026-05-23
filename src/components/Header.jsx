import React from 'react';

const Header = ({ onNavigate, showBackButton }) => {
  return (
    <header style={{
      width: '100%',
      padding: '15px 30px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ margin: 0, fontSize: '20px', cursor: 'pointer' }} onClick={() => onNavigate('landing')}>
        Shantanu Glass & Aluminum
      </h1>
      
      {showBackButton && (
        <button 
          onClick={() => onNavigate('landing')}
          style={{ 
            padding: '8px 16px', backgroundColor: '#334155', color: 'white', 
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' 
          }}>
          ← Back to Home
        </button>
      )}
    </header>
  );
};

export default Header;