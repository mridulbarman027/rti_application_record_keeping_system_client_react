import { Box, Button, Group, LoadingOverlay, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphqlApiUser } from '../api';
import NavBar from '../components/Common/Navbar/NavBar';
import { GraphqlRoute } from '../utils';

interface IApplicationFormValues {
  name: string; 
  topic: string;
  date: Date;
  payment: string;
  ref: string | undefined
}

const NewApplication = () => {

  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const userInfoRequestBody = {
    query: `
      query {
        userInfo(user_id: "${userId}") {
          user_name
        }
      }
    `
  }

  useEffect(() => {
    graphqlApiUser(GraphqlRoute, userInfoRequestBody).then((res) => {
      const result = res.data.data.userInfo;
      const name = result.user_name;
      form.setFieldValue('name', name);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const form = useForm<{ name: string; topic: string; date: Date; payment: string; ref: string | undefined}>({
    initialValues: { name: '', topic: '', date: new Date(), payment: '', ref: '' },
    validate: (values) => ({
      name: values.name.length < 2 ? 'Invalid Name' : null,
      topic: values.topic.length < 2 ? 'Invalid Topic' : null,
      payment: values.payment.length < 2 ? 'Please select payment type' : null,
    }),
  });

  const submitApplicationForm = (values: IApplicationFormValues) => {
    setLoading(true);

    const applicaitonRequestBody = {
      query: `
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
      `
    }

    graphqlApiUser(GraphqlRoute, applicaitonRequestBody).then((res) => {
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
    });

  }

  return (
    
    <>
      <NavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <h1 className='mt-8 font-bold text-[28px]'>Create new application</h1>

        <Box sx={{ maxWidth: 640, width: 450 }} mx="auto" className='mt-8'>

          <form onSubmit={form.onSubmit((values) => submitApplicationForm(values))}>

            <TextInput mt="sm" label="Applicant Name" placeholder="Applicant Name" {...form.getInputProps('name')}/>

            <TextInput mt="sm" label="Application Topic" placeholder="Application Topic" {...form.getInputProps('topic')}/>

            <DatePicker
              mt="sm"
              placeholder="Pick date"
              label="Application Date"
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <div>{day}</div>
                );
              }}
              {...form.getInputProps('date')}
            />

            <div className='mt-3 flex justify-between items-start'>
              <div className='flex justify-center items-center h-full'>
                <Select
                  label="Payment Type"
                  placeholder="Select one"
                  data={[
                    { value: 'cash', label: 'Cash' },
                    { value: 'bank_transfer', label: 'Bank Transfer' },
                    { value: 'cheque', label: 'Cheque' },
                    { value: 'online_payment', label: 'Online Payment' },
                    { value: 'tresary_challan', label: 'Tesary Challan' }
                  ]}
                  {...form.getInputProps('payment')}
                />
              </div>
              <div className='flex justify-center items-center h-full '>
                <TextInput label="Payment Ref No" placeholder="Payment Ref No" {...form.getInputProps('ref')}/>
              </div>
            </div>

            <Group position="right" mt="md">
              <Button type="submit" className='bg-blue-600'>Submit</Button>
            </Group>

          </form>

        </Box>

      </div>

      <LoadingOverlay visible={loading} />
      
    </>
  )
}

export default NewApplication;