import { Link } from "react-router-dom";
import { IApplicationListItem } from "../../../@types"

interface ApplicationItemProp {
    applicationProp: IApplicationListItem
}

const ApplicationListCardItem: React.FC<ApplicationItemProp> = (props) => {

    const date = props.applicationProp.application_date;

    return (
        <Link to={`replies/${props.applicationProp.id}`}>
            <div className='border-b-[1px] w-full flex bg-slate-100 cursor-pointer hover:bg-slate-200'>

                <div className='w-full flex flex-col p-3'>

                    <div className='font-semibold text-lg'>{props.applicationProp.applicant_name}</div>

                    <div className='font-normal text-base text-gray-500'>{props.applicationProp.application_topic}</div>

                </div>

                <div className='flex w-full flex-col items-end justify-center p-3'>
                    <div className='font-light text-sm w-full text-right'>{
                        date ? (
                            new Date(date.toString()).toLocaleDateString()
                        ) : null
                    }</div>
                    {
                        props.applicationProp.reply_viewed ? (
                            <div className='font-normal text-white bg-blue-600 rounded-lg px-2 pt-[1px] pb-[2px] mt-2 text-xs text-right whitespace-nowrap'>New Reply</div>
                        ) : null
                    }
                </div>

            </div>
        </Link>
    )
}

export default ApplicationListCardItem