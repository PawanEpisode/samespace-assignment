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
      className="w-full lg:w-1/5 flex lg:flex-col justify-between items-center lg:py-8 p-4">
      <img src={spotifyLogo} alt="Spotify" className="h-10 mb-8" />
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
