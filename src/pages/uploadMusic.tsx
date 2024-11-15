import React, { useState, useRef } from 'react';
import AudioUpload from '../components/audioUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/sideBar';
import { useGetGenres } from '../api/api';
import axios from 'axios';
import { environment } from '../environment/environment';
import { useNavigate } from 'react-router-dom';
import queryKeys from '../utils/queryKeys';
import { useQueryClient } from 'react-query';
import { useAppSelector } from '../hooks/storeHooks';

const UploadComponent: React.FC = () => {
  const search = useAppSelector((state) => state.music.searchTerm);
  const userToken = useAppSelector(
    (state) => state.auth.loggedInUser?.access_token
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [trackTitle, setTrackTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const { data } = useGetGenres(search);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !trackTitle || !genre) {
      alert('Please fill all the required fields!');
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    if (imageFile) {
      data.append('image', imageFile);
    }
    data.append('genre_id', genre);
    data.append('title', trackTitle);
    data.append('tags', tags);
    data.append('description', description);

    axios
      .post(environment.VITE_BACKEND_URL + '/songs/', data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(() => {
        queryClient.invalidateQueries(queryKeys.getAllSongsKey());
        setLoading(false);
        navigate('/');
      })
      .catch(() => {
        alert(
          'An error occurred while uploading music, Please try again later'
        );
        setLoading(false);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageBoxClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className='upload-music-container'>
      {!file ? (
        <AudioUpload
          file={file}
          setFile={(file) => {
            setTrackTitle(file?.name?.split('.')?.[0] || '');
            setFile(file);
          }}
        />
      ) : (
        <div className='content-wrapper'>
          <form className='track-form' onSubmit={handleSubmit}>
            <h3>
              File Selected: {file.name}{' '}
              <FontAwesomeIcon
                onClick={() => setFile(null)}
                className='edit-icon'
                icon={faEdit}
              />
            </h3>

            <label htmlFor='track-title'>Track Title *</label>
            <input
              type='text'
              id='track-title'
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
              placeholder='Enter Track Title'
              required
            />

            <label htmlFor='genre'>Category</label>
            <select
              id='genre'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value='' selected disabled>
                Select Category
              </option>

              {data?.map((genre) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
            </select>

            <label htmlFor='tags'>Tags</label>
            <input
              type='text'
              id='tags'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder='Add styles, moods, tempo'
            />

            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Add description about the track'
            />

            <button disabled={loading} type='submit' className='upload-btn'>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>

          <div className='image-upload'>
            <div className='upload-box' onClick={handleImageBoxClick}>
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt='Track preview'
                  className='preview-image'
                />
              ) : (
                <p>Click to upload an image</p>
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
      )}
    </div>
  );
};

const UploadMusic: React.FC = () => {
  return (
    <div className='dashboard'>
      <MainContent />
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <>
      <Sidebar />
      <div className='main-content'>
        <section>
          <UploadComponent />
        </section>
      </div>
    </>
  );
};

export default UploadMusic;
