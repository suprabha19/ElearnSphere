import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaLock, FaBook, FaVideo, FaFilePdf, FaImage, FaCertificate } from "react-icons/fa";
import axios from "axios";
import ProgressBar from "../../components/ProgressBar";
import VideoPlayer from "../../components/VideoPlayer";

const CourseProgressSequential = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [showCertificateMessage, setShowCertificateMessage] = useState(false);

  useEffect(() => {
    fetchProgress();
    checkCertificate();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/progress/course/${courseId}/unlocked`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProgress({ completionPercentage: 0, completedMaterials: [] }); // Will be calculated from materials
      setMaterials(res.data.materials || []);
      
      // Auto-select first unlocked material
      if (res.data.materials && res.data.materials.length > 0) {
        const firstUnlocked = res.data.materials.find(m => m.isUnlocked && !m.isCompleted);
        if (firstUnlocked) {
          setSelectedMaterial(firstUnlocked);
        } else if (res.data.materials[0].isUnlocked) {
          setSelectedMaterial(res.data.materials[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkCertificate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/certificates/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.certificate) {
        setCertificate(res.data.certificate);
      }
    } catch (error) {
      // Certificate doesn't exist yet
      console.log("No certificate yet");
    }
  };

  const handleVideoComplete = (data) => {
    // Refresh progress
    fetchProgress();
    
    // Check if certificate was generated
    if (data.certificateEligible) {
      setShowCertificateMessage(true);
      checkCertificate();
      
      // Auto-hide message after 5 seconds
      setTimeout(() => setShowCertificateMessage(false), 5000);
    }
  };

  const handleMaterialClick = (material) => {
    if (!material.isUnlocked) {
      alert("This material is locked. Complete previous materials first.");
      return;
    }
    setSelectedMaterial(material);
  };

  const markNonVideoComplete = async (material) => {
    if (!material.isUnlocked) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/progress/course/${courseId}/material/${material._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProgress();
    } catch (error) {
      console.error("Failed to mark material complete:", error);
      alert(error.response?.data?.message || "Failed to mark material complete");
    }
  };

  const getMaterialIcon = (type) => {
    switch (type) {
      case "video":
        return <FaVideo className="text-red-500" />;
      case "pdf":
        return <FaFilePdf className="text-red-600" />;
      case "image":
        return <FaImage className="text-purple-500" />;
      default:
        return <FaBook className="text-gray-500" />;
    }
  };

  const calculateOverallProgress = () => {
    if (materials.length === 0) return 0;
    const completed = materials.filter(m => m.isCompleted).length;
    return Math.round((completed / materials.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading course materials...</p>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Course Learning Path
          </h1>
          
          <ProgressBar percentage={overallProgress} height="h-4" />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {materials.filter(m => m.isCompleted).length} of {materials.length} materials completed
            </div>
            {certificate && (
              <button
                onClick={() => navigate(`/certificates/${certificate._id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FaCertificate />
                View Certificate
              </button>
            )}
          </div>

          {showCertificateMessage && (
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 rounded">
              <p className="text-green-800 font-semibold">
                🎉 Congratulations! You've completed the course and earned a certificate!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Materials List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Materials
            </h2>

            {materials.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No materials available yet.
              </p>
            ) : (
              <div className="space-y-2">
                {materials.map((material, index) => (
                  <button
                    key={material._id}
                    onClick={() => handleMaterialClick(material)}
                    disabled={!material.isUnlocked}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedMaterial?._id === material._id
                        ? "bg-blue-50 border-blue-500"
                        : material.isCompleted
                        ? "bg-green-50 border-green-200"
                        : material.isUnlocked
                        ? "bg-white border-gray-200 hover:border-gray-300"
                        : "bg-gray-100 border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {material.isCompleted ? (
                        <FaCheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      ) : material.isUnlocked ? (
                        getMaterialIcon(material.type)
                      ) : (
                        <FaLock size={18} className="text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">#{index + 1}</span>
                          <h3 className={`font-medium text-sm truncate ${
                            material.isUnlocked ? "text-gray-800" : "text-gray-400"
                          }`}>
                            {material.title}
                          </h3>
                        </div>
                        {!material.isUnlocked && (
                          <p className="text-xs text-gray-400 mt-1">
                            Complete previous material to unlock
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Material Viewer */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            {selectedMaterial ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {selectedMaterial.title}
                  </h2>
                  {selectedMaterial.isCompleted && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      <FaCheckCircle /> Completed
                    </span>
                  )}
                  {!selectedMaterial.isUnlocked && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      <FaLock /> Locked
                    </span>
                  )}
                </div>

                {selectedMaterial.description && (
                  <p className="text-gray-600 mb-4">{selectedMaterial.description}</p>
                )}

                {selectedMaterial.isUnlocked ? (
                  <div>
                    {selectedMaterial.type === "video" && selectedMaterial.url ? (
                      <VideoPlayer
                        videoUrl={`http://localhost:5000${selectedMaterial.url}`}
                        courseId={courseId}
                        materialId={selectedMaterial._id}
                        onComplete={handleVideoComplete}
                      />
                    ) : selectedMaterial.type === "pdf" && selectedMaterial.url ? (
                      <div>
                        <iframe
                          src={`http://localhost:5000${selectedMaterial.url}`}
                          className="w-full h-96 border rounded"
                          title={selectedMaterial.title}
                        />
                        {!selectedMaterial.isCompleted && (
                          <button
                            onClick={() => markNonVideoComplete(selectedMaterial)}
                            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    ) : selectedMaterial.type === "image" && selectedMaterial.url ? (
                      <div>
                        <img
                          src={`http://localhost:5000${selectedMaterial.url}`}
                          alt={selectedMaterial.title}
                          className="w-full rounded-lg"
                        />
                        {!selectedMaterial.isCompleted && (
                          <button
                            onClick={() => markNonVideoComplete(selectedMaterial)}
                            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">
                          Material content not available for preview
                        </p>
                        {!selectedMaterial.isCompleted && (
                          <button
                            onClick={() => markNonVideoComplete(selectedMaterial)}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <FaLock size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">
                      This material is locked. Complete the previous material to unlock it.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaBook size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">
                  Select a material from the list to begin learning
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressSequential;
