import React, { useState } from 'react';
import axios from 'axios';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [jobTarget, setJobTarget] = useState('');
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !jobTarget.trim()) {
      alert("Please upload a resume and enter the job you're applying for.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTarget", jobTarget); // 👈 add job title to request

    try {
      const response = await axios.post("http://localhost:5000/resume-review", formData);
      setOutput(response.data.analysis);
    } catch (error) {
      console.error("Resume analysis error:", error);
      setOutput("❌ Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>📄 Resume Analyzer</h2>

      <label>Target Job Title:</label><br />
      <input
        type="text"
        placeholder="e.g. Frontend Developer"
        value={jobTarget}
        onChange={(e) => setJobTarget(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <label>Upload your resume (PDF only):</label><br />
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>
      <br /><br />

      {output && (
        <div style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6",
          fontSize: "14px"
        }}>
          {output}
        </div>
      )}
    </div>
  );
};

export default Resume;
