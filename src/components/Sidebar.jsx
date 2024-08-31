import React from "react";
import spotifyLogo from '../assets/spotifylogo.svg';
import profilePhoto from '../assets/Profile.png';

const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen flex flex-col justify-between items-center py-8">
      <img src={spotifyLogo} alt="Spotify" className="h-10 mb-8" />
      <button className="rounded-full border-2 border-white p-2">
        <img
          src={profilePhoto}
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
      </button>
    </div>
  )
};

export default Sidebar;
