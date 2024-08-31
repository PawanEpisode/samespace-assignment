import React, { useState } from "react";
import Tab from "./Tab.jsx";
import searchicon from '../assets/searchicon.png';
import { MdCancel } from "react-icons/md";

const SongList = ({ songs, activeTab, onTabChange, onSongSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter((song) =>
    (
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

const getSongDuration = (song) => {
    const duration = song.id * 300 * Math.random();
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


  return (
    <div className="w-5/12 p-6">
      <div className="flex gap-10">
        <Tab
          active={activeTab === "foryou"}
          onClick={() => onTabChange("foryou")}
          label="For You"
        />
        <Tab
          active={activeTab === "toptracks"}
          onClick={() => onTabChange("toptracks")}
          label="Top Tracks"
        />
      </div>

      <div className="flex mt-4 justify-between bg-[#FFFFFF14] px-4 py-2 rounded-lg">
        <input
          type="text"
          placeholder="Search Song, Artist"
          className="w-full bg-transparent text-white text-opacity-50 placeholder:text-opacity-50 placeholder:text-white outline-none border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm('')}>
            {searchTerm ? <MdCancel size={30}/>:<img src={searchicon} alt="search icon"/>}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="w-full flex justify-between items-center p-4 bg-transparent rounded-md cursor-pointer"
            onClick={() => onSongSelect(song)}
          >
            <div className="flex items-center justify-center">
                <img 
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    alt={song.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-normal text-white">{song.name}</h2>
                    <p className="text-lg font-normal text-white text-opacity-60">{song.artist}</p>
                </div>
            </div>
            <span className="text-lg text-white text-opacity-50">{getSongDuration(song)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
