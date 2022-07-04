import { Chip, Chips, Input } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar';
import useAuthAdmin from '../../../hooks/useAuthAdmin';
import { GraphqlRoute } from '../../../utils';
import { BsSearch } from "react-icons/bs";
import { DateRangePicker } from '@mantine/dates';
import { useState } from 'react';

const Applications = () => {

  const navigate = useNavigate();

  useAuthAdmin(GraphqlRoute, navigate);

  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

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

            <Chips color="violet" variant="filled" spacing="md" size='md'>
              <Chip value="application" defaultChecked>Application Date</Chip>
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

              <a>
                <div className='border-b-[1px] w-full flex bg-slate-100 cursor-pointer hover:bg-slate-200'>

                  <div className='w-full flex flex-col p-3'>

                    <div className='font-semibold text-lg'>Applicant Name</div>

                    <div className='font-normal text-base text-gray-500'>Applicaiton Topic</div>

                  </div>

                  <div className='flex flex-col items-center justify-center p-3'>
                    <div className='font-light text-sm w-full text-right'>22-April</div>
                    <div className='font-normal text-white bg-blue-600 rounded-lg px-2 pt-[1px] pb-[2px] mt-2 text-xs w-full text-right whitespace-nowrap'>New Reply</div>
                  </div>

                </div>
              </a>

            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Applications