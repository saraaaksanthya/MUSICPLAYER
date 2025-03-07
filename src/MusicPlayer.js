// MusicPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import audio1 from './assets/Kannadi Poove.mp3';
import audio2 from './assets/Sithira-Puthiri.mp3';
import audio3 from './assets/Yedi.mp3';
import audio4 from './assets/Dhinam Oru Kavithai.mp3';
import audio5 from './assets/Vazhithunaiye.mp3';
import audio6 from './assets/Quit Pannuda.mp3';
import albumArt from './assets/album-art.jpeg';

import background from './assets/background.webp';

import './MusicPlayer.css';


const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const audioFiles = [
    { src: audio1, title: "Kannadi Poove", artist: "Santhosh Narayanan", duration: "4:21" },
    { src: audio2, title: "Sithira Puthiri", artist: "Sai Abhyankkar", duration: "3:46" },
    { src: audio3, title: "Yedi", artist: "GV Prakash", duration: "3:21" },
    { src: audio4, title: "Dhinam oru Kavithai", artist: "Sriram Srinivasan", duration: "1:42" },
    { src: audio5, title: "Vazhithunaye", artist: "Leon James", duration: "3:38" },
    { src: audio6, title: "Quit Pannuda", artist: "Anirudh Ravichandher", duration: "4:16" },
  ];

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + audioFiles.length) % audioFiles.length);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const duration = Math.floor(audioRef.current.duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      audioFiles[currentTrackIndex].duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [currentTrackIndex]);

  return (
    <div className="music-player-container">
      <div className="music-player">
        <audio
          ref={audioRef}
          src={audioFiles[currentTrackIndex].src}
          onTimeUpdate={updateProgress}
        ></audio>
        <img src={albumArt} alt="Album Art" className="album-art" />
        <div className="track-details">
          <h3>{audioFiles[currentTrackIndex].title}</h3>
          <p>{audioFiles[currentTrackIndex].artist}</p>
          <p>{audioFiles[currentTrackIndex].duration}</p>
        </div>
        <button onClick={previousTrack}><span>Previous</span></button>
        <button onClick={togglePlayPause}><span>{isPlaying ? 'Pause' : 'Play'}</span></button>
        <button onClick={nextTrack}><span>Next</span></button>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
