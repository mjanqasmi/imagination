
import React from 'react';
import type { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-indigo-500/20">
      <img src={image.src} alt={image.prompt} className="w-full h-full object-cover aspect-square" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-sm text-gray-200 line-clamp-3">{image.prompt}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
