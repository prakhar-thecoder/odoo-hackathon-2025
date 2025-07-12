import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Skill Swap Platform
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center">
            <Link
              to="/home"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              <FaHome className="h-4 w-4 mr-1.5" />
              Home
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              <FaUser className="h-4 w-4 mr-1.5" />
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;