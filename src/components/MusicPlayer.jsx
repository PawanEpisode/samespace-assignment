import React, { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import playicon from '../assets/playicon.png';
import nexticon from '../assets/nexticon.png';
import previousicon from '../assets/previousicon.png';
import pauseicon from '../assets/pauseicon.png';

const MusicPlayer = ({ songs, currentSongIndex, setCurrentSongIndex }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex];
  // Play or Pause the audio
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play the next song
  const playNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);  // Auto-play next song
  };

  // Play the previous song
  const playPrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);  // Auto-play previous song
  };

  // Update the seeker position as the song progresses
  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Handle when the song ends (auto-play next)
  const onEnded = () => {
    playNext();
  };

  // Seek to a position in the song
  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong) {
      audio.src = currentSong.url;
      if (isPlaying) {
        audio.play();
      }
    }
    
    // Get song duration
    audio?.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio?.removeEventListener('loadedmetadata', () => {});
    };
  }, [currentSongIndex, isPlaying]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="w-7/12 px-20 py-20 flex flex-col">
      {currentSong ? (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full text-left flex gap-2 flex-col">
              <h3 className="text-white text-4xl font-bold ">{currentSong.name}</h3>
              <p className="text-white text-lg font-normal text-opacity-60">{currentSong.artist}</p>
          </div>
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x:  '0%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-[500px] h-[500px] rounded-lg flex gap-6 flex-col">
            <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt="Song Cover"
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Seeker / Progress Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 appearance-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, white ${currentTime / duration * 100}%, #4A5568 0%)`,
              }}
            />
          </motion.div>

          {/* Controls */}
          <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x:  '0%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="w-full flex justify-center items-center mt-8">
            <button onClick={playPrevious} className="mx-2">
            <img src={previousicon} alt="previous-button"/>
            </button>
            <button onClick={togglePlayPause} className="mx-2">
              {isPlaying ? <img src={playicon} alt="play-button"/> : <img src={pauseicon} alt="pause-button"/>}
            </button>
            <button onClick={playNext} className="mx-2">
              <img src={nexticon} alt="next-button"/>
            </button>
          </motion.div>

          {/* Audio element */}
          <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} />
        </div>
      ) : (
        <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">Song Name</h3>
            <p className="text-gray-500">Artist</p>
        </div>
      )}
    </motion.div>
  );
};

export default MusicPlayer;
