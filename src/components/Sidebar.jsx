import React from "react";
import { motion } from 'framer-motion';
import spotifyLogo from '../assets/spotifylogo.svg';
import profilePhoto from '../assets/Profile.png';

const Sidebar = () => {
  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: '0%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="w-full h-auto xl:w-1/5 flex xl:flex-col justify-between items-center lg:py-8 p-4">
      <div className="w-full flex justify-center items-start flex-col gap-6">
        <img src={spotifyLogo} alt="Spotify" className="h-10 mb-8" />
      </div>
      <button className="rounded-full border-2 border-white p-2">
        <img
          src={profilePhoto}
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
      </button>
    </motion.div>
  )
};

export default Sidebar;
