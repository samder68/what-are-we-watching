'use client'
import { useState, useEffect } from 'react';

export default function StreamingTracker() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [watchingList, setWatchingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [currentNotes, setCurrentNotes] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCustomService, setShowCustomService] = useState(false);

  // Default streaming services
  const [streamingServices, setStreamingServices] = useState([
    "Netflix", "Hulu", "HBO Max", "Disney+", "Apple TV+", "Prime Video", "Paramount+", "Peacock", "YouTube TV"
  ]);

  // Form states
  const [newShow, setNewShow] = useState({
    title: '',
    service: '',
    customService: '',
    watchingWith: '',
    season: 1,
    episode: 1
  });

  // Load data from browser storage when app starts
  useEffect(() => {
    try {
      const savedWatching = localStorage.getItem('watchingList');
      const savedCompleted = localStorage.getItem('completedList');
      const savedServices = localStorage.getItem('streamingServices');
      
      if (savedServices) {
        setStreamingServices(JSON.parse(savedServices));
      }
      
      if (savedWatching) {
        setWatchingList(JSON.parse(savedWatching));
      } else {
        // Default shows for first time users
        setWatchingList([
          {
            id: 1,
            title: "The Bear",
            service: "Hulu",
            season: 3,
            episode: 5,
            totalEpisodes: 28,
            watchingWith: "Sarah",
            rating: 5,
            genre: "Comedy/Drama",
            notes: "Amazing show! Can't wait for next episode.",
            status: "watching"
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
            genre: "Fantasy/Drama",
            notes: "Great visuals but slow pacing.",
            status: "watching"
          }
        ]);
      }

      if (savedCompleted) {
        setCompletedList(JSON.parse(savedCompleted));
      }
      
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoaded(true);
    }
  }, []);

  // Save data to browser storage whenever lists change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('watchingList', JSON.stringify(watchingList));
      } catch (error) {
        console.error('Error saving watching list:', error);
      }
    }
  }, [watchingList, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('completedList', JSON.stringify(completedList));
      } catch (error) {
        console.error('Error saving completed list:', error);
      }
    }
  }, [completedList, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('streamingServices', JSON.stringify(streamingServices));
      } catch (error) {
        console.error('Error saving streaming services:', error);
      }
    }
  }, [streamingServices, isLoaded]);

  const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    margin: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const smallButtonStyle = {
    ...buttonStyle,
    padding: '6px 12px',
    fontSize: '12px',
    margin: '2px'
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

  const handleServiceChange = (value) => {
    setNewShow({...newShow, service: value});
    setShowCustomService(value === 'Other');
  };

  const handleAddShow = () => {
    let finalService = newShow.service;
    
    // If "Other" was selected and custom service was entered
    if (newShow.service === 'Other' && newShow.customService.trim()) {
      finalService = newShow.customService.trim();
      
      // Add the new service to the list if it doesn't exist
      if (!streamingServices.includes(finalService)) {
        const updatedServices = [...streamingServices, finalService].sort();
        setStreamingServices(updatedServices);
      }
    }

    if (newShow.title && finalService && finalService !== 'Other') {
      const show = {
        id: Date.now(),
        title: newShow.title,
        service: finalService,
        season: newShow.season,
        episode: newShow.episode,
        totalEpisodes: 20, // default
        watchingWith: newShow.watchingWith || 'Solo',
        rating: 0, // Start with 0 stars
        genre: 'Unknown',
        notes: '',
        status: 'watching'
      };
      
      setWatchingList([...watchingList, show]);
      setNewShow({ title: '', service: '', customService: '', watchingWith: '', season: 1, episode: 1 });
      setShowCustomService(false);
      setShowAddModal(false);
      alert('Show added successfully!');
    } else {
      if (newShow.service === 'Other' && !newShow.customService.trim()) {
        alert('Please enter the streaming service name!');
      } else {
        alert('Please fill in show name and service!');
      }
    }
  };

  const updateRating = (showId, newRating) => {
    setWatchingList(watchingList.map(show => 
      show.id === showId ? { ...show, rating: newRating } : show
    ));
  };

  const markAsCompleted = (showId) => {
    const show = watchingList.find(s => s.id === showId);
    if (show) {
      setCompletedList([...completedList, { ...show, status: 'completed' }]);
      setWatchingList(watchingList.filter(s => s.id !== showId));
      alert(`"${show.title}" moved to completed shows!`);
    }
  };

  const removeShow = (showId) => {
    const show = watchingList.find(s => s.id === showId);
    if (confirm(`Remove "${show.title}" from your list?`)) {
      setWatchingList(watchingList.filter(s => s.id !== showId));
    }
  };

  const removeCompleted = (showId) => {
    const show = completedList.find(s => s.id === showId);
    if (confirm(`Remove "${show.title}" from completed list?`)) {
      setCompletedList(completedList.filter(s => s.id !== showId));
    }
  };

  const nextEpisode = (showId) => {
    setWatchingList(watchingList.map(show => 
      show.id === showId ? { 
        ...show, 
        episode: show.episode + 1,
        // Move to next season if we've watched all episodes (simplified logic)
        season: show.episode >= 10 ? show.season + 1 : show.season,
        episode: show.episode >= 10 ? 1 : show.episode + 1
      } : show
    ));
    alert('Episode progress updated!');
  };

  const openNotesModal = (show) => {
    setSelectedShow(show);
    setCurrentNotes(show.notes || '');
    setShowNotesModal(true);
  };

  const saveNotes = () => {
    setWatchingList(watchingList.map(show => 
      show.id === selectedShow.id ? { ...show, notes: currentNotes } : show
    ));
    setShowNotesModal(false);
    setSelectedShow(null);
    setCurrentNotes('');
    alert('Notes saved!');
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear ALL your data? This cannot be undone.')) {
      localStorage.removeItem('watchingList');
      localStorage.removeItem('completedList');
      localStorage.removeItem('streamingServices');
      setWatchingList([]);
      setCompletedList([]);
      setStreamingServices(["Netflix", "Hulu", "HBO Max", "Disney+", "Apple TV+", "Prime Video", "Paramount+", "Peacock", "YouTube TV"]);
      alert('All data cleared!');
    }
  };

  const renderStars = (rating, showId = null, isClickable = false) => {
    if (!isClickable) {
      // Display-only stars
      return Array.from({length: 5}, (_, i) => (
        <span 
          key={i}
          style={{
            color: i < rating ? '#fbbf24' : '#d1d5db',
            fontSize: '18px',
            marginRight: '2px'
          }}
        >
          ⭐
        </span>
      ));
    }

    // Interactive rating buttons
    return (
      <div style={{display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap'}}>
        {Array.from({length: 5}, (_, i) => (
          <button
            key={i}
            onClick={() => updateRating(showId, i + 1)}
            style={{
              backgroundColor: i < rating ? '#fbbf24' : '#e5e7eb',
              color: i < rating ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              minWidth: '40px'
            }}
          >
            {i + 1}⭐
          </button>
        ))}
        <span style={{marginLeft: '10px', fontSize: '12px', color: '#6b7280'}}>
          ({rating}/5)
        </span>
      </div>
    );
  };

  // Show loading state while data loads
  if (!isLoaded) {
    return (
      <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center'}}>
        <h1>Loading your shows...</h1>
      </div>
    );
  }

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh'}}>
      <header style={{marginBottom: '30px'}}>
        <h1 style={{fontSize: '32px', fontWeight: 'bold', margin: '0'}}>What Are We Watching</h1>
        <p style={{color: '#6b7280', marginTop: '5px'}}>Track, share, and discover your streaming journey</p>
        <p style={{color: '#059669', fontSize: '12px', marginTop: '5px'}}>
          💾 Your data is automatically saved in your browser!
        </p>
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
          style={{...buttonStyle, backgroundColor: '#dc2626'}}
          onClick={clearAllData}
        >
          🗑️ Clear All Data
        </button>
      </div>

      <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>
        Currently Watching ({watchingList.length} shows)
      </h2>
      
      {watchingList.length === 0 ? (
        <div style={cardStyle}>
          <p style={{textAlign: 'center', color: '#6b7280'}}>
            No shows yet! Click "Add Show or Movie" to get started.
          </p>
        </div>
      ) : (
        watchingList.map(show => (
          <div key={show.id} style={cardStyle}>
            <h3 style={{fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0'}}>
              {show.title === 'The Bear' ? '🐻' : show.title === 'House of the Dragon' ? '🐉' : '📺'} {show.title}
            </h3>
            <p style={{color: '#6b7280', margin: '5px 0'}}>{show.service} • {show.genre}</p>
            <p style={{margin: '5px 0'}}>Progress: S{show.season}E{show.episode} of {show.totalEpisodes} episodes</p>
            <p style={{margin: '5px 0'}}>With {show.watchingWith}</p>
            
            <div style={{margin: '10px 0'}}>
              <strong>Rating:</strong>
              <div style={{marginTop: '5px'}}>
                {renderStars(show.rating, show.id, true)}
              </div>
            </div>

            {show.notes && (
              <div style={{margin: '10px 0', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '6px'}}>
                <strong>Notes:</strong> {show.notes}
              </div>
            )}

            <div style={{marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
              <button 
                style={{...smallButtonStyle, backgroundColor: '#3b82f6'}}
                onClick={() => nextEpisode(show.id)}
                title="Mark next episode as watched"
              >
                ▶️ Watch Next
              </button>
              <button 
                style={{...smallButtonStyle, backgroundColor: '#059669'}}
                onClick={() => markAsCompleted(show.id)}
                title="Mark entire show as completed"
              >
                ✅ Mark Complete
              </button>
              <button 
                style={{...smallButtonStyle, backgroundColor: '#7c3aed'}}
                onClick={() => openNotesModal(show)}
                title="Add/edit notes about this show"
              >
                📝 Notes
              </button>
              <button 
                style={{...smallButtonStyle, backgroundColor: '#dc2626'}}
                onClick={() => removeShow(show.id)}
                title="Remove show from list"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))
      )}

      {completedList.length > 0 && (
        <>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', marginTop: '40px'}}>
            Completed Shows ({completedList.length})
          </h2>
          {completedList.map(show => (
            <div key={`completed-${show.id}`} style={{...cardStyle, opacity: 0.8}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div style={{flex: 1}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0'}}>
                    ✅ {show.title}
                  </h3>
                  <p style={{color: '#6b7280', margin: '5px 0'}}>{show.service} • Completed</p>
                  <div style={{margin: '5px 0'}}>
                    Final Rating: {renderStars(show.rating, null, false)}
                  </div>
                  {show.notes && (
                    <p style={{margin: '5px 0', fontStyle: 'italic'}}>"{show.notes}"</p>
                  )}
                </div>
                <button 
                  style={{...smallButtonStyle, backgroundColor: '#dc2626', marginLeft: '10px'}}
                  onClick={() => removeCompleted(show.id)}
                  title="Remove from completed list"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </>
      )}

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
              onChange={(e) => handleServiceChange(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select service...</option>
              {streamingServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
              <option value="Other">Other (add new service)</option>
            </select>

            {showCustomService && (
              <input 
                type="text" 
                placeholder="Enter streaming service name"
                value={newShow.customService}
                onChange={(e) => setNewShow({...newShow, customService: e.target.value})}
                style={inputStyle}
              />
            )}

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
                onClick={() => {
                  setShowAddModal(false);
                  setShowCustomService(false);
                  setNewShow({ title: '', service: '', customService: '', watchingWith: '', season: 1, episode: 1 });
                }}
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

      {/* Notes Modal */}
      {showNotesModal && (
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
            <h2 style={{margin: '0 0 20px 0'}}>Notes for "{selectedShow?.title}"</h2>
            <textarea
              placeholder="Add your thoughts, reviews, or reminders about this show..."
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              style={{
                ...inputStyle,
                height: '100px',
                resize: 'vertical'
              }}
            />
            <div style={{display: 'flex', gap: '10px'}}>
              <button 
                style={{...buttonStyle, backgroundColor: '#6b7280', flex: 1}}
                onClick={() => setShowNotesModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{...buttonStyle, flex: 1}}
                onClick={saveNotes}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
