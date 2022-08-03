import { Autocomplete } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar';
import useAuthAdmin from '../../../hooks/useAuthAdmin';
import { GraphqlRoute } from '../../../utils';
import { BsSearch } from "react-icons/bs";
import { DateRangePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { graphqlApiUser } from '../../../api';
import { IApplicationListItem } from '../../../@types';
import ApplicationListCardItemAdmin from '../../../components/Common/Cards/ApplicationListCardItemAdmin';

const Applications = () => {

  const navigate = useNavigate();

  useAuthAdmin(GraphqlRoute, navigate);

  /* const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0); */

  const adminId = localStorage.getItem('adminId');

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [applicationList, setApplicaitonList] = useState<IApplicationListItem[]>([]);

  const requestBody = {
    query: `
      query {
        searchApplicaitonsAdmin (
          searchApplicationAdminData: {
            adminId: "${adminId}", 
            dateRange: "${dateRange}", 
            searchQuery: "${searchQuery}"
          }
        ) {
          id
          userid
          applicant_name
          application_date
          mode_of_payment
          payment_ref_no
          application_topic
          application_desc
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

  useEffect(() => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];

    if ((startDate !== null && endDate == null) || (startDate == null && endDate != null)) {
      showNotification({
        title: 'Select Date Range',
        message: 'Please select start and end date range',
        autoClose: 4000,
      });
    } else {

      graphqlApiUser(GraphqlRoute, requestBody).then((res) => {
        const { data: { data: { searchApplicaitonsAdmin } } } = res;
        setApplicaitonList(searchApplicaitonsAdmin);
      }).catch(error => {
        console.log(error);
      });

    }

  }, [dateRange, searchQuery]);

  return (
    <>

      <AdminNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='flex w-[720px] flex-col max-w-[720px] min-w-max mt-6'>

          <Autocomplete placeholder="Search applications by name, topics" size='lg' value={searchQuery} onChange={setSearchQuery} data={[]} styles={{ input: { width: '100%', borderWidth: '2px', borderRadius: '24px' } }} icon={<BsSearch size={16} />} className='w-full' />

          <div className='mt-4 flex justify-between items-center'>
            <span className='font-semibold'>Select Date Range:</span>

            <DateRangePicker
              placeholder="Pick dates range"
              value={dateRange}
              onChange={setDateRange}
            />
          </div>

          <div className='mt-6 pt-4 flex flex-col justify-center border-t-2'>

            <span className='text-xl font-semibold'>Application results</span>

            <div className='w-full flex flex-col mt-4'>

              {
                applicationList.length > 0 ? (
                  applicationList.map((application, i) => {
                    return <ApplicationListCardItemAdmin applicationProp={application} key={i} />;
                  })
                ) : (
                  <div>No application found</div>
                )
              }

            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Applications