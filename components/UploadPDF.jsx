'use client'
import { useState } from 'react';
export default function UploadPDF() {

  const [file, setFile] = useState(null);
  const [driveLink, setDriveLink] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setDriveLink(result.driveLink);
      } else {
        console.error('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <h1>PDF Uploader</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload PDF</button>
      {driveLink && (
        <div>
          <p>Google Drive Link:</p>
          <a href={driveLink} target="_blank" rel="noopener noreferrer">
            {driveLink} here
          </a>
        </div>
      )}
    </div>
  );
}
