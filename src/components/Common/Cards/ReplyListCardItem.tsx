import React from 'react'
import { FiDownload } from 'react-icons/fi';

const ReplyListCardItem = () => {
    return (
        <a>
            <div className='flex flex-col py-3 border-b-[1px]'>

                <div className='w-full flex justify-between items-center'>
                    <div className='text-lg font-semibold'>Nomita Baruah:</div>
                    <div className='text-xs font-light'>8PM, 26 April 2022</div>
                </div>

                <a href='#'>
                    <div className='text-base font-normal text-blue-700 flex justify-between mt-2'>
                        <span>Download Reply File</span>
                        <FiDownload className='w-6 h-6' />
                    </div>
                </a>

            </div>
        </a>
    )
}

export default ReplyListCardItem