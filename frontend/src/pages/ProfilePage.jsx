import { useState, useEffect } from "react";
import api from "../services/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePicture: null, 
    profilePictureUrl: "" 
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/1"); 
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          profilePicture: null,
          profilePictureUrl: response.data.profilePicture || ""
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedUser = { username: formData.username, email: formData.email };
      
      if (formData.profilePicture) {
        const formDataToSend = new FormData();
        formDataToSend.append('profilePicture', formData.profilePicture);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        
        const response = await api.put(`/users/${user.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        updatedUser = response.data;
      } else {
        const response = await api.put(`/users/${user.id}`, updatedUser);
        updatedUser = response.data;
      }
      
      setUser(updatedUser);
      setFormData({
        ...formData,
        profilePicture: null,
        profilePictureUrl: updatedUser.profilePicture || ""
      });
      setPreviewImage(null);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      {!editMode ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Photo</span>
              )}
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mr-4">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : formData.profilePictureUrl ? (
                  <img src={formData.profilePictureUrl} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Photo
                  </div>
                )}
              </div>
              <label className="cursor-pointer">
                <span className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded inline-block transition-colors">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex space-x-2 mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setPreviewImage(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;