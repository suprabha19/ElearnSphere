import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const VideoPlayer = ({ videoUrl, courseId, materialId, onComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [watchedSegments, setWatchedSegments] = useState([]);
  const [progressSaveInterval, setProgressSaveInterval] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load video metadata
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    // Track time updates
    const handleTimeUpdate = () => {
      const current = video.currentTime;
      setCurrentTime(current);

      // Track watched segments
      updateWatchedSegments(current);
    };

    // Handle video end
    const handleEnded = () => {
      setIsPlaying(false);
      checkAndMarkComplete();
    };

    // Prevent seeking ahead
    const handleSeeking = () => {
      const current = video.currentTime;
      const maxWatchedTime = getMaxWatchedTime();
      
      // Allow seeking backward, but not forward beyond watched time
      if (current > maxWatchedTime + 2) { // 2 second buffer
        video.currentTime = maxWatchedTime;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeking", handleSeeking);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeking", handleSeeking);
    };
  }, [watchedSegments]);

  // Save progress periodically
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        saveProgressToServer();
      }, 10000); // Save every 10 seconds
      setProgressSaveInterval(interval);
    } else {
      if (progressSaveInterval) {
        clearInterval(progressSaveInterval);
        setProgressSaveInterval(null);
      }
    }

    return () => {
      if (progressSaveInterval) {
        clearInterval(progressSaveInterval);
      }
    };
  }, [isPlaying, currentTime, watchedSegments]);

  const updateWatchedSegments = (current) => {
    setWatchedSegments((prev) => {
      const newSegments = [...prev];
      const segmentSize = 1; // 1 second segments
      const segmentIndex = Math.floor(current / segmentSize);

      // Mark this segment as watched
      if (!newSegments.some((s) => s.start <= current && s.end >= current)) {
        // Try to merge with existing segments
        let merged = false;
        for (let i = 0; i < newSegments.length; i++) {
          if (Math.abs(newSegments[i].end - current) < segmentSize) {
            newSegments[i].end = current + segmentSize;
            merged = true;
            break;
          }
          if (Math.abs(current - newSegments[i].start) < segmentSize) {
            newSegments[i].start = current;
            merged = true;
            break;
          }
        }

        if (!merged) {
          newSegments.push({ start: current, end: current + segmentSize });
        }
      }

      return newSegments;
    });
  };

  const getMaxWatchedTime = () => {
    if (watchedSegments.length === 0) return 0;
    return Math.max(...watchedSegments.map((s) => s.end));
  };

  const getWatchPercentage = () => {
    if (duration === 0) return 0;
    const totalWatched = watchedSegments.reduce((sum, s) => sum + (s.end - s.start), 0);
    return Math.min(100, (totalWatched / duration) * 100);
  };

  const saveProgressToServer = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/progress/course/${courseId}/material/${materialId}/video-progress`,
        {
          currentTime,
          duration,
          watchedSegments,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to save video progress:", error);
    }
  };

  const checkAndMarkComplete = async () => {
    const watchPercentage = getWatchPercentage();
    
    if (watchPercentage >= 95) {
      try {
        const token = localStorage.getItem("token");
        const totalWatched = watchedSegments.reduce((sum, s) => sum + (s.end - s.start), 0);
        
        const res = await axios.post(
          `http://localhost:5000/api/progress/course/${courseId}/material/${materialId}/video-complete`,
          {
            watchTime: totalWatched,
            totalDuration: duration,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (onComplete) {
          onComplete(res.data);
        }
      } catch (error) {
        console.error("Failed to mark video complete:", error);
      }
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    const maxWatchedTime = getMaxWatchedTime();

    // Only allow seeking to watched portions
    if (newTime <= maxWatchedTime + 2) {
      video.currentTime = newTime;
    }
  };

  const watchPercentage = getWatchPercentage();

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click
      />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-2">
          <div
            className="h-1 bg-gray-600 rounded cursor-pointer relative"
            onClick={handleProgressClick}
          >
            {/* Watched portions (green) */}
            {watchedSegments.map((segment, index) => (
              <div
                key={index}
                className="absolute h-full bg-green-500"
                style={{
                  left: `${(segment.start / duration) * 100}%`,
                  width: `${((segment.end - segment.start) / duration) * 100}%`,
                }}
              />
            ))}
            {/* Current position (red) */}
            <div
              className="absolute h-full bg-red-600"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Watch Percentage Indicator */}
        <div className="text-xs text-white mb-2">
          Watched: {Math.round(watchPercentage)}% 
          {watchPercentage >= 95 && <span className="ml-2 text-green-400">✓ Ready to complete</span>}
          {watchPercentage < 95 && <span className="ml-2 text-yellow-400">(Need 95% to complete)</span>}
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button onClick={togglePlay} className="hover:text-blue-400 transition">
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            {/* Time */}
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="hover:text-blue-400 transition">
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="hover:text-blue-400 transition">
            {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
