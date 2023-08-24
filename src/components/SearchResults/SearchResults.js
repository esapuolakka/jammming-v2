import React from 'react';
import Track from '../Track/Track';
import './SearchResults.css';


function SearchResults({ searchResults, onAddToPlaylist }) {

  return (
    <div className="search-results">
      {searchResults.map((track) => (
        <Track key={track.id} track={track} onAddToPlaylist={onAddToPlaylist} />
      ))}
    </div>
  );
}

export default SearchResults;