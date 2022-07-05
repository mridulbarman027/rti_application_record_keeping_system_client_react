import React from 'react'

const ApplicationListCardItem = () => {
    return (
        <a>
            <div className='border-b-[1px] w-full flex bg-slate-100 cursor-pointer hover:bg-slate-200'>

                <div className='w-full flex flex-col p-3'>

                    <div className='font-semibold text-lg'>Applicant Name</div>

                    <div className='font-normal text-base text-gray-500'>Applicaiton Topic</div>

                </div>

                <div className='flex flex-col items-center justify-center p-3'>
                    <div className='font-light text-sm w-full text-right'>22-April</div>
                    <div className='font-normal text-white bg-blue-600 rounded-lg px-2 pt-[1px] pb-[2px] mt-2 text-xs w-full text-right whitespace-nowrap'>New Reply</div>
                </div>

            </div>
        </a>
    )
}

export default ApplicationListCardItem