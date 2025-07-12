import { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import Switch from '../components/Switch';

export default function Profile() {
  // In a real app, this would come from your auth context or API
  const [formData, setFormData] = useState({
    email: 'user@example.com', // This would come from your auth context
    skillsOffered: 'Web Development, Graphic Design',
    skillsWanted: 'Photography, Cooking',
    location: 'New York, USA',
    availability: 'weekends',
    isProfilePublic: true
  });

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
      isProfilePublic: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', formData);
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setFormData({ ...initialData });
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
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
                enabled={formData.isProfilePublic}
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
    </div>
  );
}
