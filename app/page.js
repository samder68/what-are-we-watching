'use client'
import { useState } from 'react';

export default function StreamingTracker() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [watchingList, setWatchingList] = useState([
    {
      id: 1,
      title: "The Bear",
      service: "Hulu",
      season: 3,
      episode: 5,
      totalEpisodes: 28,
      watchingWith: "Sarah",
      rating: 5,
      genre: "Comedy/Drama"
    },
    {
      id: 2,
      title: "House of the Dragon",
      service: "HBO Max",
      season: 2,
      episode: 3,
      totalEpisodes: 18,
      watchingWith: "Solo",
      rating: 4,
      genre: "Fantasy/Drama"
    }
  ]);

  // Form states
  const [newShow, setNewShow] = useState({
    title: '',
    service: '',
    watchingWith: '',
    season: 1,
    episode: 1
  });

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

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    marginBottom: '15px',
    boxSizing: 'border-box'
  };

  const handleAddShow = () => {
    if (newShow.title && newShow.service) {
      const show = {
        id: Date.now(),
        title: newShow.title,
        service: newShow.service,
        season: newShow.season,
        episode: newShow.episode,
        totalEpisodes: 20, // default
        watchingWith: newShow.watchingWith || 'Solo',
        rating: 0,
        genre: 'Unknown'
      };
      
      setWatchingList([...watchingList, show]);
      setNewShow({ title: '', service: '', watchingWith: '', season: 1, episode: 1 });
      setShowAddModal(false);
      alert('Show added successfully!');
    } else {
      alert('Please fill in show name and service!');
    }
  };

  const handleWriteReview = () => {
    alert('Review feature coming soon! For now, click the stars on each show to rate.');
    setShowReviewModal(false);
  };

  const updateRating = (showId, newRating) => {
    setWatchingList(watchingList.map(show => 
      show.id === showId ? { ...show, rating: newRating } : show
    ));
  };

  const renderStars = (rating, showId = null) => {
    return Array.from({length: 5}, (_, i) => (
      <span 
        key={i}
        style={{
          cursor: showId ? 'pointer' : 'default',
          color: i < rating ? '#fbbf24' : '#d1d5db',
          fontSize: '18px'
        }}
        onClick={() => showId && updateRating(showId, i + 1)}
      >
        ⭐
      </span>
    ));
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
        <button 
          style={{...buttonStyle, backgroundColor: '#059669'}}
          onClick={() => alert('Friend features coming soon! Share your profile link to connect with friends.')}
        >
          👥 See What Friends Are Watching
        </button>
        <button 
          style={{...buttonStyle, backgroundColor: '#7c3aed'}}
          onClick={() => setShowReviewModal(true)}
        >
          ⭐ Write a Review
        </button>
      </div>

      <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>
        Currently Watching ({watchingList.length} shows)
      </h2>
      
      {watchingList.map(show => (
        <div key={show.id} style={cardStyle}>
          <h3 style={{fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0'}}>
            {show.title === 'The Bear' ? '🐻' : show.title === 'House of the Dragon' ? '🐉' : '📺'} {show.title}
          </h3>
          <p style={{color: '#6b7280', margin: '5px 0'}}>{show.service} • {show.genre}</p>
          <p style={{margin: '5px 0'}}>Progress: S{show.season}E{show.episode} of {show.totalEpisodes} episodes</p>
          <p style={{margin: '5px 0'}}>With {show.watchingWith}</p>
          <div style={{margin: '10px 0'}}>
            Rating: {renderStars(show.rating, show.id)}
          </div>
          <button style={{...buttonStyle, fontSize: '14px', padding: '8px 16px'}}>
            ▶️ Watch Next
          </button>
        </div>
      ))}

      {/* Add Show Modal */}
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
              value={newShow.title}
              onChange={(e) => setNewShow({...newShow, title: e.target.value})}
              style={inputStyle}
            />
            
            <select 
              value={newShow.service}
              onChange={(e) => setNewShow({...newShow, service: e.target.value})}
              style={inputStyle}
            >
              <option value="">Select service...</option>
              <option value="Netflix">Netflix</option>
              <option value="Hulu">Hulu</option>
              <option value="HBO Max">HBO Max</option>
              <option value="Disney+">Disney+</option>
              <option value="Apple TV+">Apple TV+</option>
              <option value="Prime Video">Prime Video</option>
              <option value="Other">Other</option>
            </select>

            <input 
              type="text" 
              placeholder="Watching with (or 'Solo')"
              value={newShow.watchingWith}
              onChange={(e) => setNewShow({...newShow, watchingWith: e.target.value})}
              style={inputStyle}
            />

            <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
              <div style={{flex: 1}}>
                <label style={{display: 'block', marginBottom: '5px', fontSize: '14px'}}>Season</label>
                <input 
                  type="number" 
                  min="1"
                  value={newShow.season}
                  onChange={(e) => setNewShow({...newShow, season: parseInt(e.target.value) || 1})}
                  style={{...inputStyle, marginBottom: '0'}}
                />
              </div>
              <div style={{flex: 1}}>
                <label style={{display: 'block', marginBottom: '5px', fontSize: '14px'}}>Episode</label>
                <input 
                  type="number" 
                  min="1"
                  value={newShow.episode}
                  onChange={(e) => setNewShow({...newShow, episode: parseInt(e.target.value) || 1})}
                  style={{...inputStyle, marginBottom: '0'}}
                />
              </div>
            </div>

            <div style={{display: 'flex', gap: '10px'}}>
              <button 
                style={{...buttonStyle, backgroundColor: '#6b7280', flex: 1}}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{...buttonStyle, flex: 1}}
                onClick={handleAddShow}
              >
                Add Show
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
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
            <h2 style={{margin: '0 0 20px 0'}}>Write a Review</h2>
            <p style={{marginBottom: '20px'}}>
              For now, you can rate shows by clicking the stars on each show card! 
              Full review functionality coming soon.
            </p>
            <button 
              style={buttonStyle}
              onClick={handleWriteReview}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
