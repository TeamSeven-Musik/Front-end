import React, { useContext, useRef } from "react";
import Sidebar from "../layouts/components/Sidebar";
import Player from "../layouts/components/Player";
import Navbar from "../layouts/components/Navbar";
import AlbumSongItem from "../layouts/components/AlbumSongItem";
import { albumsData, assets } from "../assets/assets";
import { songsData } from "../assets/assets";
import { useLocation } from "react-router-dom";
import {PlayerContext} from "./context/PlayerContext";
const Home = () => {
  const location = useLocation();
  const albumOrSong = location.state || {};
  const {audioRef,track,playwithId} = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90] flex">
        <Sidebar />
        <div className={`w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0`} style={{
        background: albumOrSong.isAlbum
        ? `linear-gradient(to bottom, ${albumOrSong.bgColor}, #121212)`: `#121212`,
  }}
>
          <Navbar />
          {location.pathname === "/" ? (
            <>
              <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Feature Charts</h1>
                <div className="flex overflow-auto">
                  {albumsData.map((item, index) => (
                    <AlbumSongItem
                      key={index}
                      image={item.image}
                      name={item.name}
                      desc={item.desc}
                      id={item.id}
                      isAlbum={true}
                      bgColor={item.bgColor}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
                <div className="flex overflow-auto">
                  {songsData.map((item, index) => (
                    <AlbumSongItem
                      key={index}
                      image={item.image}
                      name={item.name}
                      desc={item.desc}
                      id={item.id}
                      isAlbum={false}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
                <img className="w-48 rounded" src={albumOrSong.image} alt="" />
                <div className="flex flex-col">
                  <p>Playlist</p>
                  <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                    {albumOrSong.name}
                  </h2>
                  <p className="mt-1">
                    <img
                      className="inline-block w-5"
                      src={assets.spotify_logo}
                      alt=""
                    />
                    <b>Spotify</b>• • <b>50 songs,</b>
                    about 2hr 30 min
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:gird-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p className="mr-4">
                  #<b>Title</b>
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img
                  className="w-4 justify-items-center"
                  src={assets.clock_icon}
                  alt=""
                />
              </div>
              <hr />
              {songsData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff cursor-pointer"
                  onClick={()=>(playwithId(item.id))}
                >
                  <p className="text-white" >
                    <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                    <img className="inline w-10 mr-5" src={item.image} alt="" />
                    {item.name}
                  </p>
                  <p className="text-[15px]">{albumOrSong.name}</p>
                  <p className="text-[15px] hidden sm:block">5 days ago</p>
                  <p className="text-[15px] text-center">{item.duration}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"> </audio>
    </div>
  );
};

export default Home;
