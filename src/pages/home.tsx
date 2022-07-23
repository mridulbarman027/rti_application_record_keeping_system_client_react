import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IApplicationListItem } from '../@types';
import { graphqlApiUser } from '../api';
import ApplicationListCardItem from '../components/Common/Cards/ApplicationListCardItem';
import NavBar from '../components/Common/Navbar/NavBar';
import { useAuthUser } from '../hooks';
import { GraphqlRoute } from '../utils';

const requestBody = {
  query: `
    query {
      viewUserApplications {
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

const Home = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [applicationList, setApplicaitonList] = useState<IApplicationListItem[]>([]);

  useAuthUser(GraphqlRoute, navigate);

  useEffect(() => {
    graphqlApiUser(GraphqlRoute, requestBody).then((res) => {
      setLoading(false);
      const { data: { data: { viewUserApplications } } } = res;
      setApplicaitonList(viewUserApplications);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <NavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='flex w-[720px] flex-col justify-between max-w-[720px] min-w-max mt-6 min-h-[calc(100vh-12rem)] h-full'>

          <div className='flex flex-col justify-center'>

            <span className='text-xl font-semibold'>Submitted Applications</span>

            <div className='w-full flex flex-col mt-4 max-h-full overflow-y-scroll'>

              {
                loading ? (
                  <div className='flex w-full justify-center items-center'>
                    <Loader />
                  </div>
                ) : (
                  applicationList.length > 0 ? (
                    applicationList.map((application, i) => {
                      return <ApplicationListCardItem applicationProp={application} key={i}/>;
                    })
                  ) : (
                    <div>No application found</div>
                  )
                )
              }

            </div>

          </div>

          <div className='my-8 sticky bottom-0 bg-white'>
            <Link to={`/new`}>
              <button className='my-8 w-full border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Create New Application</button>
            </Link>

          </div>

        </div>

      </div>
    </>
  )
}

export default Home;