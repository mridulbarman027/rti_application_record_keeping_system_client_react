import { Box, Button, Group, LoadingOverlay, Modal, Overlay, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { IApplicationListItem, IReply } from '../../../@types';
import { graphqlApiAdmin } from '../../../api';
import ApplicationDetailsItem from '../../../components/Common/Cards/ApplicationDetailsItem';
import ReplyListCardItem from '../../../components/Common/Cards/ReplyListCardItem';
import { dropzoneChildren } from '../../../components/Common/FileInputs/DropzoneContent';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar'
import { useAuthAdmin } from '../../../hooks';
import { getBase64, GraphqlRoute } from '../../../utils';

interface ITransferFormValues {
  name: string;
  date: Date;
  organization: string;
  matter_details: string;
}

const ApplicationView = () => {

  const params = useParams();
  const applicationId = params.applicationId;

  const adminId = localStorage.getItem('adminId');
  const [adminType, setAdminType] = useState<string>(localStorage.getItem('adminType') + "");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [replyTransferredOrClosed, setReplyTransferredOrClosed] = useState(true);
  const [applicationData, setApplicationData] = useState<IApplicationListItem>();
  const [repliesData, setRepliesData] = useState<IReply[]>();

  const [selectedFile, setSelectedFile] = useState("");

  useAuthAdmin(GraphqlRoute, navigate);

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

  const replySendBody = {
    query: `
      mutation{
        sendReply(
          replyData: {
            application_id: "${applicationId}",
            reply_from: "1",
            reply_from_id: "${adminId}",
            reply_type: "first",
            reply_file: "${selectedFile}",
            reply_transfer: false
          }
        ) {
          id
          application_id
          reply_time
          reply_from_id
          reply_from_name
          reply_from
          reply_file
        }
      }
    `
  };

  useEffect(() => {
    graphqlApiAdmin(GraphqlRoute, requestApplicationBody).then((res) => {
      setLoading(false);
      const { data: { data: { getApplicationById } } } = res;
      setApplicationData(getApplicationById);
      if (getApplicationById?.replies) {
        setRepliesData(getApplicationById.replies);
      }

      if (getApplicationById.application_admin !== adminType) {
        setReplyTransferredOrClosed(true);
      } else {
        setReplyTransferredOrClosed(false);
      }
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const sendReply = () => {
    if (selectedFile.length < 2) {
      setError(true);
      setSelected(false);
      return;
    }

    setLoading(true);
    graphqlApiAdmin(GraphqlRoute, replySendBody).then((res) => {
      setLoading(false);
      setSelectedFile("");
      setSelected(false);
      const { data: { data: { sendReply } } } = res;
      setRepliesData(sendReply);
    }).catch(error => {
      console.log(error);
    });

  }

  useEffect(() => {
    let count = 0;
    repliesData?.map((reply) => {
      if (reply.reply_from_id === adminId) {
        count++;
      }
    });

    if (count > 1) {
      setSendDisabled(true);
      //setReplyTransferred(true);
    } else {
      setSendDisabled(false);
      //setReplyTransferred(false);
    }
  }, [repliesData]);

  const transferAuthority = () => {
    const transferAuthBody = {
      query: `
        mutation {
          transferAuthority (
            applicationId: "${applicationId}",
            fromId: "${adminId}",
          ) {
            submitted
          }
        }
      `
    };
    setLoading(true);
    graphqlApiAdmin(GraphqlRoute, transferAuthBody).then((res) => {
      setLoading(false);
      setSelectedFile("");
      setSelected(false);
      setAdminType("2");
      setSendDisabled(true);
    }).catch(error => {
      console.log(error);
    });
  }

  const [transferModalOpened, setTransferModalOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      date: !values.date ? 'Invalid Date' : null,
      organization: values.organization.length < 2 ? 'Invalid Organization' : null,
      matter_details: values.matter_details.length < 2 ? 'Matter Details Cannot be empty' : null,
    }),
  });

  const submitTransferForm = (values: ITransferFormValues) => {
    setLoading(true);

    const reply3partyBody = {
      query: `
        mutation{
          transfer3Party(partyData: {
            applicationId: "${applicationId}",
            date: "${values.date}",
            name: "${values.name}",
            organization: "${values.organization}",
            matter_details: "${values.matter_details}",
          }) {
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

    graphqlApiAdmin(GraphqlRoute, reply3partyBody).then((res) => {
      setLoading(false);
      setSelectedFile("");
      setSelected(false);
      setSendDisabled(true);
      showNotification({
        title: 'Sucess',
        message: '3rd Party Details send successfully',
        autoClose: 2000,
      });
      const { data: { data: { transfer3Party } } } = res;
      setApplicationData(transfer3Party);
      transferForm.reset();
      setTransferModalOpened(false);
    }).catch(error => {
      console.log(error);
    });

  }

  return (
    <>

      <div className='w-full h-full flex justify-center items-center flex-col'>

        <AdminNavbar />

        <div ref={bottomRef} className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

          <div className='flex w-[720px] flex-col justify-between max-w-[720px] min-w-max mt-6 min-h-[calc(100vh-12rem)] h-full'>

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

              <div ref={bottomRef} className='flex flex-col w-full h-full max-h-full overflow-y-scroll'>

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

            <div className='my-4 sticky bottom-0 bg-white border-t-[1px]'>

              <div className='flex flex-col w-full'>

                {applicationData?.application_closed && <Overlay opacity={0.6} color="#000" blur={2} />}

                <span className='mt-8 mb-2 font-semibold'>Send your reply:</span>

                {applicationData?.application_closed && (<span className=' font-semibold text-lg text-red-500'>Application Closed</span>)}

                <Dropzone
                  onDrop={
                    (files) => {
                      setError(false);
                      setSelected(true);

                      getBase64(files[0]).then((base64) => {
                        setSelectedFile(base64 + "");
                      });

                    }
                  }
                  onReject={
                    (files) => {
                      console.log('rejected files', files);
                      setError(true);
                      setSelected(false);
                    }
                  }
                  maxSize={6 * 1024 ** 2}
                  multiple={false}
                  accept={['image/png', 'image/jpeg', 'image/sgv+xml', 'image/gif', 'application/pdf']}
                >
                  {(status) => dropzoneChildren(status, theme)}
                </Dropzone>

                {
                  error ? (
                    <div className='w-full text-red-500'>Please select image or pdf file less than 6MB.</div>
                  ) : (null)
                }

                {
                  (sendDisabled || replyTransferredOrClosed) ? (
                    <div className='w-full text-red-500'>Reply is closed or transferred</div>
                  ) : (null)
                }

                {
                  selected ? (
                    <div className='w-full text-blue-500 font-bold'>File Selected</div>
                  ) : (null)
                }

              </div>

              {!replyTransferredOrClosed ? (
                <>

                  {!sendDisabled ? (
                    <button onClick={sendReply} className='my-2 w-full border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Send Reply</button>
                  ) : null}

                  <div className='flex justify-between items-center gap-16'>

                    {
                      (applicationData?.application_admin === "1" && adminType === "1") ? (
                        <button onClick={transferAuthority} className='w-full border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Transfer to Appellate Authority</button>
                      ) : null
                    }

                    {
                      !sendDisabled ? (
                        <button onClick={() => setTransferModalOpened(true)} className='w-full border-[1] font-semibold px-6 pt-[8px] pb-[10px] bg-blue-500 text-white rounded-lg hover:bg-blue-700'>Transfer to 3rd Party</button>
                      ) : null
                    }

                  </div>

                </>
              ) : null}

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

            <TextInput mt="sm" label="Organization" placeholder="Organization" {...transferForm.getInputProps('organization')} />

            <Textarea mt="sm" label="Matter Detail" placeholder="Matter Detail" {...transferForm.getInputProps('matter_details')} />

            <Group position="right" mt="md">
              <Button type="submit" className='bg-blue-600'>Submit</Button>
            </Group>

          </form>

        </Box>

      </Modal>

      <LoadingOverlay visible={loading} />

    </>
  )
}

export default ApplicationView;