import React, { useRef, useState, useEffect } from 'react';
import audio1 from './assets/Kannadi Poove.mp3';
import audio2 from './assets/Sithira-Puthiri.mp3';
import audio3 from './assets/Yedi.mp3';
import audio4 from './assets/Dhinam Oru Kavithai.mp3';
import audio5 from './assets/Vazhithunaiye.mp3';
import audio6 from './assets/Quit Pannuda.mp3';
import audio7 from './assets/Thangamey.mp3';
import audio8 from './assets/Yennai Izhukkuthadi.mp3';
import audio9 from './assets/K for Kabaradakkam.mp3';
import audio10 from './assets/Thaaye Thaaye.mp3';
import albumArt from './assets/album-art.jpeg';
import background from './assets/background.webp';
import previousLogo from './assets/previous.png';
import playLogo from './assets/play.png';
import pauseLogo from './assets/pause.png';
import nextLogo from './assets/next.png';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioFiles = [
    { src: audio1, title: "Kannadi Poove", artist: "Santhosh Narayanan", duration: "4:21" },
    { src: audio2, title: "Sithira Puthiri", artist: "Sai Abhyankkar", duration: "3:46" },
    { src: audio3, title: "Yedi", artist: "GV Prakash", duration: "3:21" },
    { src: audio4, title: "Dhinam oru Kavithai", artist: "Sriram Srinivasan", duration: "1:42" },
    { src: audio5, title: "Vazhithunaye", artist: "Leon James", duration: "3:38" },
    { src: audio6, title: "Quit Pannuda", artist: "Anirudh Ravichandher", duration: "4:16" },
    { src: audio7, title: "Thangamey", artist: "Anirudh Ravichandher", duration: "4:22" },
    { src: audio8, title: "Yennai Izhukkuthadi", artist: "AR Rahman", duration: "3:48" },
    { src: audio9, title: "K for Kabaradakkam", artist: "Asal Kolaar", duration: "2:25" },
    { src: audio10, title: "Thaaye Thaaye", artist: "Sid Sriram", duration: "3:38" },
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
    setCurrentTime(audioRef.current.currentTime);
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
      setDuration(audioRef.current.duration);
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

  useEffect(() => {
    const handleSongEnd = () => {
      nextTrack();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleSongEnd);
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
        <div className="controls">
          <button onClick={previousTrack}>
            <img src={previousLogo} alt="Previous" className="control-icon" />
          </button>
          <button onClick={togglePlayPause}>
            <img src={isPlaying ? pauseLogo : playLogo} alt="Play/Pause" className="control-icon" />
          </button>
          <button onClick={nextTrack}>
            <img src={nextLogo} alt="Next" className="control-icon" />
          </button>
        </div>
        <div className="progress-bar">
          <input
            type="range"
            value={currentTime}
            max={audioRef.current ? audioRef.current.duration : 0}
            onChange={(e) => {
              const audio = audioRef.current;
              audio.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            }}
            className="progress-range"
          />
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
