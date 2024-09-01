import React, { useState } from "react";
import { motion } from 'framer-motion';
import Tab from "./Tab.jsx";
import searchicon from '../assets/searchicon.png';
import { MdCancel } from "react-icons/md";

const SongList = ({ songs, activeTab,currentSong, showSongList, onTabChange, onSongSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs?.filter((song) =>
    (
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const noSongAvailable = (!filteredSongs || filteredSongs.length === 0);

  return (
    <div className={`w-full ${showSongList ? 'block' : 'hidden'} lg:block lg:w-5/12 p-6`}>
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
        {noSongAvailable ? <div className="w-full flex justify-center items-center h-full">
        {/* Shimmer effect as a loading state */}
        <div className="animate-pulse w-full">
          <div className="h-20 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-20 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-20 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-20 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-20 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-20 bg-gray-700 rounded-lg mb-4"></div>
        </div>
      </div>:
        filteredSongs.map((song,songIndex) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: songIndex * 0.1, duration: 0.3 }}
            className={`w-full flex justify-between ${currentSong?.id === song.id ? 'bg-[#FFFFFF14]':'bg-transparent'} hover:bg-[#FFFFFF14] 
            items-center p-4 rounded-lg cursor-pointer`}
            onClick={() => onSongSelect(songIndex)}
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
            <span className="text-lg text-white text-opacity-50">{song.duration}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
