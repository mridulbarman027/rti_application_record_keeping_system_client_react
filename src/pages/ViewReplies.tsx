import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IApplicationListItem, IReply } from '../@types';
import { graphqlApiUser } from '../api';
import ApplicationDetailsItem from '../components/Common/Cards/ApplicationDetailsItem';
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
  const [repliesData, setRepliesData] = useState<IReply[]>();

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
          application_admin
          reply_viewed
          reply_3party
          reply_3party_details {
            name
            date
            organization
            matter_details
          }
          replies {
            id
            application_id
            reply_time
            reply_from_id
            reply_from_name
            reply_from
            reply_file
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
      if (getApplicationById?.replies) {
        setRepliesData(getApplicationById.replies);
      }
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
              <div className='flex flex-col justify-center w-full'>

                <span className='text-xl font-semibold border-b-[1px] pb-3'>Applications Details</span>

                <ApplicationDetailsItem label={`Applicant Name: `} value={applicationData?.applicant_name} />

                <ApplicationDetailsItem label={`Topic: `} value={applicationData?.application_topic} />

                <ApplicationDetailsItem label={`Date: `} value={new Date(parseInt(applicationData?.application_date + "")).toLocaleDateString()} />

                {
                  applicationData?.reply_3party ? (

                    <>
                      <span className='text-xl font-semibold border-b-[1px] mt-8 pb-3'>Applications 3rd Party Transfer</span>

                      <ApplicationDetailsItem label={`Party Name: `} value={applicationData?.reply_3party_details.name} />

                      <ApplicationDetailsItem label={`Organization Details: `} value={applicationData?.reply_3party_details.organization} />

                      <ApplicationDetailsItem label={`Date: `} value={new Date(parseInt(applicationData?.reply_3party_details.date + "")).toLocaleDateString()} />

                      <ApplicationDetailsItem label={`Matter Details: `} value={applicationData?.reply_3party_details.matter_details} />

                    </>

                  ) : null
                }

                <span className='text-xl font-semibold border-b-[1px] mt-8 pb-3'>Applications Replies</span>

                <div className='flex flex-col w-full h-full max-h-full overflow-y-scroll'>

                {
                  repliesData ? (
                    repliesData.map((reply, i) => {
                      return <ReplyListCardItem replyProp={reply} key={i} />;
                    })
                  ) : (
                    <div>No replies yet</div>
                  )
                }

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