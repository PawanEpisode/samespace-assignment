import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar.jsx';

const App = () => {
  const [songs, setSongs] = useState([]);
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

  console.log('somgs', songs);

  return (
    <div className="w-full flex flex-col">
      <Sidebar />
    </div>
  );
}

export default App;
