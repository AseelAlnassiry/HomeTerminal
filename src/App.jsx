// router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// styles
import './App.css';

// hooks
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import FriendsBar from './components/friendsBar/FriendsBar';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          {}
          <div className="container">
            <Navbar />
            <Routes>
              {user && <Route path="/" exact element={<Dashboard />} />}
              {!user && <Route path="/" exact element={<Navigate to="/login" replace />} />}

              {user && <Route path="create" element={<Create />} />}
              {!user && <Route path="create" element={<Navigate to="/login" replace />} />}

              {user && <Route path="projects/:id" element={<Project />} />}
              {!user && <Route path="projects/:id" element={<Navigate to="/login" replace />} />}

              {!user && <Route path="login" element={<Login />} />}
              {user && <Route path="login" element={<Navigate to="/" replace />} />}

              {!user && <Route path="signup" element={<Signup />} />}
              {user && <Route path="signup" element={<Navigate to="/login" replace />} />}
            </Routes>
          </div>
          {user && <FriendsBar />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
