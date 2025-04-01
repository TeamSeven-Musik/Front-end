import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Trạng thái mở/đóng menu

  useEffect(() => {
    // Lấy username từ localStorage hoặc API
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    // Chuyển hướng về trang Login
    navigate("/login");
  };

  const handleViewProfile = () => {
    // Chuyển hướng đến trang Profile
    navigate("/profile");
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img
            onClick={() => navigate(-1)}
            className='w-8 bg-black p-2 rounded-2x1 cursor-pointer hover:filter hover:invert'
            src={assets.arrow_left}
            alt=''
          />
          <img
            onClick={() => navigate(1)}
            className='w-8 bg-black p-2 rounded-2x1 cursor-pointer hover:filter hover:invert'
            src={assets.arrow_right}
            alt=''
          />
        </div>
        <div className='flex items-center gap-4 relative'>
          <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block'>
            Explore Premium
          </p>
          <p className='bg-black text-[15px] px-3 py-1 rounded-2xl hidden md:block'>
            Install App
          </p>
          {/* Hiển thị username và menu */}
          <div
            className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'
            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu
          >
            {username.charAt(0).toUpperCase()}
          </div>
          {menuOpen && (
            <div className='absolute top-10 right-0 bg-white text-black rounded-lg shadow-lg p-2'>
              <p
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={handleViewProfile}
              >
                View Profile
              </p>
              <p
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={handleLogout}
              >
                Log Out
              </p>
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Postcast</p>
      </div>
    </>
  );
};

export default Navbar;