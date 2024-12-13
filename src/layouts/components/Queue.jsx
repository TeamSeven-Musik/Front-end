import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from "react-router-dom";

const Queue = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[25%] p-2 flex-col text-white hidden lg:flex '>
      <div className='bg-[#121212] h-[100%] rounded'>

        {/*Block div A */}
        <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <p className='font-semibold'>Waiting list</p>
            </div>
            <div className='flex items-center space-x-2'>
            <img className='w-4 h-4 border-none hover:ring-2 hover:bg-gray-500 hover:bg-opacity-50 rounded-full' src={assets.close_icon} alt=''/>
            </div>
        </div>

        {/*Block div B */}
        <div className='p-5 m-2 rounded-lg font-semibold flex flex-col items-center justify-center gap-2 pl-5 mt-40'>
          <img className='w-50 cursor-pointer' src={assets.queue_icon} alt='' />
          <h1 className='text-2xl'>Add to your queue</h1>
          <h3 className='font-normal text-lg text-center'>Tap "Add to queue" from a track's menu to see it here</h3>
          <button className='px-5 py-2 bg-white text-[17px] text-black rounded-full mt-5'>Find something to play</button>
        </div>

      </div>
    </div>
  )
}

export default Queue
