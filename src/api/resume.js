import React, { useState } from 'react';
import axios from 'axios';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a resume first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/api/analyze-resume", formData);
      setOutput(response.data.analysis);
    } catch (error) {
      console.error(error);
      setOutput("❌ Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>📄 Resume Analyzer</h2>
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
