import React, { useState, useEffect } from "react";
import './Track.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons'

function Track({ track, onAddToPlaylist, onRemoveFromPlaylist, isRemovable, isPlayable }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio(track.preview_url));
    
    useEffect(() => {
        audio.addEventListener('ended', handleAudioEnd);
        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [audio]);

    const handleAddClick = () => {
        onAddToPlaylist(track);
    }
    const handleRemoveClick = () => {
        onRemoveFromPlaylist(track);
    }
    const handlePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }

    const handleAudioEnd = () => {
        setIsPlaying(false);
    }

    return (
        <div className="track">
            <div className="track-container">
                {!isPlayable ? (
                <div className="playback-icon-placeholder" />
                ) : (
                <button className='playback-icon' onClick={handlePlay} disabled={!track.preview_url}>
                    <FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} />
                </button>
                )}
                <div className="track-text">
                    <h3>{track.name}</h3>
                    <p>{track.artists[0].name} | {track.album.name}</p>
                </div>
                <div className="track-button">
                    {isRemovable ? (
                    <button className='button' onClick={handleRemoveClick}>-</button>
                    ) : (
                    <button className='button' onClick={handleAddClick}>+</button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Track;