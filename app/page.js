'use client'
import { useState } from 'react';

export default function StreamingTracker() {
  const [showAddModal, setShowAddModal] = useState(false);

  const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    margin: '5px',
    cursor: 'pointer'
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh'}}>
      <header style={{marginBottom: '30px'}}>
        <h1 style={{fontSize: '32px', fontWeight: 'bold', margin: '0'}}>What Are We Watching</h1>
        <p style={{color: '#6b7280', marginTop: '5px'}}>Track, share, and discover your streaming journey</p>
      </header>

      <div style={{marginBottom: '30px'}}>
        <button 
          style={buttonStyle}
          onClick={() => setShowAddModal(true)}
        >
          + Add Show or Movie
        </button>
        <button style={{...buttonStyle, backgroundColor: '#059669'}}>
          👥 See What Friends Are Watching
        </button>
        <button style={{...buttonStyle, backgroundColor: '#7c3aed'}}>
          ⭐ Write a Review
        </button>
      </div>

      <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>Currently Watching</h2>
      
      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0'}}>🐻 The Bear</h3>
        <p style={{color: '#6b7280', margin: '5px 0'}}>Hulu • Comedy/Drama</p>
        <p style={{margin: '5px 0'}}>Progress: S3E5 of 28 episodes</p>
        <p style={{margin: '5px 0'}}>With Sarah</p>
        <p style={{margin: '5px 0'}}>⭐⭐⭐⭐⭐ Rating</p>
        <button style={{...buttonStyle, fontSize: '14px', padding: '8px 16px'}}>
          ▶️ Watch Next
        </button>
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0'}}>🐉 House of the Dragon</h3>
        <p style={{color: '#6b7280', margin: '5px 0'}}>HBO Max • Fantasy/Drama</p>
        <p style={{margin: '5px 0'}}>Progress: S2E3 of 18 episodes</p>
        <p style={{margin: '5px 0'}}>Solo</p>
        <p style={{margin: '5px 0'}}>⭐⭐⭐⭐ Rating</p>
        <button style={{...buttonStyle, fontSize: '14px', padding: '8px 16px'}}>
          ▶️ Watch Next
        </button>
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{margin: '0 0 20px 0'}}>Add Show or Movie</h2>
            <input 
              type="text" 
              placeholder="Show name"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                marginBottom: '15px'
              }}
            />
            <select style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              marginBottom: '15px'
            }}>
              <option>Select service...</option>
              <option>Netflix</option>
              <option>Hulu</option>
              <option>HBO Max</option>
              <option>Disney+</option>
              <option>Apple TV+</option>
            </select>
            <div style={{display: 'flex', gap: '10px'}}>
              <button 
                style={{...buttonStyle, backgroundColor: '#6b7280', flex: 1}}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button style={{...buttonStyle, flex: 1}}>
                Add Show
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
