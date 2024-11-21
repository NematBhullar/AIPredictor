export function ThirdPage({ updateData, handleFileUpload }) {
  return (
    <div>
      <label>Personal Statement</label>
      <input
        autoFocus
        type="file"
        accept=".docx, .pdf, .txt"
        onChange={(e) => handleFileUpload("personalStatement", e.target.files[0])}
      />
      <label>Academic Statement</label>
      <input
        type="file"
        accept=".docx, .pdf, .txt"
        onChange={(e) => handleFileUpload("academicStatement", e.target.files[0])}
      />
      <label>CV</label>
      <input
        type="file"
        accept=".docx, .pdf, .txt"
        onChange={(e) => handleFileUpload("cv", e.target.files[0])}
      />
      <label>High School Report</label>
      <input
        autoFocus
        type="file"
        accept=".docx, .pdf, .txt"
        onChange={(e) => updateData("highSchoolReport", e.target.value)}
      />
      <label>Other Documents</label>
      <input
        type="file"
        accept=".docx, .pdf, .txt"
        onChange={(e) => updateData("otherDocuments", e.target.value)}
      />
    </div>  
  );
}
