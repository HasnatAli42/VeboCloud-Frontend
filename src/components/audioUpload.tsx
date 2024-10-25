import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { LegacyRef, useRef } from 'react';
interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const AudioUpload = ({ file, setFile }: Props) => {
  const labelRef: LegacyRef<HTMLLabelElement> | null = useRef(null);
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className='audio-upload-container'>
      <h2>Upload your audio files.</h2>
      <p>
        For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file size is
        4GB uncompressed.
      </p>
      <div
        className='audio-upload-dropzone'
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='audio-upload-icon'>
          <FontAwesomeIcon icon={faUpload} />
        </div>
        <p>Drag and drop audio files to get started.</p>
        <label htmlFor='fileInput' ref={labelRef} />
        <button
          className='choose-file-btn'
          onClick={() => labelRef?.current?.click()}
        >
          Choose files
        </button>

        <input
          id='fileInput'
          type='file'
          accept='audio/*'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      {file && <p className='file-name'>Selected file: {file.name}</p>}
    </div>
  );
};

export default AudioUpload;
