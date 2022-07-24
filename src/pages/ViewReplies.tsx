import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IApplicationListItem } from '../@types';
import { graphqlApiUser } from '../api';
import ReplyListCardItem from '../components/Common/Cards/ReplyListCardItem';
import NavBar from '../components/Common/Navbar/NavBar';
import { useAuthUser } from '../hooks';
import { GraphqlRoute } from '../utils';

const ViewReplies = () => {

  const params = useParams();
  const applicationId = params.applicationId;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState<IApplicationListItem>();

  useAuthUser(GraphqlRoute, navigate);

  const requestApplicationBody = {
    query: `
      query {
        getApplicationById(applicationId: "${applicationId}") {
          id
          userid
          applicant_name
          application_date
          mode_of_payment
          payment_ref_no
          application_topic
          application_time
          application_admin
          application_closed
          reply_viewed
          replies {
            id
          }
        }
      }
    `
  }

  const requestUpdateReply = {
    query: `
      mutation {
        updateReplyView(applicationId: "${applicationId}") {
          submitted
        }
      }
    `
  };

  useEffect(() => {
    graphqlApiUser(GraphqlRoute, requestApplicationBody).then((res) => {
      setLoading(false);
      const { data: { data: { getApplicationById } } } = res;
      setApplicationData(getApplicationById);
    }).catch(error => {
      console.log(error);
    });

    graphqlApiUser(GraphqlRoute, requestUpdateReply).then((res) => {
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <NavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='flex w-[720px] flex-col justify-between max-w-[720px] min-w-max mt-6 min-h-[calc(100vh-12rem)] h-full'>

          {
            loading ? (
              <div className='flex w-full justify-center items-center'>
                <Loader />
              </div>
            ) : (
              <div className='flex flex-col justify-center'>

                <span className='text-xl font-semibold border-b-[1px] pb-3'>Applications Details</span>

                <div className='w-full flex justify-between items-center mt-1'>
                  <div className='font-medium text-lg'>Applicant Name</div>
                  <div className='font-semibold text-lg'>{ applicationData?.applicant_name }</div>
                </div>

                <div className='w-full flex justify-between items-center mt-1'>
                  <div className='font-medium text-lg'>Application Topic</div>
                  <div className='font-semibold text-lg'>{ applicationData?.application_topic }</div>
                </div>

                <div className='w-full flex justify-between items-center mt-1'>
                  <div className='font-medium text-lg'>Application Date</div>
                  <div className='font-semibold text-lg'>{ new Date(applicationData?.application_date+ "").toLocaleDateString() }</div>
                </div>

                <span className='text-xl font-semibold border-b-[1px] mt-8 pb-3'>Applications Replies</span>

                <div className='flex flex-col w-full h-full max-h-full overflow-y-scroll'>

                  {/* <ReplyListCardItem /> */}

                </div>

              </div>
            )
          }

        </div>

      </div >
    </>
  )
}

export default ViewReplies