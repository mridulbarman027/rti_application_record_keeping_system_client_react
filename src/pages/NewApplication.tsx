import { Box, Button, Group, Indicator, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react'
import NavBar from '../components/Common/Navbar/NavBar';

const NewApplication = () => {
  return (
    <>
      <NavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <h1 className='mt-8 font-bold text-[28px]'>Create new application</h1>

        <Box sx={{ maxWidth: 640, width: 450 }} mx="auto" className='mt-8'>
          {/* <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <NumberInput mt="sm" label="Age" placeholder="You age" {...form.getInputProps('age')} />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form> */}
          <form >
            <TextInput mt="sm" label="Applicant Name" placeholder="Applicant Name" />

            <TextInput mt="sm" label="Application Topic" placeholder="Application Topic" />

            <DatePicker
              mt="sm"
              placeholder="Pick date"
              label="Application Date"
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <Indicator size={6} color="red" offset={8} disabled={day !== 16}>
                    <div>{day}</div>
                  </Indicator>
                );
              }}
            />

            <div className='mt-3 flex justify-between items-center'>
              <div className='flex justify-center items-center h-full'>
                <Select
                  label="Payment Type"
                  placeholder="Select one"
                  data={[
                    { value: 'cash', label: 'Cash' },
                    { value: 'bank_transfer', label: 'Bank Transfer' },
                    { value: 'cheque', label: 'Cheque' },
                    { value: 'online_payment', label: 'Online Payment' },
                    { value: 'tresary_challan', label: 'Tesary Challan' },
                    { value: 'online_payment', label: 'Online Payment' }
                  ]}
                />
              </div>
              <div className='flex justify-center items-center h-full '>
                <TextInput label="Payment Ref No" placeholder="Payment Ref No" />
              </div>
            </div>

            <Group position="right" mt="md">
              <Button type="submit" className='bg-blue-600'>Submit</Button>
            </Group>
          </form>
        </Box>

      </div>
    </>
  )
}

export default NewApplication;