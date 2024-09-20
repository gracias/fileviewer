import React, { useState } from 'react';
import { FileText, Image, File } from 'lucide-react';
import Alert from './Alert';
import mammoth from 'mammoth';

const FileViewer = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [docxContent, setDocxContent] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFileType(selectedFile.type);

      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setDocxContent(result.value);
        } catch (error) {
          console.error('Error converting DOCX:', error);
          setDocxContent('<p>Error converting DOCX file. Please try again.</p>');
        }
      } else {
        setDocxContent(null);
      }
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
        return docxContent ? (
          <div className="docx-content" dangerouslySetInnerHTML={{ __html: docxContent }} />
        ) : (
          <Alert title="DOCX Viewer">Converting DOCX file...</Alert>
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