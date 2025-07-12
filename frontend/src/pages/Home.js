import { useState } from 'react';
import { FaSearch, FaSort } from 'react-icons/fa';
import UserCard from '../components/UserCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  
  // Mock data - replace with actual data from your API
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      skillsOffered: ['Web Development', 'Graphic Design'],
      skillsWanted: ['Photography', 'Cooking'],
      rating: 4.5,
      reviewCount: 24
    },
    {
      id: 2,
      name: 'Sarah Williams',
      profilePhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      skillsOffered: ['Spanish Tutoring', 'Yoga'],
      skillsWanted: ['Web Development', 'UI/UX Design'],
      rating: 4.8,
      reviewCount: 32
    },
    {
      id: 3,
      name: 'Michael Chen',
      profilePhoto: 'https://randomuser.me/api/portraits/men/29.jpg',
      skillsOffered: ['Photography', 'Photo Editing'],
      skillsWanted: ['Guitar Lessons', 'Cooking'],
      rating: 4.2,
      reviewCount: 18
    },
    {
      id: 4,
      name: 'Emma Davis',
      profilePhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
      skillsOffered: ['Cooking', 'Baking'],
      skillsWanted: ['Graphic Design', 'Social Media'],
      rating: 4.7,
      reviewCount: 41
    },
    {
      id: 5,
      name: 'David Wilson',
      profilePhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
      skillsOffered: ['Guitar Lessons', 'Music Production'],
      skillsWanted: ['Web Development', 'Video Editing'],
      rating: 4.9,
      reviewCount: 37
    },
    {
      id: 6,
      name: 'Sophia Martinez',
      profilePhoto: 'https://randomuser.me/api/portraits/women/33.jpg',
      skillsOffered: ['UI/UX Design', 'Illustration'],
      skillsWanted: ['Spanish Lessons', 'Yoga'],
      rating: 4.6,
      reviewCount: 29
    },
    {
      id: 7,
      name: 'James Anderson',
      profilePhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
      skillsOffered: ['Carpentry', 'Home Repair'],
      skillsWanted: ['Gardening', 'Cooking'],
      rating: 4.8,
      reviewCount: 42
    },
    {
      id: 8,
      name: 'Olivia Taylor',
      profilePhoto: 'https://randomuser.me/api/portraits/women/51.jpg',
      skillsOffered: ['Fitness Training', 'Nutrition'],
      skillsWanted: ['Yoga', 'Meditation'],
      rating: 4.9,
      reviewCount: 56
    },
    {
      id: 9,
      name: 'Robert Garcia',
      profilePhoto: 'https://randomuser.me/api/portraits/men/38.jpg',
      skillsOffered: ['Car Maintenance', 'Driving Lessons'],
      skillsWanted: ['Computer Repair', 'Tech Support'],
      rating: 4.4,
      reviewCount: 31
    },
    {
      id: 10,
      name: 'Isabella Lopez',
      profilePhoto: 'https://randomuser.me/api/portraits/women/62.jpg',
      skillsOffered: ['Makeup Artistry', 'Hair Styling'],
      skillsWanted: ['Photography', 'Photo Editing'],
      rating: 4.7,
      reviewCount: 47
    },
    {
      id: 11,
      name: 'William Lee',
      profilePhoto: 'https://randomuser.me/api/portraits/men/27.jpg',
      skillsOffered: ['Mobile App Development', 'Blockchain'],
      skillsWanted: ['Public Speaking', 'Leadership Training'],
      rating: 4.5,
      reviewCount: 39
    },
    {
      id: 12,
      name: 'Mia Hernandez',
      profilePhoto: 'https://randomuser.me/api/portraits/women/45.jpg',
      skillsOffered: ['Event Planning', 'Floral Arrangement'],
      skillsWanted: ['Graphic Design', 'Social Media'],
      rating: 4.8,
      reviewCount: 52
    },
    {
      id: 13,
      name: 'Daniel Kim',
      profilePhoto: 'https://randomuser.me/api/portraits/men/31.jpg',
      skillsOffered: ['Korean Language', 'Cooking Korean Food'],
      skillsWanted: ['Guitar Lessons', 'Music Theory'],
      rating: 4.6,
      reviewCount: 28
    },
    {
      id: 14,
      name: 'Charlotte Brown',
      profilePhoto: 'https://randomuser.me/api/portraits/women/53.jpg',
      skillsOffered: ['Creative Writing', 'Editing'],
      skillsWanted: ['Web Development', 'Blogging'],
      rating: 4.7,
      reviewCount: 35
    },
    {
      id: 15,
      name: 'Ethan Wilson',
      profilePhoto: 'https://randomuser.me/api/portraits/men/49.jpg',
      skillsOffered: ['Video Editing', 'Motion Graphics'],
      skillsWanted: ['3D Modeling', 'Animation'],
      rating: 4.9,
      reviewCount: 44
    },
    {
      id: 16,
      name: 'Amelia Taylor',
      profilePhoto: 'https://randomuser.me/api/portraits/women/39.jpg',
      skillsOffered: ['Piano Lessons', 'Music Theory'],
      skillsWanted: ['Singing Lessons', 'Voice Training'],
      rating: 4.8,
      reviewCount: 51
    },
    {
      id: 17,
      name: 'Benjamin Martinez',
      profilePhoto: 'https://randomuser.me/api/portraits/men/42.jpg',
      skillsOffered: ['Gardening', 'Landscaping'],
      skillsWanted: ['Carpentry', 'Home Repair'],
      rating: 4.5,
      reviewCount: 33
    },
    {
      id: 18,
      name: 'Ava Anderson',
      profilePhoto: 'https://randomuser.me/api/portraits/women/47.jpg',
      skillsOffered: ['Interior Design', 'Home Staging'],
      skillsWanted: ['Photography', 'Photo Editing'],
      rating: 4.7,
      reviewCount: 42
    },
    {
      id: 19,
      name: 'Lucas Thomas',
      profilePhoto: 'https://randomuser.me/api/portraits/men/35.jpg',
      skillsOffered: ['Drone Photography', 'Videography'],
      skillsWanted: ['Video Editing', 'Color Grading'],
      rating: 4.6,
      reviewCount: 29
    },
  ]);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleSort = (value) => {
    setSortBy(value);
    setShowSortOptions(false);
    setCurrentPage(1); // Reset to first page when changing sort
    // Handle sort logic here
    console.log('Sorting by:', value);
  };
  
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  // Generate page numbers to show in pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with sort and search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Sort Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <FaSort className="mr-2 h-4 w-4 text-gray-500" />
              {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort By'}
            </button>
            
            {/* Sort Dropdown */}
            {showSortOptions && (
              <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSort(option.value)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortBy === option.value
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative rounded-md shadow-sm w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search..."
                />
              </div>
              <button
                type="submit"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        
        {/* Users List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Skill Exchanges</h2>
          <div className="space-y-4">
            {currentUsers.map((user) => (
              <UserCard key={`${user.id}-${currentPage}`} user={user} />
            ))}
          </div>
          
          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-purple-600 hover:text-purple-800 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            /* Pagination */
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  &laquo;
                </button>
                
                {/* Page Numbers */}
                {pageNumbers.map(number => {
                  // Show only first, last, current, and adjacent pages
                  if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentPage === number 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {number}
                      </button>
                    );
                  }
                  
                  // Show ellipsis for skipped pages
                  if (number === 2 && currentPage > 3) {
                    return <span key={`ellipsis-start`} className="px-2">...</span>;
                  }
                  if (number === totalPages - 1 && currentPage < totalPages - 2) {
                    return <span key={`ellipsis-end`} className="px-2">...</span>;
                  }
                  
                  return null;
                })}
                
                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
