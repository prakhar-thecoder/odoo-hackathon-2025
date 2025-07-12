import { useEffect, useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import Switch from '../components/Switch';
import { get, put } from '../utils/requests';

export default function Profile() {
  const [formData, setFormData] = useState({
    email: '', // This would come from your auth context
    name: '',
    skillsOffered: '',
    skillsWanted: '',
    location: '',
    availability: '',
    is_public: true
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get('/users/me');
        setFormData(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);
  
  // Profile picture state
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [initialData] = useState({ ...formData });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (value) => {
    setFormData(prev => ({
      ...prev,
      is_public: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put('/users/me', formData);
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setFormData({ ...initialData });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleSavePicture = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      // In a real app, you would upload the file to your server here
      // Example:
      // const imageUrl = await uploadProfilePicture(selectedFile);
      // setProfilePicture(imageUrl);
      
      // For demo purposes, we'll just use a mock URL
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(selectedFile);
        setProfilePicture(mockUrl);
        setSelectedFile(null);
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };
  
  const handleDiscardPicture = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('profile-picture-upload');
    if (fileInput) fileInput.value = '';
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:space-x-8">
        {/* Left Column - Profile Form */}
        <div className="md:w-2/3">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Your Profile
            </h2>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* Email (read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-600 sm:text-sm">
                {formData.email}
              </div>
            </div>

            {/* Name*/}
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Skills Offered */}
            <div>
              <label htmlFor="skillsOffered" className="block text-sm font-medium text-gray-700">
                Skills You Offer
              </label>
              <p className="text-xs text-gray-500 mb-1">Separate multiple skills with commas</p>
              <textarea
                id="skillsOffered"
                name="skillsOffered"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                placeholder="e.g., Web Development, Graphic Design, Cooking"
                value={formData.skillsOffered}
                onChange={handleChange}
              />
            </div>

            {/* Skills Wanted */}
            <div>
              <label htmlFor="skillsWanted" className="block text-sm font-medium text-gray-700">
                Skills You're Looking For
              </label>
              <p className="text-xs text-gray-500 mb-1">Separate multiple skills with commas</p>
              <textarea
                id="skillsWanted"
                name="skillsWanted"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                placeholder="e.g., Photography, Language Tutoring, Gardening"
                value={formData.skillsWanted}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                value={formData.availability}
                onChange={handleChange}
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="flexible">Flexible</option>
                <option value="mornings">Mornings</option>
                <option value="evenings">Evenings</option>
              </select>
            </div>

            {/* Profile Privacy */}
            <div className="pt-2">
              <Switch 
                enabled={formData.is_public}
                onChange={handleToggle}
                label="Public profile"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={handleDiscard}
              disabled={!hasChanges}
              className={`flex-1 inline-flex justify-center items-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                !hasChanges ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaTimes className="mr-2 h-4 w-4" />
              Discard
            </button>
            <button
              type="submit"
              disabled={!hasChanges}
              className={`flex-1 inline-flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                !hasChanges ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaSave className="mr-2 h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
        
        {/* Right Column - Profile Picture */}
        <div className="md:w-1/3 mt-8 md:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h3>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  className="h-48 w-48 rounded-full object-cover border-4 border-white shadow-lg"
                  src={profilePicture}
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                  <label className="cursor-pointer">
                    <span className="sr-only">Change profile photo</span>
                    <svg 
                      className="h-6 w-6 text-gray-700" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                    <input
                      id="profile-picture-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-4 flex space-x-3 w-full">
                  <button
                    type="button"
                    onClick={handleSavePicture}
                    disabled={isUploading}
                    className={`flex-1 inline-flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUploading ? 'Uploading...' : 'Save Picture'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscardPicture}
                    disabled={isUploading}
                    className="inline-flex justify-center items-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Discard
                  </button>
                </div>
              )}
              
              {!selectedFile && (
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Click on the camera icon to change your profile picture
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
