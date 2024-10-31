import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= 300) {
        setShowButton(true);
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate); // Remove event after showing the button
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate); // Add event listener
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate); // Cleanup event listener
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} width="640" controls>
        <source src="caminho-do-seu-video.mp4" type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>

      {showButton && (
        <button style={{ marginTop: '10px' }}>Clique aqui</button>
      )}
    </div>
  );
};

export default VideoPlayer;
