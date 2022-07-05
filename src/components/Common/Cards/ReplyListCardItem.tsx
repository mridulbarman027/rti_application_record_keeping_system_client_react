import React from 'react'

const ReplyListCardItem = () => {
    return (
        <a>
            <div className='flex flex-col py-3 border-b-[1px]'>

                <div className='w-full flex justify-between items-center'>
                    <div className='text-lg font-semibold'>Nomita Baruah:</div>
                    <div className='text-xs font-light'>8PM, 26 April 2022</div>
                </div>
                
                <div className='text-base font-normal'>Search for the keywords to learn more about each warning.To ignore, add // eslint-disable-next-line to the line before.</div>

            </div>
        </a>
    )
}

export default ReplyListCardItem