import React from "react";

const ProgressBar = ({ percentage, showPercentage = true, height = "h-2", color = "bg-blue-600" }) => {
  const displayPercentage = Math.min(100, Math.max(0, percentage || 0));

  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-300`}
          style={{ width: `${displayPercentage}%` }}
        ></div>
      </div>
      {showPercentage && (
        <p className="text-xs text-gray-600 mt-1">
          {displayPercentage}% Complete
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
