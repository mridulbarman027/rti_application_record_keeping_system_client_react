import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminIndex from './pages/admin';
import Applications from './pages/admin/applications/applications';
import ApplicationView from './pages/admin/applications/applicationView';
import AdminLogin from './pages/admin/login';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } /> 
        <Route path='login' element={ <Login /> } /> 
        <Route path='signup' element={ <Signup /> } /> 
        <Route path='admin' element={ <AdminIndex /> }>
          <Route path='adminLogin' element={ <AdminLogin /> } />
          <Route path='adminApplications' element={ <Applications /> } />
          <Route path='adminApplications/:applicationId' element={ <ApplicationView /> } />
        </Route>
        <Route path='*' element={ <Login /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
