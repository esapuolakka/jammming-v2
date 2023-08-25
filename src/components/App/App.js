import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Playlist from '../Playlist/Playlist';
import Tracklist from '../Tracklist/Tracklist';


const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = process.env.REACT_APP_SPOTIFY_SCOPES;


function App() {
 
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');


   // Authentication logic
   useEffect(() => {

   const authenticateSpotify = async () => {
    try {
      const hashParams = new URLSearchParams(window.location.hash.substr(1));
      const accessToken = hashParams.get('access_token');
  
      if (accessToken) {
        setToken(accessToken);

        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        });
        setUserId(userResponse.data.id);
      } else {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
        window.location.href = authUrl;
      }
    } catch (error) {
      console.log('Authentication error:', error);
    }
  };
    authenticateSpotify();
  }, []);


  // Playlist save logic
  const handleSavePlaylist = async (playlistName, playlistTracks) => {
    try {
      const accessToken = token;

      // Create a new playlist
      const createPlaylistResponse = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playlistName,
          public: false
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const playlistId = createPlaylistResponse.data.id;

      // Add tracks to the playlist
      const trackUris = playlistTracks.map(track => `spotify:track:${track.id}`);
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: trackUris },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      console.log('Playlist saved successfully');
      setSaveMessage('Playlist saved successfully!');
      clearPlaylist();

    } catch (error) {
      console.log('Error saving playlist:', error.message);
      setSaveMessage('Error saving playlist!');
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  if (!token) {
    return <div id='loading'>Loading...</div>;
  }

  const handleAddToPlaylist = (track) => {
    if (!playlist.some((item) => item.id === track.id)) {
      setSaveMessage('');
      setPlaylist([...playlist, track]);
      setSearchResults(searchResults.filter((item) => item.id !== track.id));
    }
  };

  const handleRemoveFromPlaylist = (track) => {
    setPlaylist(playlist.filter((item) => item.id !== track.id));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Jam<span className='green'>m</span>ming</h1>
        <p>Build your dream <span className='green'>Spotify</span> playlists</p>
      </div>
      <div className="main">
        <div className="results">
          <Tracklist
            token={token}
            playlist={playlist}
            setPlaylist={setPlaylist}
            onAddToPlaylist={handleAddToPlaylist}
            setSearchResults={handleSearchResults}
          />
          <Playlist
            playlist={playlist}
            onRemoveFromPlaylist={handleRemoveFromPlaylist}
            onSavePlaylist={handleSavePlaylist}
            onClearPlaylist={clearPlaylist}
            onSaveMessage={saveMessage}
          />
        </div>
      </div>
      <footer>
        <p>Copyright @ Esa Puolakka 2023</p>
      </footer>
    </div>
  );
}


export default App;
