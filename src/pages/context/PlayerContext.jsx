import { createContext, useEffect, useRef, useState } from "react";
//import { songsData } from "../../assets/assets";
import api from "../../config/axios";
export const PlayerContext = createContext();

 const PlayerContextProvider = (props) =>{
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const seekVl = useRef();
    const seekVolume = useRef();

    const [songsData,setSongsData] = useState([]);
    const [albumsData,setAlbumsData] = useState([]);
    const [track, setTrack] = useState({
      trackId: null,
      trackName: "",
      trackBlobsLink: "",
      img: "",
      artists: [],
    });
    const [playStatus,setPlayStatus] = useState(false);
    const [showQueue,setShowQueue] = useState(false);
    const [isMuted,setIsMuted] = useState(false);
    

    const fetchAllTrack = async () => {
        try {
        const response = await api.get("/track");
        console.log("Tracks data:", response.data);
        setSongsData(response.data);
        } catch (error) {
          console.error("Error fetching tracks:", error);
          throw error;
        }
      }

      const fetchAllAlbumsData = async () => {
        try {
        const response = await api.get("/albums");
        console.log("Albums data:", response.data);
        setAlbumsData(response.data);
        } catch (error) {
          console.error("Error fetching tracks:", error);
          throw error;
        }
      }

      useEffect(() => {
        fetchAllTrack(); 
        fetchAllAlbumsData();   
      }, []);

      useEffect(() => {
        if (songsData.length > 0) {
          setTrack(songsData[0]); // Đặt track là bài hát đầu tiên
        }
      }, [songsData]);


    const [time,setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },totalTime:{
            second :0,
            minute: 0
        }
    })

    const play = () =>{
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () =>{
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playwithId = async (id) => {
      const selectedTrack = songsData.find((song) => song.trackId === id); // Tìm bài hát theo id
      if (selectedTrack) {
        await setTrack(selectedTrack); // Cập nhật track
        await play(); // Phát bài hát
      } else {
        console.error(`Track with id ${id} not found`);
        alert("Track not found!");
      }
    };

    const previous = async () =>{
        if(track.trackId> 0){
            await setTrack(songsData[track.trackId-1]);
            await play();
        }
    }

    const next = async () =>{
        if(track.trackId < songsData.length-1){
            await setTrack(songsData[track.trackId+1]);
            await play();
        }
    }

    const shuffle = async () =>{
        const randomIndex = Math.floor(Math.random() * songsData.length);
        await setTrack(songsData[randomIndex]);
        await play();
    }

    const replay = async () =>{
        audioRef.current.currentTime = 0;
        await play();
    }

    const seekSong = async (e) =>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    const seekFixVolume = async (e) => {
        // Xác định vị trí click và tính tỷ lệ
        const rect = seekVl.current.getBoundingClientRect(); // Lấy tọa độ thanh volume.
        const offsetX = e.clientX - rect.left; // Tính vị trí click.
        const volumeRatio = offsetX / seekVl.current.offsetWidth; 
        
        // Giới hạn giá trị volumeRatio trong khoảng [0, 1]
        const newVolume = Math.max(0, Math.min(1, volumeRatio)); // Giới hạn từ 0 đến 1.
        
        // Cập nhật âm lượng của audio và style của seekVolume
        audioRef.current.volume = newVolume;  // Áp dụng âm lượng cho audio.
        seekVolume.current.style.width = `${newVolume * 100}%`;  // Cập nhật thanh volume.
        
    };

    const queueCLick = () => {
        if(showQueue){
            setShowQueue(false)
        }else{
            setShowQueue(true)
        }
    }
    const handleToggleVolume = () =>{
        if(isMuted){
            setIsMuted(false)
        }else{
            setIsMuted(true)
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () =>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime%60),
                        minute: Math.floor(audioRef.current.currentTime/60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    }
                })
            }
        },1000)
    },[audioRef])

    useEffect(()=>{
        audioRef.current.volume = 0.5;
        seekVolume.current.style.width = `${ 0.5 * 100}%`;
    },[])

    const contextValue = {
        audioRef,seekBg,seekBar,albumsData,songsData,track,setTrack,playStatus,setPlayStatus,time,setTime,play,pause,playwithId,previous,next,seekSong,shuffle,replay,seekVl,seekVolume,seekFixVolume,queueCLick,showQueue,handleToggleVolume,isMuted
    }

    return(
       <PlayerContext.Provider value={contextValue}>
        {props.children}
       </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;