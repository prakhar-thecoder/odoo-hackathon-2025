import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Landing />
            </main>
          } />
          <Route path="/home" element={
            <Home />
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/register" element={
            <Register />
          } />
          <Route path="/profile" element={
            <Profile />
          } />
          <Route path="/users/:id" element={
            <UserProfile />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
