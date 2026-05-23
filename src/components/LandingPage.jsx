import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '40px', color: '#0f172a' }}>Welcome to Business Portal</h1>
      <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>
        Manage your business glass and aluminum quotes efficiently.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {/* Invoice Generator Card */}
        <div style={{ 
          width: '300px', padding: '30px', border: '1px solid #e2e8f0', borderRadius: '12px', 
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: 'white' 
        }}>
          <h2 style={{ color: '#1e293b' }}>Invoice Generator</h2>
          <p style={{ color: '#64748b' }}>Create professional bills and quotations for your clients.</p>
          <button 
            onClick={() => onNavigate('invoice')}
            style={{ 
              padding: '12px 24px', backgroundColor: '#0f172a', color: 'white', 
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
            }}>
            Open Generator
          </button>
        </div>

        {/* Future Module Example */}
        <div style={{ 
          width: '300px', padding: '30px', border: '1px solid #e2e8f0', borderRadius: '12px', 
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#f8fafc' 
        }}>
          <h2 style={{ color: '#1e293b' }}>Client History</h2>
          <p style={{ color: '#64748b' }}>View your past invoices and client records.</p>
          <button 
            disabled
            style={{ 
              padding: '12px 24px', backgroundColor: '#cbd5e1', color: '#64748b', 
              border: 'none', borderRadius: '6px', cursor: 'not-allowed' 
            }}>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;