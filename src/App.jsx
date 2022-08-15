// router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import './App.css';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar/>
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
            <Route path='create' element={<Create />} />
            <Route path='projects/:id' element={<Project />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
