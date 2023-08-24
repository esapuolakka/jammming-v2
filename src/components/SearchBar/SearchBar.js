import React, { useEffect, useState } from 'react'
import './SearchBar.css';


function SearchBar({token, onSearchResults}) {


    const [query, setQuery] = useState('');

        const handleSearch = async () => {
          if (query === '') {
            onSearchResults([]);
            return;
          }
    
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
                console.log('Search failed:', response.statusText);
              }
            } catch (error) {
              console.log('Error during search:', error);
            }
          };

        useEffect(() => {
            handleSearch();
        }, [query, token]);


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