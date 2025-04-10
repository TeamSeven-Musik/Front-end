import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import {uploadImgBBOneFile}from "../config/imgBB";
import api from "../config/axios"; 

const UploadTrack = () => {
  const [currentForm, setCurrentForm] = useState("createTrack"); // State để quản lý màn hình hiện tại
  const [songName, setSongName] = useState("");
  const [duration, setDuration] = useState("");
  const [imageFile, setImageFile] = useState(""); // State để lưu link ảnh từ imgBB
  const [audioFile, setAudioFile] = useState(null); // State để lưu file MP3
  const [artistName, setArtistName] = useState(""); // State cho tên nghệ sĩ
  const [genreName, setGenreName] = useState(""); // State cho tên thể loại
  const [artistImage, setArtistImage] = useState(""); // State cho ảnh nghệ sĩ
  const [genreImage, setGenreImage] = useState(""); // State cho ảnh thể loại
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // State để hiển thị thông báo
  const [notificationMessage, setNotificationMessage] = useState(""); // Nội dung thông báo
  const navigate = useNavigate();
  const [availableArtists, setAvailableArtists] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await api.get("/genre");
      if (response && response.status === 200) {
        setAvailableGenres(response.data); // Giả sử API trả về danh sách thể loại
      }
    }catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchArtist = async () => {
    try {
      const response = await api.get("/artist");
      if (response && response.status === 200) {
        setAvailableArtists(response.data); // Giả sử API trả về danh sách thể loại
      }
    }catch (error) {
      console.error("Error fetching artist:", error);
    }
  };

    // Sử dụng useEffect để gọi fetchGenres và fetchArtist khi component được render
    useEffect(() => {
      fetchGenres();
      fetchArtist();
    }, [currentForm]); // Chỉ chạy một lần khi component được render

  const handleImageUpload = async (event, setImageState) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        // Gọi hàm uploadImgBB để upload ảnh lên imgBB
        console.log("File",file);
        const imageUrl = await uploadImgBBOneFile(file);
        setImageState(imageUrl); // Lưu link ảnh vào state tương ứng
        console.log("Image uploaded successfully:", imageUrl);
        console.log("Image file:", imageFile);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    } else {
      alert("Please upload a valid image file (e.g., .jpg, .png, .jpeg).");
    }
  };

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "audio/mpeg") {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://54.206.93.117:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const result = await response.json();
        setAudioFile(result.url);
        console.log("Audio uploaded successfully:", result.url);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload audio. Please try again.");
      }
    } else {
      alert("Please upload a valid MP3 file.");
    }
  };

  const handleSubmitCreateTrack = async (event) => {
    event.preventDefault();

    // Chuyển đổi duration sang số nguyên
    const durationInt = parseInt(duration, 10);

    // Chuyển đổi artistIds và genresIds sang danh sách số nguyên
    const artistIdsInt = artists.map((artist) => parseInt(artist.artistId, 10));
    const genreIdsInt = genres.map((genre) => parseInt(genre.genreId, 10));

    // Kiểm tra dữ liệu trước khi gửi
    console.log({
      trackName: songName,
      duration: durationInt,
      img: imageFile,
      trackBlobsLink: audioFile,
      artistIds: artistIdsInt,
      genresIds: genreIdsInt,
    });

    try {
      const response = await api.post("/track", {
        trackName: songName,
        duration: durationInt,
        img: imageFile,
        trackBlobsLink: audioFile,
        artistIds: artistIdsInt,
        genresIds: genreIdsInt,
      });

      if (response && response.status === 200) {
        setNotificationMessage(response.data.message || "Track created successfully!");
      }
    } catch (error) {
      console.error("Error creating track:", error.response?.data || error.message);
      setNotificationMessage("Failed to create track. Please try again.");
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleSubmitAddGenre = async (event) => {
    event.preventDefault();
    console.log({
      genreName,
      img: genreImage, // Link ảnh từ imgBB
    });

    try {
      const response = await api.post("/genre", {
        genreName,
        img: genreImage,
      });
      if (response && response.status === 200) {
        setNotificationMessage(response.data.message || "Genre added successfully!");
      }
    } catch (error) {
      setNotificationMessage("Failed to add genre. Please try again.");
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleSubmitAddArtist = async (event) => {
    event.preventDefault();
    console.log({
      artistName,
      verifiedArtist: true,
      img : artistImage, // Link ảnh từ imgBB
    });

    try {
      const response = await api.post("/artist", {
        artistName,
        verifiedArtist: true, 
        img: artistImage,
      });
      if (response && response.status === 200) {
        setNotificationMessage(response.data.message || "Artist added successfully!");
      }
    } catch (error) {
      setNotificationMessage("Failed to add artist. Please try again.");
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const renderForm = () => {
    if (currentForm === "createTrack") {
      return (
        <div className="relative w-full flex justify-center items-center">
          {/* Nút Add Genre */}
          <button
            onClick={() => setCurrentForm("addGenre")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Add Genre
          </button>

          {/* Form Create Track */}
          <form
            onSubmit={handleSubmitCreateTrack}
            className="w-[90%] max-w-md bg-[#242424] p-6 rounded-lg flex flex-col gap-4"
          >
            <div>
              <label className="block mb-2 font-semibold">Song Name</label>
              <input
                type="text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Enter song name"
                className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Duration (in minutes)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration (e.g., 3:45)"
                className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setImageFile)}
                className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
              />
              {imageFile && (
                <p className="mt-2 text-sm text-gray-400">Image URL: {imageFile}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Upload MP3</label>
              <input
                type="file"
                accept="audio/mpeg"
                onChange={handleAudioUpload}
                className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
              />
              {audioFile && (
                <p className="mt-2 text-sm text-gray-400">Selected MP3: {audioFile.name}</p>
              )}
            </div>

            {/* Dropdown chọn nhiều tên nghệ sĩ */}
            <div>
              <label className="block mb-2 font-semibold">Artist</label>
              <select
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
                    artistId: option.value,
                    artistName: option.text,
                  }));

                  // Thêm các artist mới vào danh sách đã chọn
                  setArtists((prevArtists) => {
                    const newArtists = selectedOptions.filter(
                      (newArtist) => !prevArtists.some((artist) => artist.artistId === newArtist.artistId)
                    );
                    return [...prevArtists, ...newArtists];
                  });
                }}
                className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
              >
                {availableArtists.map((artist) => (
                  <option key={artist.artistId} value={artist.artistId}>
                    {artist.artistName}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                {artists.map((artist, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {artist.artistName}
                  </span>
                ))}
              </div>
            </div>

            {/* Dropdown chọn nhiều genre */}
            <div>
              <label className="block mb-2 font-semibold">Genres</label>
              <select
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
                    genreId: option.value,
                    genreName: option.text,
                  }));

                  // Thêm các genre mới vào danh sách đã chọn
                  setGenres((prevGenres) => {
                    const newGenres = selectedOptions.filter(
                      (newGenre) => !prevGenres.some((genre) => genre.genreId === newGenre.genreId)
                    );
                    return [...prevGenres, ...newGenres];
                  });
                }}
                className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
              >
                {availableGenres.map((genre) => (
                  <option key={genre.genreId} value={genre.genreId}>
                    {genre.genreName}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {genre.genreName}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-[#121212]"
            >
              Submit
            </button>
          </form>

          {/* Nút Add Artist */}
          <button
            onClick={() => setCurrentForm("addArtist")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Add Artist
          </button>
        </div>
      );
    } else if (currentForm === "addGenre") {
      return (
        <form className="w-[90%] max-w-md bg-[#242424] p-6 rounded-lg flex flex-col gap-4" onSubmit={handleSubmitAddGenre}>
          <div>
            <label className="block mb-2 font-semibold">Genre Name</label>
            <input
              type="text"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
              placeholder="Enter genre name"
              className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setGenreImage)}
              className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
            />
            {genreImage && (
              <p className="mt-2 text-sm text-gray-400">Image URL: {genreImage}</p>
            )}
          </div>

          
          <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-[#121212]"
            >
              Submit
            </button>


          <button
            type="button"
            onClick={() => setCurrentForm("createTrack")}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-[#121212]"
          >
            Back to Create Track
          </button>
        </form>
      );
    } else if (currentForm === "addArtist") {
      return (
        <form className="w-[90%] max-w-md bg-[#242424] p-6 rounded-lg flex flex-col gap-4" onSubmit={handleSubmitAddArtist}>
          <div>
            <label className="block mb-2 font-semibold">Artist Name</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist name"
              className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setArtistImage)}
              className="w-full p-2 rounded bg-[#121212] text-white border border-gray-600 focus:outline-none focus:border-white"
            />
            {artistImage && (
              <p className="mt-2 text-sm text-gray-400">Image URL: {artistImage}</p>
            )}
          </div>

          <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-[#121212]"
            >
              Submit
            </button>

          <button
            type="button"
            onClick={() => setCurrentForm("createTrack")}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-[#121212]"
          >
            Back to Create Track
          </button>
        </form>
      );
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#121212] text-white relative">
      {/* Nút Back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-[#121212]"
      >
        <span>
          <IoArrowBackOutline />
        </span>
        Back
      </button>

      {/* Box thông báo */}
      {showNotification && (
        <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-2">
          <p>{notificationMessage}</p>
          <div className="h-1 bg-green-700 animate-progress"></div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Upload Your Track</h1>
      {renderForm()}
    </div>
  );
};

export default UploadTrack;