import React, { useState } from 'react';
import './Tracklist.css';
import Track from '../Track/Track';
import SearchBar from '../SearchBar/SearchBar';

function Tracklist({ token, playlist, setPlaylist, onAddToPlaylist, onRemoveFromPlaylist }) {
  const [searchResults, setSearchResults] = useState([]);
  const [currentSample, setCurrentSample] = useState(null);

  const handlePlaySample = (previewUrl) => {
    if (currentSample !== null) {
      const currentlyPlaying = document.getElementById(`track-id-${currentSample}`);
      if (currentlyPlaying) {
        currentlyPlaying.pause();
      }
    }

    if (currentSample === previewUrl) {
      setCurrentSample(null);
    } else {
      setCurrentSample(previewUrl);
    }
  }

  return (
    <div className="tracklist-container">
      <div className='tracklist-header'>
        <h2>Search</h2>
      </div>
      <SearchBar token={token} onSearchResults={setSearchResults} />
      <ul>
        {searchResults.map((track) => (
          <li key={track.id}>
            <Track
              track={track}
              onAddToPlaylist={onAddToPlaylist}
              onRemoveFromPlaylist={onRemoveFromPlaylist}
              playlist={playlist}
              setPlaylist={setPlaylist}
              onPlaySample={handlePlaySample}
              currentSample={currentSample}
              isPlayable={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracklist;