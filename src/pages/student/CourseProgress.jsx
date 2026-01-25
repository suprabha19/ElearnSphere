import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaCircle, FaBook, FaVideo, FaFilePdf, FaImage } from "react-icons/fa";
import axios from "axios";
import ProgressBar from "../../components/ProgressBar";

const CourseProgress = () => {
  const { courseId } = useParams();
  const [progress, setProgress] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/progress/course/${courseId}`,
        {
          headers: { Authorization: `****** },
        }
      );

      setProgress(res.data.progress);
      setMaterials(res.data.courseMaterials || []);
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMaterialComplete = async (materialId, isCompleted) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = isCompleted ? "incomplete" : "complete";
      
      await axios.post(
        `http://localhost:5000/api/progress/course/${courseId}/material/${materialId}/${endpoint}`,
        {},
        { headers: { Authorization: `****** } }
      );

      fetchProgress();
    } catch (error) {
      console.error("Failed to toggle material:", error);
    }
  };

  const isMaterialCompleted = (materialId) => {
    if (!progress || !progress.completedMaterials) return false;
    return progress.completedMaterials.some(
      (m) => m.materialId.toString() === materialId.toString()
    );
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Course Progress
          </h1>
          
          {progress && (
            <div className="mt-4">
              <ProgressBar percentage={progress.completionPercentage} height="h-4" />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {progress.completedMaterials.length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {progress.totalMaterials - progress.completedMaterials.length}
                  </p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {progress.totalMaterials}
                  </p>
                  <p className="text-sm text-gray-600">Total Materials</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Materials List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Course Materials
          </h2>

          {materials.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No materials available for this course yet.
            </p>
          ) : (
            <div className="space-y-3">
              {materials.map((material, index) => {
                const isCompleted = isMaterialCompleted(material._id);

                return (
                  <div
                    key={material._id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition ${
                      isCompleted
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleMaterialComplete(material._id, isCompleted)}
                      className="flex-shrink-0 focus:outline-none"
                    >
                      {isCompleted ? (
                        <FaCheckCircle size={24} className="text-green-600" />
                      ) : (
                        <FaCircle size={24} className="text-gray-300 hover:text-gray-400" />
                      )}
                    </button>

                    {/* Material Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getMaterialIcon(material.type)}
                        <h3
                          className={`font-semibold ${
                            isCompleted ? "text-green-800 line-through" : "text-gray-800"
                          }`}
                        >
                          {index + 1}. {material.title}
                        </h3>
                      </div>
                      {material.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {material.description}
                        </p>
                      )}
                    </div>

                    {/* Type Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        material.type === "video"
                          ? "bg-red-100 text-red-700"
                          : material.type === "pdf"
                          ? "bg-red-100 text-red-700"
                          : material.type === "image"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {material.type.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
