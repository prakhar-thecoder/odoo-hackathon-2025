import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Mock function to get user data - replace with actual API call
const getUserById = (id) => {
  // In a real app, this would be an API call
  const mockUsers = [
    {
      id: 1,
      name: 'Alex Johnson',
      profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      skillsOffered: ['Web Development', 'Graphic Design'],
      skillsWanted: ['Photography', 'Cooking'],
      rating: 4.5,
      reviewCount: 24,
      bio: 'Full-stack developer with 5+ years of experience. Love to cook and learn new skills!',
      location: 'San Francisco, CA',
      memberSince: '2022'
    },
    // Add more mock users as needed
  ];
  
  return mockUsers.find(user => user.id === parseInt(id)) || mockUsers[0];
};

export default function UserProfile() {
  const { id } = useParams();
  const user = getUserById(id);
  const navigate = useNavigate();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to results
      </button>

      {/* Request Button */}
      <div className="flex justify-end mb-8">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium">
          Send Request
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - User Info */}
            <div className="flex-1 pr-0 md:pr-8">
              {/* Name */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{user.name}</h1>
              
              {/* Bio */}
              {user.bio && (
                <p className="text-gray-600 mb-6">{user.bio}</p>
              )}
              
              {/* Skills Offered */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills I Offer</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, index) => (
                    <span 
                      key={`offered-${index}`}
                      className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Skills Wanted */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills I'm Looking For</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill, index) => (
                    <span 
                      key={`wanted-${index}`}
                      className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Rating */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-2">{user.rating.toFixed(1)}</span>
                  <span className="text-gray-500">/5.0</span>
                  <span className="text-gray-500 ml-2">({user.reviewCount} reviews)</span>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-6 text-sm text-gray-500 space-y-1">
                {user.location && (
                  <div className="flex items-center">
                    <span>📍 {user.location}</span>
                  </div>
                )}
                {user.memberSince && (
                  <div>👤 Member since {user.memberSince}</div>
                )}
              </div>
            </div>
            
            {/* Right Side - Profile Photo */}
            <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-100">
                <img 
                  src={user.profilePhoto} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
