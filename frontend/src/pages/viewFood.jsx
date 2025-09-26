import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ViewFood.css";
import axios from "axios";

function ViewFood() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/food/getfood", { withCredentials: true })
      .then((res) => {
        console.log("res.data:", res.data); // 👀 logs { data: [...] }
        console.log("res.data.data:", res.data.data); // 👀 logs your array
        setVideos(res.data.data); // ✅ grab the array
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(videos);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(new Set());

  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  // Handle back navigation
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Handle video loading
  const handleVideoLoad = useCallback((index) => {
    setLoadedVideos((prev) => new Set(prev).add(index));
  }, []);

  // Play/pause video functionality
  const togglePlayPause = useCallback(() => {
    const currentVideoElement = videoRefs.current[currentVideo];
    if (!currentVideoElement) return;

    if (isPlaying) {
      currentVideoElement.pause();
    } else {
      currentVideoElement.play();
    }
    setIsPlaying(!isPlaying);
  }, [currentVideo, isPlaying]);

  // Mute/unmute functionality
  const toggleMute = useCallback(() => {
    const currentVideoElement = videoRefs.current[currentVideo];
    if (!currentVideoElement) return;

    currentVideoElement.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [currentVideo, isMuted]);

  // Navigate to specific video
  const navigateToVideo = useCallback(
    (index) => {
      if (index < 0 || index >= videos.length || index === currentVideo) return;

      const container = containerRef.current;
      if (!container) return;

      // Pause current video
      if (videoRefs.current[currentVideo]) {
        videoRefs.current[currentVideo].pause();
      }

      setCurrentVideo(index);

      // Smooth scroll to target video
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: "smooth",
      });

      // Play new video after a short delay
      setTimeout(() => {
        if (videoRefs.current[index]) {
          videoRefs.current[index].play();
          setIsPlaying(true);
        }
      }, 300);
    },
    [currentVideo, videos.length]
  );

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault(); // Prevent default scrolling
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      touchEndY.current = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY.current;
      const threshold = 50;

      if (Math.abs(deltaY) < threshold) return;

      if (deltaY > 0) {
        // Swipe up - next video
        navigateToVideo(currentVideo + 1);
      } else {
        // Swipe down - previous video
        navigateToVideo(currentVideo - 1);
      }
    },
    [currentVideo, navigateToVideo]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          navigateToVideo(currentVideo - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          navigateToVideo(currentVideo + 1);
          break;
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentVideo, navigateToVideo, togglePlayPause, toggleMute]);

  // Intersection Observer for video autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = parseInt(entry.target.dataset.index);
          const video = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            // Video is in view
            video.play().catch(() => {
              // Handle autoplay restrictions
              setIsPlaying(false);
            });
            setCurrentVideo(videoIndex);
            setIsPlaying(true);
          } else {
            // Video is out of view
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      {
        root: container,
        rootMargin: "0px",
        threshold: [0.5, 0.7, 0.9],
      }
    );

    // Observe all video elements
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  // Preload adjacent videos for smooth experience
  useEffect(() => {
    const preloadAdjacent = () => {
      const indicesToLoad = [
        currentVideo - 1,
        currentVideo,
        currentVideo + 1,
      ].filter((index) => index >= 0 && index < videos.length);

      indicesToLoad.forEach((index) => {
        const video = videoRefs.current[index];
        if (video && !loadedVideos.has(index)) {
          video.load();
        }
      });
    };

    preloadAdjacent();
  }, [currentVideo, videos.length, loadedVideos]);
  function handleOrderfood(url) {
    // const navigate=useNavigate();
    console.log("clicked");
    navigate(`/food/${url}`);
  }
  return (
    <div className="view-food-container">
      <button className="back-button" onClick={handleBack} aria-label="Go back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>

      <div className="video-controls">
        <button
          className="control-btn mute-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {isMuted ? (
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            )}
          </svg>
        </button>
      </div>

      {/* Videos Container */}
      <div
        className="videos-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {videos.map((video, index) => (
          <div key={video._id} className="video-item">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              data-index={index}
              className={`video-player ${
                loadedVideos.has(index) ? "loaded" : ""
              }`}
              loop
              muted={isMuted}
              playsInline
              preload={
                Math.abs(index - currentVideo) <= 1 ? "auto" : "metadata"
              }
              onLoadedData={() => handleVideoLoad(index)}
              onClick={togglePlayPause}
              onPlay={() => index === currentVideo && setIsPlaying(true)}
              onPause={() => index === currentVideo && setIsPlaying(false)}
            >
              <source src={video.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!loadedVideos.has(index) && (
              <div className="video-loading">
                <div className="loading-spinner"></div>
              </div>
            )}

            <div className="video-overlay">
              <div className="video-details">
                <h3>{video.desc}</h3>
                <div className="video-actions">
                  {/* Profile Image Link - Now on the left */}
                  <a
                    href={`/foodPartnerProfile/${video._id}`} // Replace with actual profile URL structure
                    className="profile-link"
                    aria-label="View profile"
                  >
                    <img
                      src={video.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"} // Fallback for missing images
                      alt="Profile"
                      className="profile-image"
                      onError={(e) => {
                        e.target.src = "/default-profile.png"; // Fallback image on error
                      }}
                    />
                  </a>

                  {/* Order Food Button - Now on the right */}
                  <button
                    style={{
                      backgroundColor: "#9d8854",
                      padding: "7px 20px",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                      border: "0.5px solid white",
                      borderRadius: "7px",
                    }}
                    onClick={() => {
                      handleOrderfood(video._id);
                    }}
                  >
                    Order Food
                  </button>
                </div>
              </div>
            </div>

            {!isPlaying && index === currentVideo && (
              <div className="play-pause-overlay">
                <button className="play-button" onClick={togglePlayPause}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewFood;
