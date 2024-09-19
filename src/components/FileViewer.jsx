import React, { useState } from 'react';
import { FileText, Image, File } from 'lucide-react';
import Alert from './Alert';

const FileViewer = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFileType(selectedFile.type);
    }
  };

  const renderFileContent = () => {
    if (!file) return null;

    switch (fileType) {
      case 'application/pdf':
        return <iframe src={file} className="file-viewer" title="PDF Viewer" />;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return <img src={file} alt="Uploaded file" className="file-viewer" />;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return (
          <Alert title="DOCX Viewer">
            DOCX viewing is not supported in the browser. You may need to use a library like mammoth.js to convert DOCX to HTML for viewing.
          </Alert>
        );
      default:
        return (
          <Alert title="Unsupported File Type">
            The selected file type is not supported for viewing.
          </Alert>
        );
    }
  };

  return (
    <div className="file-viewer-container">
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png,.gif,.docx"
        className="file-input"
      />
      {file && (
        <div className="file-info">
          {fileType.includes('pdf') && <FileText className="file-icon" />}
          {fileType.includes('image') && <Image className="file-icon" />}
          {fileType.includes('docx') && <File className="file-icon" />}
          <span>{fileType}</span>
        </div>
      )}
      {renderFileContent()}
    </div>
  );
};

export default FileViewer;