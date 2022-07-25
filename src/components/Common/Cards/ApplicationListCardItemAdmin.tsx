import { Link } from "react-router-dom";
import { IApplicationListItem } from "../../../@types"

interface ApplicationItemProp {
    applicationProp: IApplicationListItem
}

const ApplicationListCardItemAdmin: React.FC<ApplicationItemProp> = (props) => {

    const date = props.applicationProp.application_date;

    return (
        <Link to={`${props.applicationProp.id}`}>
            <div className='border-b-[1px] w-full flex bg-slate-100 cursor-pointer hover:bg-slate-200'>

                <div className='w-full flex flex-col p-3'>

                    <div className='font-semibold text-lg'>{props.applicationProp.applicant_name}</div>

                    <div className='font-normal text-base text-gray-500'>{props.applicationProp.application_topic}</div>

                </div>

                <div className='flex w-full flex-col items-end justify-center p-3'>
                    <div className='font-light text-sm w-full text-right'>{
                        date ? (
                            new Date(parseInt(date)).toLocaleDateString()
                        ) : null
                    }</div>
                </div>

            </div>
        </Link>
    )
}

export default ApplicationListCardItemAdmin