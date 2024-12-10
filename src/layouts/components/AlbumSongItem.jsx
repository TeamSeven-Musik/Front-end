import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../pages/context/PlayerContext";

const AlbumSongItem = ({ image, name, desc, id,isAlbum,bgColor }) => {
  const navigate = useNavigate()
  const {playwithId} = useContext(PlayerContext);

  const handleClick = () =>{
    if(isAlbum){
      navigate(`/albumsongdisplay/${id}`,{state : { image, name, desc, id, isAlbum,bgColor }})
    }else{
      playwithId(id);
    }
  }

  return (
    <div onClick={handleClick} className="min-w-[180px] p-2 px-3 rounded cursor-pointer ☐ hover:bg-[#ffffff26]">
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumSongItem;
