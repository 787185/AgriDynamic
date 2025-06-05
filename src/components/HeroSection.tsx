import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  videoSrc: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  height?: string;
}

const HeroSection = ({ 
  videoSrc, 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  height = "h-screen" 
}: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video slightly
    }
  }, []);

  return (
    <div className={`relative ${height} w-full overflow-hidden`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 min-w-full min-h-full object-cover"
        src={videoSrc}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            {subtitle}
          </p>
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-block px-6 py-3 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium transition-colors duration-200"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;