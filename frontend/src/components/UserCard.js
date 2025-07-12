const UserCard = ({ user }) => {
  // Simple rating display
  const renderRating = (rating) => {
    return (
      <span className="text-sm font-medium text-gray-700">
        {rating.toFixed(1)}/5
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Left side - Profile Photo */}
          <div className="flex-shrink-0">
            <img 
              className="h-20 w-20 rounded-full object-cover border-2 border-purple-100"
              src={user.profilePhoto || 'https://via.placeholder.com/80'}
              alt={user.name}
            />
          </div>
          
          {/* Right side - User Info */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {user.name}
            </h3>
            
            {/* Skills Offered */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-500">Offers:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.skillsOffered.map((skill, index) => (
                  <span 
                    key={`offered-${index}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Skills Wanted */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-500">Wants:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.skillsWanted.map((skill, index) => (
                  <span 
                    key={`wanted-${index}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            
          </div>

          {/* Rating and Request Button */}
          <div className="flex items-center justify-between flex-col gap-12">           
              {/* Request Button */}
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Request
              </button>
              {/* Rating */}
              <div className="text-sm">
                Rating: {renderRating(user.rating)}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
