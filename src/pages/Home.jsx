import React, { useContext } from "react";
import Sidebar from "../layouts/components/Sidebar";
import Player from "../layouts/components/Player";
import Navbar from "../layouts/components/Navbar";
import AlbumSongItem from "../layouts/components/AlbumSongItem";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "./context/PlayerContext";
import Queue from "../layouts/components/Queue";
import { assets } from "../assets/assets";

const Home = () => {
  const location = useLocation();
  const albumOrSong = location.state || {};
  const { audioRef, track, playwithId, showQueue, albumsData, songsData } = useContext(PlayerContext);

  // Hàm chuyển đổi giây sang định dạng MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-black">
      <div className="h-[90] flex">
        <Sidebar />
        <div className={`w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0`}>
          <Navbar />
          {location.pathname === "/" ? (
            <>
              <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">All Albums</h1>
                <div className="grid grid-cols-10 gap-4">
                  {albumsData.map((item, index) => (
                    <AlbumSongItem
                      key={index}
                      id={item.albumId}
                      img={item.img}
                      name={item.albumName}
                      artistIds={item.artistIds}
                      trackIds={item.trackIds}
                      isAlbum={true}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">All Track</h1>
                <div className="grid grid-cols-10 gap-4">
                  {songsData.map((item, index) => (
                    <AlbumSongItem
                      key={index}
                      img={item.img}
                      name={item.trackName}
                      id={item.trackId}
                      isAlbum={false}
                    >
                      <div className="text-sm text-gray-400 mt-1">
                        {item.artists.map((artist, artistIndex) => (
                          <span key={artistIndex}>
                            {artist.name}
                            {artistIndex < item.artists.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </AlbumSongItem>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
                <img className="w-48 rounded" src={albumOrSong.img} alt="" />
                <div className="flex flex-col">
                  <p>Album</p>
                  <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumOrSong.name}</h2>
                  <p className="mt-1">
                    <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                    <b>Spotify</b>• • <b>50 songs</b> ,31 min 46 sec
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:gird-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p className="mr-4">
                  # <b>Title</b>
                </p>
                <p></p>
                <p className="hidden sm:block">Add Date</p>
                <img className="w-4 justify-items-center" src={assets.clock_icon} alt="" />
              </div>
              <hr />
              {albumOrSong.tracks.map((track, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff cursor-pointer"
                  onClick={() => playwithId(track.trackId)}
                >
                  <p className="text-white">
                    <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                    {track.trackName}
                  </p>
                  <p></p>
                  <p className="text-[15px]">{track.createdDate}</p>
                  <p className="text-[15px]">{formatDuration(track.duration)}</p>
                </div>
              ))}
            </>
          )}
        </div>
        {showQueue && <Queue />}
      </div>
      <Player />
      <audio ref={audioRef} src={track.trackBlobsLink} preload="auto"></audio>
    </div>
  );
};

export default Home;
