import { Chip, Chips, Input } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar';
import useAuthAdmin from '../../../hooks/useAuthAdmin';
import { GraphqlRoute } from '../../../utils';
import { BsSearch } from "react-icons/bs";
import { DateRangePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import ApplicationListCardItem from '../../../components/Common/Cards/ApplicationListCardItem';

const Applications = () => {

  const navigate = useNavigate();

  useAuthAdmin(GraphqlRoute, navigate);

  /* const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0); */

  const [value, setValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>

      <AdminNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='flex w-[720px] flex-col max-w-[720px] min-w-max mt-6'>

          <Input placeholder="Search applications by name, " size='lg' styles={{ input: { width: '100%', borderWidth: '2px', borderRadius: '24px' } }} icon={<BsSearch size={16} />} className='w-full' />

          <div className='mt-6'>

          </div>

          <div className='mt-6 flex justify-between items-center'>
            <span className='font-semibold'>Date:</span>

            <Chips color="violet" variant="filled" spacing="md" size='md' defaultValue={'all'}>
              <Chip value="all">All</Chip>
              <Chip value="application">Application Date</Chip>
              <Chip value="reply">Reply Date</Chip>
            </Chips>

            <DateRangePicker
              placeholder="Pick dates range"
              value={value}
              onChange={setValue}
            />
          </div>

          <div className='mt-6 pt-4 flex flex-col justify-center border-t-2'>

            <span className='text-xl font-semibold'>Application results</span>

            <div className='w-full flex flex-col mt-4'>

              {/* <ApplicationListCardItem /> */}

            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Applications