"use client";
import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure the component only renders on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= 300) {
        setShowButton(true);
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [hasMounted]);

  if (!hasMounted) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <video ref={videoRef} width="640" controls>
        <source src="caminho-do-seu-video.mp4" type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>

      {showButton && (
        <button className="mt-4">Clique aqui</button>
      )}
    </div>
  );
};

export default VideoPlayer;
