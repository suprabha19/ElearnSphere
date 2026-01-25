import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCertificate, FaEye, FaDownload } from "react-icons/fa";
import axios from "axios";

const MyCertificates = () => {
  const [certificates, setC ertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/certificates",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCertificates(res.data.certificates || []);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Certificates</h1>
          <p className="text-gray-600 mt-1">
            View and download your earned certificates
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <FaCertificate size={64} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              No Certificates Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Complete courses to earn certificates
            </p>
            <Link
              to="/courses"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {/* Certificate Preview */}
                <div className="relative h-48 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center border-b-4 border-yellow-600">
                  <div className="text-center p-4">
                    <FaCertificate size={48} className="mx-auto mb-3 text-yellow-600" />
                    <h3 className="font-bold text-gray-800 line-clamp-2">
                      {cert.course.title}
                    </h3>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Issued:</strong>{" "}
                    {new Date(cert.issuedDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Certificate #{cert.certificateNumber}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/certificates/${cert._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaEye /> View
                    </Link>
                    <Link
                      to={`/certificates/${cert._id}`}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition"
                    >
                      <FaDownload />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {certificates.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Statistics
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {certificates.length}
                </p>
                <p className="text-sm text-gray-600">Total Certificates</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">
                  {certificates.filter((c) => 
                    new Date(c.issuedDate).getFullYear() === new Date().getFullYear()
                  ).length}
                </p>
                <p className="text-sm text-gray-600">This Year</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">
                  {certificates.filter((c) => 
                    new Date(c.issuedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
                <p className="text-sm text-gray-600">Last 30 Days</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;
