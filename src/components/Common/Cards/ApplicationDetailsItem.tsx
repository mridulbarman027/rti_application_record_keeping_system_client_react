import React from 'react'

const ApplicationDetailsItem = (props: {label?: string, value?: string}) => {
    return (
        <div className='w-full flex justify-between items-center mt-1 max-w-[720px] overflow-hidden'>
            <div className='font-medium text-lg flex w-full'>{props.label}</div>
            <div className='font-semibold text-lg flex w-full text-right justify-end'>{props.value}</div>
        </div>
    )
}

export default ApplicationDetailsItem