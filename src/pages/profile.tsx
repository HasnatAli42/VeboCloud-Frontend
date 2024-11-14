import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/sideBar';
import { useNavigate } from 'react-router-dom';
import { useGetProfile } from '../api/api';
import { profile } from '../utils/constants';
import axios from 'axios';
import { environment } from '../environment/environment';
import { useAppSelector } from '../hooks/storeHooks';
import { useQueryClient } from 'react-query';
import queryKeys from '../utils/queryKeys';

const EditProfile: React.FC = () => {
  const userToken = useAppSelector(
    (state) => state.auth.loggedInUser?.access_token
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: profile } = useGetProfile();
  useEffect(() => {
    if (!user.email) {
      setUser({
        email: profile?.email,
        image: profile?.image,
        cover_photo: profile?.cover_photo,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        city: profile?.city,
        country: profile?.country,
        zip_code: profile?.zip_code,
        state: profile?.state,
        gender: profile?.gender,
      });
    }
  }, [profile]);
  const [user, setUser] = useState<Partial<profile>>({
    email: '',
    image: '',
    cover_photo: '',
    first_name: '',
    last_name: '',
    city: '',
    country: '',
    zip_code: '',
    state: '',
    gender: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const handleImageBoxClick = () => {
    imageInputRef.current?.click();
  };
  const handleCoverImageBoxClick = () => {
    coverInputRef.current?.click();
  };
  const handleSave = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('first_name', user.first_name || '');
    formData.append('last_name', user.last_name || '');
    formData.append('address', user.address || '');
    formData.append('city', user.city || '');
    formData.append('state', user.state || '');
    formData.append('zip_code', user.zip_code || '');
    formData.append('gender', user.gender || '');
    if (profileImage) {
      formData.append('image', profileImage);
    }
    if (coverImage) {
      formData.append('cover_photo', coverImage);
    }
    axios
      .put(environment.VITE_BACKEND_URL + '/profile/', formData, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(() => {
        queryClient.invalidateQueries(queryKeys.getProfileKey(userToken));
        setLoading(false);
        navigate('/');
      })
      .catch(() => {
        alert(
          'An error occurred while updating profile, Please try again later'
        );
        setLoading(false);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };
  return (
    <div className='edit-profile-container'>
      {' '}
      <div className='edit-profile-form'>
        <h2 className='edit-profile-heading'>Edit profile</h2>
        <div className='image-upload'>
          <div
            className='small-upload-box-cover'
            onClick={handleCoverImageBoxClick}
          >
            {user.cover_photo || coverImage ? (
              <img
                src={
                  coverImage
                    ? URL.createObjectURL(coverImage)
                    : user.cover_photo
                }
                alt='Track preview'
                className='preview-image'
              />
            ) : (
              <p>Click to upload cover photo</p>
            )}
          </div>

          <input
            type='file'
            ref={coverInputRef}
            style={{ display: 'none' }}
            accept='image/*'
            onChange={handleCoverImageChange}
          />
        </div>

        <label className='edit-profile-label'>Email</label>
        <input
          disabled
          type='email'
          value={user.email}
          className='edit-profile-input disabled-input'
        />

        <label className='edit-profile-label'>First Name</label>
        <input
          type='text'
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          className='edit-profile-input'
        />
        <label className='edit-profile-label'>Last Name</label>
        <input
          type='text'
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          className='edit-profile-input'
        />

        <div className='address-container'>
          <div>
            <label className='edit-profile-label'>Country</label>
            <select
              value={user.country}
              onChange={(e) => setUser({ ...user, country: e.target.value })}
              className='address-input'
            >
              <option value='Pakistan'>Pakistan</option>
              <option value='United States'>United States</option>
              <option value='United Kingdom'>United Kingdom</option>
            </select>
          </div>
          <div>
            <label className='edit-profile-label'>City</label>
            <input
              type='text'
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              value={user.city}
              className='address-input'
            />
          </div>
        </div>
        <div className='address-container'>
          <div>
            <label className='edit-profile-label'>State</label>
            <input
              type='text'
              onChange={(e) => setUser({ ...user, state: e.target.value })}
              value={user.state}
              className='address-input'
            />
          </div>
          <div>
            <label className='edit-profile-label'>Zip Code</label>
            <input
              type='number'
              onChange={(e) => setUser({ ...user, zip_code: e.target.value })}
              value={user.zip_code}
              className='address-input'
            />
          </div>
        </div>
        <div className='button-container'>
          <button className='cancel-button' onClick={() => navigate('/')}>
            Cancel
          </button>
          <button
            className='save-button'
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? 'Updating...' : 'Save profile'}
          </button>
        </div>
      </div>
      <div className='image-upload'>
        <div className='small-upload-box' onClick={handleImageBoxClick}>
          {user.image || profileImage ? (
            <img
              src={
                profileImage ? URL.createObjectURL(profileImage) : user.image
              }
              alt='Track preview'
              className='preview-image'
            />
          ) : (
            <p>Click to upload profile image</p>
          )}
        </div>

        <input
          type='file'
          ref={imageInputRef}
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};
const Profile: React.FC = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='main-content'>
        <section>
          <EditProfile />
        </section>
      </div>
    </div>
  );
};
export default Profile;
