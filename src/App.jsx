import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar.jsx';
import SongList from './components/SongList.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('foryou');
  const [currentSong, setCurrentSong] = useState(songs[0]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        setSongs(response.data.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  const filteredSongs = songs.filter(song => 
    activeTab === 'toptracks' ? song.top_track : true
  );

  return (
    <div className="w-full flex" 
    style={{background: `linear-gradient(108.18deg, ${currentSong ? currentSong?.accent : '#201606'} 2.46%, #000000 99.84%)`}}>
      <Sidebar />
      <div className="flex-grow flex">
        <SongList 
          songs={filteredSongs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          onSongSelect={handleSongSelect}
        />
        <MusicPlayer song={currentSong} />
      </div>
    </div>
  );
}

export default App;
