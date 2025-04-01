import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../../assets/assets";

export const PlayerContext = createContext();

 const PlayerContextProvider = (props) =>{
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const seekVl = useRef();
    const seekVolume = useRef();

    const [track,setTrack] = useState(songsData[0]);
    const [playStatus,setPlayStatus] = useState(false);
    const [showQueue,setShowQueue] = useState(false);
    const [isMuted,setIsMuted] = useState(false);

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

    const playwithId = async (id) =>{
        await setTrack(songsData[id]);
        await play();
    }

    const previous = async () =>{
        if(track.id> 0){
            await setTrack(songsData[track.id-1]);
            await play();
        }
    }

    const next = async () =>{
        if(track.id < songsData.length-1){
            await setTrack(songsData[track.id+1]);
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
        audioRef,seekBg,seekBar,track,setTrack,playStatus,setPlayStatus,time,setTime,play,pause,playwithId,previous,next,seekSong,shuffle,replay,seekVl,seekVolume,seekFixVolume,queueCLick,showQueue,handleToggleVolume,isMuted
    }

    return(
       <PlayerContext.Provider value={contextValue}>
        {props.children}
       </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;