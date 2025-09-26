import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/FoodPartnerProfile.css';

function FoodPartnerProfile() {
    const { video } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:8000/food/" + video)
            .then((res) => {
                console.log("foodpartner profile:-", res.data);
                setProfileData(res.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError("Failed to load profile data");
                setLoading(false);
            });
    }, [video]);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    if (loading) {
        return (
            <div className="fpp-container fpp-loading">
                <div className="fpp-loading-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fpp-container fpp-error">
                <p>{error}</p>
                <button className="fpp-back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="fpp-container fpp-error">
                <p>No profile data found</p>
                <button className="fpp-back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const { profile, foodPartnerVideos } = profileData;

    return (
        <div className="fpp-container">
            {/* Header with Back Button */}
            <header className="fpp-header">
                <button className="fpp-back-btn" onClick={() => navigate(-1)}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                    Back
                </button>
                <h1 className="fpp-header-title">Restaurant Profile</h1>
                <div className="fpp-header-spacer"></div>
            </header>

            {/* Profile Section */}
            <section className="fpp-profile-section">
                <div className="fpp-profile-container">
                    <div className="fpp-image-container">
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" 
                            alt={`${profile.ownerName}'s profile`}
                            className="fpp-profile-img"
                        />
                        <div className="fpp-online-indicator"></div>
                    </div>
                    
                    <div className="fpp-details">
                        <div className="fpp-badge">Verified Partner</div>
                        <h1 className="fpp-restaurant-name">{profile.restaurantName}</h1>
                        <p className="fpp-owner-name">Owner: {profile.ownerName}</p>
                        
                        <div className="fpp-rating">
                            <div className="fpp-stars">★★★★★</div>
                            <span className="fpp-rating-text">4.8 (128 reviews)</span>
                        </div>
                        
                        <div className="fpp-contact-info">
                            <div className="fpp-contact-item">
                                <span className="fpp-contact-icon">📧</span>
                                <span>{profile.businessEmail}</span>
                            </div>
                            <div className="fpp-contact-item">
                                <span className="fpp-contact-icon">📞</span>
                                <span>{profile.phoneNo}</span>
                            </div>
                            <div className="fpp-contact-item">
                                <span className="fpp-contact-icon">📍</span>
                                <span>{profile.businessAdd}</span>
                            </div>
                        </div>

                        <div className="fpp-action-buttons">
                            <button className="fpp-action-btn fpp-call-btn">
                                <span>📞</span> Call Now
                            </button>
                            <button className="fpp-action-btn fpp-direction-btn">
                                <span>📍</span> Get Directions
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Videos Section */}
            <section className="fpp-videos-section">
                <div className="fpp-videos-header">
                    <div className="fpp-videos-title-container">
                        <h2 className="fpp-videos-title">Menu Videos</h2>
                        <span className="fpp-videos-count">({foodPartnerVideos.length})</span>
                    </div>
                    <p className="fpp-videos-subtitle">Explore our delicious offerings</p>
                    
                    {foodPartnerVideos.length > 0 && (
                        <div className="fpp-videos-filter">
                            <button className="fpp-filter-btn active">All</button>
                            <button className="fpp-filter-btn">Popular</button>
                            <button className="fpp-filter-btn">Recent</button>
                        </div>
                    )}
                </div>
                
                {foodPartnerVideos.length === 0 ? (
                    <div className="fpp-no-videos">
                        <div className="fpp-no-videos-icon">🎥</div>
                        <h3>No videos uploaded yet</h3>
                        <p>Check back later for menu videos</p>
                    </div>
                ) : (
                    <div className="fpp-videos-container">
                        <div className="fpp-videos-grid">
                            {foodPartnerVideos.map((video) => (
                                <div 
                                    key={video._id} 
                                    className="fpp-video-card"
                                    onClick={() => handleVideoClick(video)}
                                >
                                    <div className="fpp-video-thumbnail">
                                        <video 
                                            muted 
                                            playsInline
                                            preload="metadata"
                                            onMouseEnter={(e) => e.target.play()}
                                            onMouseLeave={(e) => {
                                                e.target.pause();
                                                e.target.currentTime = 0;
                                            }}
                                        >
                                            <source src={video.video + "#t=0.1"} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="fpp-play-overlay">
                                            <button className="fpp-play-btn">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="fpp-video-duration">2:30</div>
                                    </div>
                                    
                                    <div className="fpp-video-info">
                                        <h3 className="fpp-video-title">{video.desc}</h3>
                                        <div className="fpp-video-meta">
                                            <span className="fpp-video-views">1.2K views</span>
                                            <span className="fpp-video-date">2 days ago</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fpp-video-modal" onClick={closeVideoModal}>
                    <div className="fpp-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="fpp-modal-close" onClick={closeVideoModal}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                        <video 
                            className="fpp-modal-video"
                            controls 
                            autoPlay
                            src={selectedVideo.video}
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="fpp-modal-info">
                            <h3>{selectedVideo.desc}</h3>
                            <p>Posted by {profile.restaurantName}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FoodPartnerProfile;