import React from 'react'
import { assets} from '../../assets/assets' 
import { PlayerContext } from '../../pages/context/PlayerContext'
import { useContext } from 'react'
const Player = () => {
    const {track,seekBg,seekBar,playStatus,play,pause,time,previous,next,seekSong,shuffle,replay,seekVl,seekVolume,seekFixVolume,queueCLick,handleToggleVolume,isMuted} = useContext(PlayerContext);
  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>

        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={track.img} alt=''/>
            <div>
                <p>{track.trackName}</p>
                <p>Artists: {track.artists}</p>
            </div>
        </div>

        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
                <img onClick={shuffle} className='w-4 cursor-pointer' src={assets.shuffle_icon} alt=''/>
                <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt=''/>
                {playStatus == true ? (<img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt=''/>) : (<img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt=''/>)}
                <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt=''/>
                <img onClick={replay} className='w-4 cursor-pointer' src={assets.loop_icon} alt=''/>
            </div>
            <div className='flex items-center gap-5'>
                <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    {/*w-10 là chỉ lượng thời gian đã chạy , w-full là đã chạy hết  */}
                    <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'></hr> 
                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
        </div>

        <div className='hidden lg:flex items-center gap-2'>
        {playStatus == true ? (<img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt=''/>) : (<img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt=''/>)}
            <img className='w-4 cursor-pointer' src={assets.mic_icon} alt=''/>
            <img onClick={queueCLick} className='w-4 cursor-pointer' src={assets.queue_icon} alt=''/>

            <img className='w-4 cursor-pointer' src={isMuted ? assets.volume_mute_icon : assets.volume_icon} onClick={handleToggleVolume} alt=''/>
            
            <div ref={seekVl} onClick={seekFixVolume} className='w-20 h-1 bg-gray-700 rounded-full cursor-pointer group'>
                    <hr ref={seekVolume} className='h-1 border-none w-0 bg-white rounded-full group-hover:bg-green-800 group-focus:bg-green-800 transition-colors duration-30'></hr>
                </div>

            <img className='w-4 cursor-pointer' src={assets.mini_player_icon} alt=''/>
            <img className='w-4 cursor-pointer' src={assets.zoom_icon} alt=''/>
        </div>
    </div>
  )
}

export default Player
