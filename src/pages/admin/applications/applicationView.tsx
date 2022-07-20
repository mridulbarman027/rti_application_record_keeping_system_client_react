import { Box, Button, Group, Modal, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import ReplyListCardItem from '../../../components/Common/Cards/ReplyListCardItem';
import { dropzoneChildren } from '../../../components/Common/FileInputs/DropzoneContent';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar'

interface ITransferFormValues {
  name: string;
  date: Date;
  organization: string;
  matter_details: string;
}

const ApplicationView = () => {

  const params = useParams();
  const applicationId = params.applicationId;

  const [transferModalOpened, setTransferModalOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const theme = useMantineTheme();

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }, []);

  const transferForm = useForm<{ name: string; date: Date; organization: string; matter_details: string }>({
    initialValues: { name: '', date: new Date(), organization: '', matter_details: '' },
    validate: (values) => ({
      name: values.name.length < 2 ? 'Invalid Name' : null,
      date: !values.date ? 'Invalid Date': null,
      orginzation: values.organization.length < 2 ? 'Invalid Orginization' : null,
      matter_details: values.matter_details.length < 2 ? 'Matter Details Cannot be empty' : null,
    }),
  });

  const submitTransferForm = (values: ITransferFormValues) => {
    setLoading(true);

    const applicaitonRequestBody = {
      /* query: `
        mutation {
          createApplication(applicationData: {
            userid: "${userId}",
            applicant_name: "${values.name}",
            application_date: "${values.date}",
            mode_of_payment: "${values.payment}",
            payment_ref_no: "${values.ref}"
            application_topic: "${values.topic}"
          }) {
            submitted
          }
        }
      ` */
    }

    /* axios.post(GraphqlApi, applicaitonRequestBody).then((res) => {
      setLoading(false);

      const result = res.data;
      const applicaitonData = result as { createApplication: { 'submitted': boolean } };
      const errors = result.errors;
      if (applicaitonData && !errors) {
        showNotification({
          title: 'Application Submitted',
          message: 'Application submitted successfully. Keep checking the replies.',
          autoClose: 2000,
        });
        navigate('/');
      } else {
        showNotification({
          title: 'Error submitting the applicaiton',
          message: 'Something went wrong',
          autoClose: 2000,
        });
      }
    }).catch(error => {
      setLoading(false);
      showNotification({
        title: 'Error submitting the applicaiton',
        message: 'Something went wrong',
        autoClose: 2000,
      });
    }); */

  }

  return (
    <>

      <div className='w-full h-full flex justify-center items-center flex-col'>

        <AdminNavbar />

        <div ref={bottomRef} className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

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

              <div ref={bottomRef} className='flex flex-col w-full h-full max-h-full overflow-y-scroll'>

                <ReplyListCardItem />

              </div>

            </div>

            <div className='my-4 sticky bottom-0 bg-white border-t-[1px]'>

              <div className='flex flex-col w-full'>
                <span className='mt-8 mb-2 font-semibold'>Send your reply:</span>

                <Dropzone
                  onDrop={(files) => console.log('accepted files', files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={['image/png', 'image/jpeg', 'image/sgv+xml', 'image/gif', 'application/pdf']}
                >
                  {(status) => dropzoneChildren(status, theme)}
                </Dropzone>

              </div>

              <Link to={`/`}>
                <button className='my-2 w-full border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Send Reply</button>
              </Link>

              <div className='flex justify-between items-center'>

                <button className='w-full mr-8 border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Transfer to Appellate Authority</button>

                <button onClick={() => setTransferModalOpened(true)} className='w-full ml-8 border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Transfer to 3rd Party</button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Modal
        centered
        opened={transferModalOpened}
        onClose={() => setTransferModalOpened(false)}
        title="Fill the form"
        size="lg"
      >

        <Box sx={{ maxWidth: 640, width: 450 }} mx="auto">

          <form onSubmit={transferForm.onSubmit((values) => submitTransferForm(values))}>

            <TextInput mt="sm" label="Party Name" placeholder="Applicant Name" {...transferForm.getInputProps('name')} />

            <DatePicker
              mt="sm"
              placeholder="Pick date"
              label="Date"
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <div>{day}</div>
                );
              }}
              {...transferForm.getInputProps('date')}
            />

            <TextInput mt="sm" label="Orginization" placeholder="Orginization" {...transferForm.getInputProps('organization')} />

            <Textarea mt="sm" label="Matter Detail" placeholder="Matter Detail" {...transferForm.getInputProps('matter_details')} />

            <Group position="right" mt="md">
              <Button type="submit" className='bg-blue-600'>Submit</Button>
            </Group>

          </form>

        </Box>

      </Modal>

    </>
  )
}

export default ApplicationView;