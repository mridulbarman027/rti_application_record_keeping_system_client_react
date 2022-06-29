import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminIndex from './pages/admin';
import Applications from './pages/admin/applications/Aapplications';
import ApplicationView from './pages/admin/applications/ApplicationView';
import AdminLogin from './pages/admin/Login';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
