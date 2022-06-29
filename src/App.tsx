import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminIndex from './pages/admin';
import Applications from './pages/admin/applications/Applications';
import ApplicationView from './pages/admin/applications/ApplicationView';
import AdminLogin from './pages/admin/Login';
import Home from './pages/Home';
import Login from './pages/Login';
import NewApplication from './pages/NewApplication';
import Signup from './pages/Signup';
import SubmittedApplications from './pages/SubmittedApplications';
import ViewReplies from './pages/ViewReplies';

function App() {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <div className='w-full h-full flex justify-center items-center flex-col'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='new' element={<NewApplication />} />
              <Route path='submission' element={<SubmittedApplications />} />
              <Route path='replies' element={<ViewReplies />} />
              <Route path='admin' element={<AdminIndex />}>
                <Route index element={<AdminLogin />} />
                <Route path='adminLogin' element={<AdminLogin />} />
                <Route path='adminApplications' element={<Applications />} />
                <Route path='adminApplications/:applicationId' element={<ApplicationView />} />
              </Route>
              <Route path='*' element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
