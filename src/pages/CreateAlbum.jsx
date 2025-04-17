import React, { useState, useEffect } from "react";
import { uploadImgBBOneFile } from "../config/imgBB"; // Import hàm upload ảnh
import api from "../config/axios"; // Import axios instance
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  const [albumName, setAlbumName] = useState(""); // State cho tên album
  const [artists, setArtists] = useState([]); // State cho danh sách nghệ sĩ từ API
  const [selectedArtist, setSelectedArtist] = useState([]); // State cho nghệ sĩ được chọn
  const [imageFile, setImageFile] = useState(""); // State cho link ảnh từ imgBB
  const [tracks, setTracks] = useState([]); // Danh sách track từ API
  const [selectedTracks, setSelectedTracks] = useState([]); // Danh sách track đã chọn
  const navigate = useNavigate();
  // Fetch danh sách nghệ sĩ từ API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/artist"); // Thay "/artist" bằng endpoint API của bạn
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      if (selectedArtist.length > 0) {
        try {
          const artistIds = selectedArtist.map((artist) => artist.artistId);
          const trackPromises = artistIds.map((artistId) =>
            api.get(`/track/get-track-by-artist/${artistId}`) // Gửi request cho từng artistId
          );
          const trackResponses = await Promise.all(trackPromises); // Chờ tất cả request hoàn thành
          const allTracks = trackResponses.flatMap((response) => response.data); // Gộp tất cả track lại
          setTracks(allTracks);
        } catch (error) {
          console.error("Error fetching tracks:", error);
        }
      } else {
        setTracks([]); // Xóa danh sách track nếu không có nghệ sĩ nào được chọn
      }
    };

    fetchTracks();
  }, [selectedArtist]);

  // Xử lý upload ảnh
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImgBBOneFile(file); // Upload ảnh lên imgBB
        setImageFile(imageUrl); // Lưu link ảnh vào state
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  // Xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!albumName || selectedArtist.length === 0 || !imageFile || selectedTracks.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        albumName,
        artistIds: selectedArtist.map((artist) => artist.artistId),
        trackIds: selectedTracks.map((track) => track.trackId), // Gửi danh sách track đã chọn
        img: imageFile,
      };

      const response = await api.post("/albums", payload); // Thay endpoint API phù hợp
      alert("Album created successfully!");
      console.log("Album created:", response.data);
    } catch (error) {
      console.error("Error creating album:", error);
      alert("Failed to create album. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-[#121212]"
                >
                    <span>
                    <IoArrowBackOutline />
                    </span>
                    Back
                </button>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-md bg-[#242424] p-6 rounded-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Create Album
        </h1>

        {/* Album Name */}
        <div>
          <label className="block mb-2 font-semibold text-white">Album Name</label>
          <input
            type="text"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            placeholder="Enter album name"
            className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
          />
        </div>

        {/* Dropdown Artists */}
        <div>
          <label className="block mb-2 font-semibold text-white">Artists</label>
          <select
            value={""}
            onChange={(e) => {
              const selectedArtist = {
                artistId: e.target.value,
                artistName: e.target.options[e.target.selectedIndex].text,
              };

              setSelectedArtist((prev) => {
                if (!prev.some((artist) => artist.artistId === selectedArtist.artistId)) {
                  return [...prev, selectedArtist];
                }
                return prev;
              });
            }}
            className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
          >
            <option value="" disabled hidden>
              Choose artist
            </option>
            {artists.map((artist) => (
              <option key={artist.artistId} value={artist.artistId}>
                {artist.artistName}
              </option>
            ))}
          </select>

          {/* Hiển thị danh sách nghệ sĩ đã chọn */}
          <div className="mt-2">
            {selectedArtist.map((artist) => (
              <span
                key={artist.artistId}
                className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {artist.artistName}
                <button
                  onClick={() =>
                    setSelectedArtist((prev) =>
                      prev.filter((a) => a.artistId !== artist.artistId)
                    )
                  }
                  className="ml-2 text-white hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Dropdown Tracks */}
        <div>
          <label className="block mb-2 font-semibold text-white">Tracks</label>
          <select
            disabled={selectedArtist.length === 0}
            value={""}
            onChange={(e) => {
              const selectedTrack = {
                trackId: e.target.value,
                trackName: e.target.options[e.target.selectedIndex].text,
              };

              setSelectedTracks((prev) => {
                if (!prev.some((track) => track.trackId === selectedTrack.trackId)) {
                  return [...prev, selectedTrack];
                }
                return prev;
              });
            }}
            className={`w-full p-2 rounded ${
              selectedArtist.length === 0 ? "bg-gray-600" : "bg-[#121212]"
            } text-white border border-gray-600 focus:outline-none focus:border-white`}
          >
            <option value="" disabled hidden>
              {selectedArtist.length === 0 ? "Select an artist first" : "Choose track"}
            </option>
            {tracks.map((track) => (
              <option key={track.trackId} value={track.trackId}>
                {track.trackName}
              </option>
            ))}
          </select>

          {/* Hiển thị danh sách track đã chọn */}
          <div className="mt-2">
            {selectedTracks.map((track) => (
              <span
                key={track.trackId}
                className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {track.trackName}
                <button
                  onClick={() =>
                    setSelectedTracks((prev) =>
                      prev.filter((t) => t.trackId !== track.trackId)
                    )
                  }
                  className="ml-2 text-white hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block mb-2 font-semibold text-white">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
          />
          {imageFile && (
            <p className="mt-2 text-sm text-gray-400">Image URL: {imageFile}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Album
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;