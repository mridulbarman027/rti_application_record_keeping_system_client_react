import { Link, useParams } from 'react-router-dom';
import ReplyListCardItem from '../components/Common/Cards/ReplyListCardItem';
import NavBar from '../components/Common/Navbar/NavBar';

const ViewReplies = () => {

  const params = useParams();
  const applicationId = params.applicationId;

  return (
    <>
      <NavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='flex w-[720px] flex-col justify-between max-w-[720px] min-w-max mt-6 min-h-[calc(100vh-12rem)] h-full'>

          <div className='flex flex-col justify-center'>

            <span className='text-xl font-semibold border-b-[1px] pb-3'>Applications Details</span>

            <div className='w-full flex justify-between items-center mt-1'>
              <div className='font-medium text-lg'>Applicant Name</div>
              <div className='font-semibold text-lg'>Mridul Barman</div>
            </div>

            <div className='w-full flex justify-between items-center mt-1'>
              <div className='font-medium text-lg'>Application Topic</div>
              <div className='font-semibold text-lg'>RTI</div>
            </div>

            <div className='w-full flex justify-between items-center mt-1'>
              <div className='font-medium text-lg'>Applicant Name</div>
              <div className='font-semibold text-lg'>Mridul Barman</div>
            </div>

            <span className='text-xl font-semibold border-b-[1px] mt-8 pb-3'>Applications Replies</span>

            <div className='flex flex-col w-full h-full max-h-full overflow-y-scroll'>

              <ReplyListCardItem />

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default ViewReplies