// src/pages/instructor/CourseMaterials.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseMaterials = () => {
  const { id } = useParams(); // course ID
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}/materials`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMaterials(res.data);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [id]);

  const handleUpload = async () => {
    if (!file || !title) return alert("Please provide a file and title");

    const formData = new FormData();
    formData.append("material", file);
    formData.append("title", title);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/courses/${id}/materials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Material uploaded!");
      setFile(null);
      setTitle("");
      fetchMaterials();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload material");
    }
  };

  const handleDelete = async (materialId) => {
    if (!window.confirm("Delete this material?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/courses/${id}/materials/${materialId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  const renderMaterial = (m) => {
    if (!m.url)
      return (
        <span className="text-gray-500">{m.title || "No file available"}</span>
      );

    // // Ensure full URL
    const fileUrl = `http://localhost:5000${m.url}`;

    if (m.type === "image") {
      return <img src={fileUrl} alt={m.title} className="max-w-xs" />;
    } else if (m.type === "video") {
      return (
        <video controls src={fileUrl} className="max-w-xs" type="video/mp4" />
      );
    } else if (m.type === "pdf") {
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-black"
        >
          {m.title} (PDF)
        </a>
      );
    } else {
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-black"
        >
          {m.title} (Download)
        </a>
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Materials</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Material title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          name="material"
        />
        <button
          onClick={handleUpload}
          className="bg-[#e44d30] text-white px-3 py-1 rounded"
        >
          Upload
        </button>
      </div>
      <ul className="space-y-2">
        {materials.map((m) => (
          <li
            key={m._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>{renderMaterial(m)}</div>
            <button
              onClick={() => handleDelete(m._id)}
              className="px-5 bg-[#e44d30] hover:bg-[#a53923] text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2 shadow"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseMaterials;
