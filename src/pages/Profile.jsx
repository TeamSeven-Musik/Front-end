import React from "react";

const Profile = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto">
      <div className="text-center">
        <img
          src="your-profile-pic-url"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Tên Người Dùng</h1>
        <p className="text-gray-400">Mô tả ngắn về bạn hoặc sở thích âm nhạc.</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Playlist Của Tôi</h2>
        <ul className="space-y-2">
          <li className="bg-green-600 p-3 rounded-lg">Bài Hát 1</li>
          <li className="bg-green-600 p-3 rounded-lg">Bài Hát 2</li>
          <li className="bg-green-600 p-3 rounded-lg">Bài Hát 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;