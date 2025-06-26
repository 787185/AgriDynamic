// frontend/src/components/HeroSection.tsx
import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  // Change videoSrc to mediaSrc to be more generic
  mediaSrc: string; // This can now be a path to a video or an image
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  height?: string;
}

const HeroSection = ({
  mediaSrc, // Use mediaSrc
  title,
  subtitle,
  buttonText,
  buttonLink,
  height = "h-screen"
}: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine if the media source is a video or an image based on extension
  const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.ogg');
  const isImage = mediaSrc.endsWith('.jpg') || mediaSrc.endsWith('.jpeg') || mediaSrc.endsWith('.png') || mediaSrc.endsWith('.gif') || mediaSrc.endsWith('.webp');

  useEffect(() => {
    // Only apply playback rate if it's actually a video
    if (isVideo && videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video slightly
    }
  }, [isVideo, mediaSrc]); // Depend on isVideo and mediaSrc to re-run if they change

  return (
    <div className={`relative ${height} w-full overflow-hidden`}>
      {/* Media Background (Conditional Rendering) */}
      {isVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 min-w-full min-h-full object-cover"
          src={mediaSrc} // Use mediaSrc
        />
      ) : isImage ? (
        <img
          src={mediaSrc} // Use mediaSrc
          alt={title + " Background"} // Add alt text for accessibility
          className="absolute inset-0 min-w-full min-h-full object-cover"
        />
      ) : (
        // Fallback or error if mediaSrc is neither video nor image
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-white">
          <p>Invalid media source provided.</p>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-8xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight border-b-4 ">
            {title}
          </h1>
          <p className="text-5xl sm:text-4xl text-gray-200 mb-8 font-semibold">
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