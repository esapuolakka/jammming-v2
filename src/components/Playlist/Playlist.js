import React, {useState} from 'react'
import './Playlist.css'
import Track from '../Track/Track'

function Playlist({ playlist, onRemoveFromPlaylist, onSavePlaylist, onSaveMessage }) {
  const [playlistName, setPlaylistName] = useState('')

  const handleSavePlaylist = () => {
    onSavePlaylist(playlistName, playlist)
    setPlaylistName('')
  }

  return (
    <div className='playlist-container'>
      <div className='playlist-header'>
        <h2>Playlist</h2>
        <button onClick={handleSavePlaylist}>Save</button>
      </div>
      <div className='playlist-input'>
        <input
          type='text'
          placeholder='Type playlist name'
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>
      <ul>
        {playlist.map((track) => (
          <li key={track.id}>
            <Track
              track={track}
              onRemoveFromPlaylist={onRemoveFromPlaylist}
              isRemovable={true}
              isPlayable={false}
            />
          </li>
        ))}
        { onSaveMessage && <p className='save-message'>{onSaveMessage}</p> }
      </ul>
    </div>
  );
}

export default Playlist;
