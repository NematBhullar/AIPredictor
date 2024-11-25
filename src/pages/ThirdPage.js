import React, { useState } from "react";

export function ThirdPage({ updateData, handleFileUpload }) {
  const [uploadedFiles, setUploadedFiles] = useState({
    personalStatement: null,
    academicStatement: null,
    cv: null,
    highSchoolReport: null,
    otherDocuments: null,
  });

  const handleUpload = (key, file) => {
    const updatedFiles = { ...uploadedFiles, [key]: file };
    setUploadedFiles(updatedFiles);
    handleFileUpload(key, file); 
  };

  const handleRemove = (key) => {
    const updatedFiles = { ...uploadedFiles, [key]: null };
    setUploadedFiles(updatedFiles);
    handleFileUpload(key, null); 
  };

  const renderFileInput = (key, label) => (
    <div className="file-input-wrapper">
      <label>{label}</label>
      {uploadedFiles[key] ? (
        <div className="file-input">
          <div className="file-details">
            <img src="/icons/file-icon.png" alt="File" className="icon" />
            <span>{uploadedFiles[key].name}</span>
          </div>
          <button
            type="button" 
            className="delete-button"
            onClick={() => handleRemove(key)}
          >
            <img src="/icons/delete-icon.png" alt="Delete" className="icon" />
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button" 
            className="upload-button"
            onClick={() => document.getElementById(`${key}-input`).click()}
          >
            Upload
          </button>
        </div>
      )}
      <input
        id={`${key}-input`}
        type="file"
        accept=".docx, .pdf, .txt"
        style={{ display: "none" }}
        onChange={(e) => handleUpload(key, e.target.files[0])}
      />
    </div>
  );

  return (
    <div>
      {renderFileInput("personalStatement", "Personal Statement")}
      {renderFileInput("academicStatement", "Academic Statement")}
      {renderFileInput("cv", "CV")}
      {renderFileInput("highSchoolReport", "High School Report")}
      {renderFileInput("otherDocuments", "Other Documents")}
    </div>
  );
}
