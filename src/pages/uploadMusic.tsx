import React, { useState, useRef } from 'react';
import AudioUpload from '../components/audioUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const UploadMusic: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [trackTitle, setTrackTitle] = useState('');
  const [trackLink, setTrackLink] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !trackTitle || !artistName) {
      alert('Please fill all the required fields!');
      return;
    }

    console.log({
      file,
      imageFile,
      trackTitle,
      trackLink,
      artistName,
      genre,
      tags,
      description,
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
              <FontAwesomeIcon onClick={()=>setFile(null)} className='edit-icon' icon={faEdit} />
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

            <label htmlFor='track-link'>Track Link</label>
            <input
              type='url'
              id='track-link'
              value={trackLink}
              onChange={(e) => setTrackLink(e.target.value)}
              placeholder='Enter Track Link'
            />

            <label htmlFor='artist-name'>Main Artist(s) *</label>
            <input
              type='text'
              id='artist-name'
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder='Enter Artist Name'
              required
            />

            <label htmlFor='genre'>Genre</label>
            <select
              id='genre'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value=''>Select Genre</option>
              <option value='rock'>Rock</option>
              <option value='pop'>Pop</option>
              <option value='hiphop'>Hip Hop</option>
              <option value='jazz'>Jazz</option>
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

            <button type='submit' className='upload-btn'>
              Upload
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

export default UploadMusic;
