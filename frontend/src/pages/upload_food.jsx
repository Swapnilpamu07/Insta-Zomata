import { useState } from "react";
import axios from "axios";
import '../css/uploadfood.css';

function UploadFood() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setVideoFile(null);
      setPreview(null);
      alert("Please select a valid video file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video to upload");
    if (!videoName.trim()) return alert("Please enter a video name");

    setLoading(true);
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("name", videoName);
    formData.append("desc", desc);

    try {
      const res = await axios.post("http://localhost:8000/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:"true"
      });
      console.log(res);
      setMessage("Video uploaded successfully!");
      setVideoFile(null);
      setPreview(null);
      setVideoName("");
      setDesc("");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading video");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Food Video</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="video-preview">
          {preview ? (
            <video src={preview} controls />
          ) : (
            <div className="placeholder">Video Preview</div>
          )}
        </div>

        <input 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
          className="file-input"
        />

        <input
          type="text"
          placeholder="Video Name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="video-name-input"
        />

        <textarea
          placeholder="Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="desc-input"
        />

        <button type="submit" className="upload-btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  );
}

export default UploadFood;
