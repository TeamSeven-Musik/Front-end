import React from "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>

        <div className="flex items-center gap-3 pl-8 cursor-pointer" onClick={() => setShowSearchInput(!showSearchInput)}>
          <p className="font-bold">Search</p>
        </div>
        {showSearchInput && (
          <div className="mt-2 flex items-center gap-2 pl-8">
          <div className="relative w-full pr-8">
            <input
              type="text"
              placeholder="Search some track,postcast..."
              className="w-[90%] p-2 pl-10 rounded-full border border-gray-400 text-white bg-black 
                      placeholder-gray-400 focus:outline-none focus:border-white focus:placeholder-white"
            />
            <img
              src={assets.search_icon}
              alt="search-icon"
              className="w-5 absolute left-2 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>        
        )}
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.library_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center space-x-2">
            <img
              className="w-4 h-4 border-none hover:bg-gray-500 rounded-full"
              src={assets.plus_icon}
              alt=""
            />
            <img
              className="w-4 h-4 border-none hover:bg-gray-500 rounded-full"
              src={assets.arrow_icon}
              alt=""
            />
          </div>
        </div>
        {/*Playlist*/}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.playlist_icon} alt="" />
            <h1>Create your first playlist</h1>
          </div>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create Playlist
          </button>
        </div>
        {/*Favorite*/}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.favorite_icon} alt="" />
            <h1>Let's find some your favorite</h1>
          </div>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Go to favorite
          </button>
        </div>
        {/*Album*/}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.album_icon} alt="" />
            <h1>Create some album</h1>
          </div>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create your album
          </button>
        </div>
        {/*Postcast*/}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.podcast_icon} alt="" />
            <h1>Postcasts for you</h1>
          </div>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
        {/*Uploaded ,bxh new track, musikchart, category and topic */}
        <div className="p-4 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-64">
            <div className="flex items-center justify-center hover:bg-[#242424] transition-colors duration-300">
            <div className="flex items-center gap-3">
            <img className="w-8" src={assets.category_topic_icon} alt="" />
            <h1>Category and topic</h1>
          </div>
            </div>
            <div className="flex items-center justify-center hover:bg-[#242424] transition-colors duration-300">
            <div className="flex items-center gap-3">
            <img className="w-8" src={assets.bxh_new_track_icon} alt="" />
            <h1>Ranked List New Track</h1>
          </div>
            </div>
            <div className="flex items-center justify-center hover:bg-[#242424] transition-colors duration-300">
            <div className="flex items-center gap-3">
            <img className="w-8" src={assets.zingchart_icon} alt="" />
            <h1>#MusikChart</h1>
          </div>
            </div>
            <div className="flex items-center justify-center hover:bg-[#242424] transition-colors duration-300">
            <div className="flex items-center gap-3">
            <img className="w-8" src={assets.uploaded_icon} alt="" />
            <h1>Upload Track</h1>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
