import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import SongList from './components/SongList.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('foryou');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songContainer, setSongContainer] = useState([]);
  const [showSongList, setShowSongList] = useState(false);

  useEffect(() => {
    const fetchSongsWithDuration = async () => {
      try {
        // Fetch the songs list from the API
        const response = await fetch('https://cms.samespace.com/items/songs');
        const data = await response.json();
        
        // Array to hold the updated songs with durations
        const updatedSongs = [];
    
        for (let song of data.data) {
          // Create an audio element to load the song and get its duration
          const audio = new Audio(song.url);
          
          // Wait for the metadata to load, then retrieve the duration
          await new Promise((resolve) => {
            audio.addEventListener('loadedmetadata', () => {
              const duration = audio.duration; // Duration in seconds
              const minutes = Math.floor(duration / 60);
              const seconds = Math.floor(duration % 60);
              const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
              
              // Add the formatted duration as a new key to the song object
              updatedSongs.push({ ...song, duration: formattedDuration });
    
              resolve(); // Resolve the promise after duration is retrieved
            });
          });
        }

        setSongs(updatedSongs);
        setSongContainer(updatedSongs);
      } catch (error) {
        console.error("Error fetching songs or calculating durations:", error);
      }
    };
    
    fetchSongsWithDuration();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredSongs = songs.filter(song => 
    activeTab === 'toptracks' ? song.top_track : true
  )

  const handleSongSelect = (songID) => {
    showSongList && setShowSongList(!setShowSongList);
    setSongContainer(filteredSongs)
    setCurrentSongIndex(songID);
  };

  const currentSong = songContainer[currentSongIndex];

  return (
    <div className="w-full flex min-h-screen flex-col xl:flex-row h-auto" 
    style={{
      background: `linear-gradient(108.18deg, ${currentSong ? currentSong?.accent : '#201606'} 2.46%, #000000 99.84%)`,
      transition: 'background-color 0.8s ease-in-out'
      }}
    >
      <Sidebar setShowSongList={setShowSongList} showSongList={showSongList}/>
      <div className={`w-full lg:flex-grow ${showSongList ? 'flex-col-reverse':'flex-col'} flex lg:flex-row`}>
        <SongList 
          songs={filteredSongs}
          activeTab={activeTab} 
          currentSong={currentSong}
          showSongList={showSongList}
          onTabChange={handleTabChange} 
          onSongSelect={handleSongSelect}
        />
        <MusicPlayer 
          songs={songContainer}
          currentSongIndex={currentSongIndex} 
          showSongList={showSongList}
          setCurrentSongIndex={setCurrentSongIndex}
        />
      </div>
      <button
          className="lg:hidden w-full flex-1 bg-[#FFFFFF14] text-white font-semibold sticky bottom-0 z-50 text-4xl p-6 rounded-lg"
          onClick={() => setShowSongList(!showSongList)}
        >
          {showSongList ? 'Close Songs' : 'Show Songs'}
      </button>
    </div>
  );
}

export default App;
