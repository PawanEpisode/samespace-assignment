import React from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const MusicPlayer = ({ song }) => {
  return (
    <div className="w-4/12 p-4 shadow-lg flex flex-col justify-between">
      {song ? (
        <>
            <div className="text-center mt-4">
                <h3 className="text-lg font-semibold">{song.name}</h3>
                <p className="text-gray-500">{song.artist}</p>
            </div>
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt="Song Cover"
            className="h-40 w-full object-cover"
          />

          <div className="flex justify-center items-center mt-4">
            <button className="mx-2">
              <FaBackward />
            </button>
            <button className="mx-2">
              <FaPlay />
            </button>
            <button className="mx-2">
              <FaForward />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">Song Name</h3>
            <p className="text-gray-500">Artist</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
