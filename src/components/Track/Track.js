import React, { useState, useRef } from "react";
import './Track.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons'

function Track({ track, onAddToPlaylist, onRemoveFromPlaylist, isRemovable, isPlayable }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
    
    const audioRef = useRef(null);

    const handleAddClick = () => {
        onAddToPlaylist(track);
    }
    const handleRemoveClick = () => {
        onRemoveFromPlaylist(track);
    }
    const handlePlay = () => {
        if (currentPlayingIndex === track.id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            const currentlyPlaying = document.getElementById(`track-id-${currentPlayingIndex}`);
            if (currentlyPlaying) {
                currentlyPlaying.pause();
            }
            audioRef.current.play();
            setIsPlaying(true);
            setCurrentPlayingIndex(track.id);
        }
    }

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setCurrentPlayingIndex(null);
    }

    return (
        <div className="track">
            <div className="track-container">
                {!isPlayable ? (
                <div className="playback-icon-placeholder" />
                ) : (
                <button className='playback-icon' onClick={handlePlay} disabled={!track.preview_url}>
                    <FontAwesomeIcon icon={currentPlayingIndex === track.id ? (isPlaying ? faCirclePause : faCirclePlay) : faCirclePlay} />
                </button>
                )}
                <audio id={`track-id-${track.id}`} ref={audioRef} src={track.preview_url} onEnded={handleAudioEnd}/>
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