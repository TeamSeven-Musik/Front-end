import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../pages/context/PlayerContext";
import api from "../../config/axios"; // Import axios instance

const AlbumSongItem = ({ img, name, artistIds, id, isAlbum, trackIds }) => {
  const navigate = useNavigate();
  const { playwithId } = useContext(PlayerContext);

  const [artists, setArtists] = useState([]); // Lưu danh sách nghệ sĩ
  const [tracks, setTracks] = useState([]); // Lưu danh sách bài hát

  const fetchArtists = async () => {
    try {
      const artistsPromises = artistIds.map((artistId) =>
        api.get(`/artist/${artistId}`) // Gửi request cho từng artistId
      );
      const responses = await Promise.all(artistsPromises); // Chờ tất cả request hoàn thành
      const allArtists = responses.map((response) => response.data); // Gộp tất cả kết quả
      setArtists(allArtists); // Lưu danh sách nghệ sĩ vào state
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const fetchTracks = async () => {
    try {
      const tracksPromises = trackIds.map((trackId) =>
        api.get(`/track/${trackId}`) // Gửi request cho từng trackId
      );
      const responses = await Promise.all(tracksPromises); // Chờ tất cả request hoàn thành
      const allTracks = responses.map((response) => response.data); // Gộp tất cả kết quả
      setTracks(allTracks); // Lưu danh sách bài hát vào state
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  useEffect(() => {
    if (artistIds && artistIds.length > 0) {
      fetchArtists(); // Gọi API để lấy danh sách nghệ sĩ
    }
  }, [artistIds]);

  useEffect(() => {
    if (trackIds && trackIds.length > 0) {
      fetchTracks(); // Gọi API để lấy danh sách bài hát
    }
  }, [trackIds]);

  const handleClick = () => {
    if (isAlbum) {
      navigate(`/albumsongdisplay`, {
        state: { img, name, artists, id, isAlbum, tracks }, // Truyền dữ liệu qua state
      });
    } else {
      playwithId(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 rounded cursor-pointer hover:bg-[#ffffff26] flex flex-col items-center"
    >
      <img
        className="rounded w-full aspect-square object-cover"
        src={img}
        alt=""
      />
      <p className="font-bold mt-2 mb-1 text-center truncate w-full">
        {name}
      </p>
    </div>
  );
};

export default AlbumSongItem;
