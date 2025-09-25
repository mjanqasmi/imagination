
import React, { useState } from 'react';
import Header from './Header';
import Button from './Button';
import ImageCard from './ImageCard';
import { generateImage } from '../services/geminiService';
import type { GeneratedImage } from '../types';
import Spinner from './Spinner';

interface ImageGeneratorPageProps {
  onLogout: () => void;
}

const ImageGeneratorPage: React.FC<ImageGeneratorPageProps> = ({ onLogout }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await generateImage(prompt);
      const newImage: GeneratedImage = {
        id: new Date().toISOString(),
        src: imageUrl,
        prompt: prompt,
      };
      setImages(prevImages => [newImage, ...prevImages]);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const examplePrompts = [
    "A majestic lion with a crown of stars, photorealistic",
    "A surrealist painting of a clock melting on a tree branch",
    "A cute robot serving coffee in a futuristic cafe, 3D render",
    "A vibrant coral reef teeming with bioluminescent fish",
  ];
  
  const handleExamplePrompt = (example: string) => {
    setPrompt(example);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={onLogout} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-100 mb-2">
            Bring Your Imagination to Life
          </h2>
          <p className="text-center text-lg text-gray-400 mb-8">
            Describe anything you can imagine, and let our AI create a unique image for you.
          </p>

          <form onSubmit={handleGenerateImage} className="mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A cinematic shot of a raccoon in a space suit"
                className="w-full bg-transparent text-gray-100 placeholder-gray-500 p-3 rounded-md focus:outline-none"
                disabled={isLoading}
              />
              <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </form>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center mb-8">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {isLoading && (
            <div className="text-center my-16">
              <Spinner />
              <p className="text-gray-400 mt-4 text-lg">Conjuring up your masterpiece... please wait.</p>
            </div>
          )}

          {!isLoading && images.length === 0 && (
            <div className="text-center py-10 px-6 bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-700">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Your creations will appear here</h3>
                <p className="text-gray-400 mb-6">Need some inspiration? Try one of these prompts:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {examplePrompts.map(p => (
                        <button key={p} onClick={() => handleExamplePrompt(p)} className="bg-gray-700 text-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-600 transition-colors">
                            {p}
                        </button>
                    ))}
                </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageGeneratorPage;
