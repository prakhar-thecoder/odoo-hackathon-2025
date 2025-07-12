import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Home />
            </main>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
