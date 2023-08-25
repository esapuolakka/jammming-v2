import React, { useEffect, useState } from 'react'
import './SearchBar.css';


function SearchBar({token, onSearchResults}) {

  const [query, setQuery] = useState('');

  useEffect(() => {

    if (query === '') {
      onSearchResults([]);
      return;
    }

    const handleSearch = async () => {
    
      try {
        const searchUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;
        const response = await fetch(searchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const newSearchResults = data.tracks.items;
          onSearchResults(newSearchResults);
        } else {
          console.error('Search failed:', response.statusText);
          }
      } catch (error) {
        console.error('Error during search:', error);
      }
    };

    handleSearch();
  }, [query, token, onSearchResults]);


    return (
        <div className="search">
            <input
                placeholder="Search for tracks..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;