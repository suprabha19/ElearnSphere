import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCertificate, FaDownload, FaCheck } from "react-icons/fa";
import axios from "axios";

const CertificateView = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/certificates/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCertificate(res.data.certificate);
    } catch (error) {
      console.error("Failed to fetch certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // This would typically generate a PDF
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaCertificate size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600">Certificate not found</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(certificate.issuedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-6 print:hidden">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaDownload /> Download/Print
          </button>
        </div>

        {/* Certificate */}
        <div className="bg-white p-12 rounded-lg shadow-2xl border-8 border-double border-yellow-600">
          {/* Header with Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
              <FaCertificate size={64} className="text-yellow-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Certificate of Completion
            </h1>
            <div className="w-32 h-1 bg-yellow-600 mx-auto"></div>
          </div>

          {/* Body */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-600 mb-6">This is to certify that</p>
            
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              {certificate.student.fullName}
            </h2>

            <p className="text-xl text-gray-600 mb-4">
              has successfully completed the course
            </p>

            <h3 className="text-3xl font-semibold text-gray-800 mb-8">
              {certificate.course.title}
            </h3>

            <p className="text-gray-600 mb-2">
              on {formattedDate}
            </p>

            {certificate.course.instructor && (
              <p className="text-gray-600 mb-8">
                Instructor: {certificate.course.instructor.fullName}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t-2 border-gray-200">
            <div className="text-center">
              <div className="w-48 h-px bg-gray-400 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Signature</p>
              <p className="text-xs text-gray-500 mt-1">ElearnSphere Platform</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-px bg-gray-400 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Date Issued</p>
              <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
            </div>
          </div>

          {/* Certificate Number */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Certificate Number: {certificate.certificateNumber}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Verify at: {certificate.verificationUrl}
            </p>
          </div>

          {/* Seal/Badge */}
          <div className="absolute top-8 right-8 print:block hidden">
            <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-yellow-700 transform rotate-12">
              <FaCheck size={40} className="text-white" />
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg print:hidden">
          <p className="text-sm text-blue-800">
            <strong>Verification:</strong> This certificate can be verified at{" "}
            <a
              href={certificate.verificationUrl}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.verificationUrl}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
