import React from 'react'
import { FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IReply } from '../../../@types';

interface ReplyProp {
    replyProp: IReply
}

const ReplyListCardItem: React.FC<ReplyProp> = (props) => {
    return (
        <a href={`${props.replyProp.reply_file}`} target={`_blank`}>
            <div className='flex flex-col py-3 border-b-[1px]'>

                <div className='w-full flex justify-between items-center'>
                    <div className='text-lg font-semibold'>{props.replyProp.reply_from_name}</div>
                    <div className='text-xs font-light'>{new Date(parseInt(props.replyProp.reply_time + "")).toLocaleDateString()}</div>
                </div>

                <div className='text-base font-normal text-blue-700 flex justify-between mt-2'>
                    <span>Download Reply File</span>
                    <FiDownload className='w-6 h-6' />
                </div>

            </div>
        </a>
    )
}

export default ReplyListCardItem