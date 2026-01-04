'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { getIframe } from '@/lib/api';

interface VideoPlayerProps {
  iframeUrl: string;
  mirrorData: any;
  title: string;
}

export default function VideoPlayer({ iframeUrl, mirrorData, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('480p');
  const [selectedServer, setSelectedServer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showQualities, setShowQualities] = useState(false);
  
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showControls, setShowControls] = useState(true);

  // Available qualities from mirror data
  const availableQualities = Object.keys(mirrorData || {}).filter(key => 
    key.startsWith('m') && mirrorData[key]?.length > 0
  ).map(key => key.replace('m', ''));

  // Available servers for selected quality
  const availableServers = mirrorData?.[`m${selectedQuality}`] || [];

  // Reset controls timeout
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Handle quality change
  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
    setSelectedServer(0);
    setIsLoading(true);
    setShowQualities(false);
  };

  // Handle server change
  const handleServerChange = (index: number) => {
    setSelectedServer(index);
    setIsLoading(true);
  };

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  // Handle progress change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    resetControlsTimeout();
  };

  // Mouse move handler
  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  useEffect(() => {
    resetControlsTimeout();
    
    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [isPlaying]);

  return (
    <div 
      ref={videoRef}
      className="relative bg-black rounded-xl overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* Video Container */}
      <div className="relative aspect-video">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-300">Memuat video...</p>
              <p className="text-sm text-gray-400 mt-2">
                Server: {availableServers[selectedServer]?.nama || 'Loading...'} • {selectedQuality}
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center p-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-300">Gagal memuat video</p>
              <p className="text-sm text-gray-400 mt-2">{error}</p>
              <button 
                onClick={() => setIsLoading(true)}
                className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Video Iframe */}
        {!error && (
          <iframe
            src={iframeUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError('Gagal memuat video. Coba server lain.');
              setIsLoading(false);
            }}
          />
        )}

        {/* Controls Overlay */}
        {showControls && !isLoading && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="text-sm font-medium truncate max-w-[70%]">
                {title}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQualities(!showQualities)}
                  className="px-3 py-1 bg-black/70 rounded text-sm"
                >
                  {selectedQuality}
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-2 bg-black/70 rounded"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Middle Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={handlePlayPause} className="hover:opacity-80">
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={handleMuteToggle} className="hover:opacity-80">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="hover:opacity-80"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    
                    {/* Settings Menu */}
                    {showSettings && (
                      <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-2">
                        <div className="mb-2">
                          <p className="text-xs text-gray-400 mb-1">Kualitas</p>
                          <div className="space-y-1">
                            {availableQualities.map((quality) => (
                              <button
                                key={quality}
                                onClick={() => handleQualityChange(quality)}
                                className={`w-full text-left px-3 py-2 rounded text-sm ${
                                  selectedQuality === quality
                                    ? 'bg-blue-600'
                                    : 'hover:bg-gray-800'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{quality}p</span>
                                  {selectedQuality === quality && (
                                    <Check className="w-4 h-4" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Server</p>
                          <div className="space-y-1">
                            {availableServers.map((server: any, index: number) => (
                              <button
                                key={index}
                                onClick={() => handleServerChange(index)}
                                className={`w-full text-left px-3 py-2 rounded text-sm ${
                                  selectedServer === index
                                    ? 'bg-green-600'
                                    : 'hover:bg-gray-800'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{server.nama || `Server ${index + 1}`}</span>
                                  {selectedServer === index && (
                                    <Check className="w-4 h-4" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button onClick={handleFullscreen} className="hover:opacity-80">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quality Selector Popup */}
        {showQualities && (
          <div className="absolute top-16 right-4 bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-3 w-48">
            <p className="text-xs text-gray-400 mb-2">Pilih Kualitas</p>
            <div className="space-y-1">
              {availableQualities.map((quality) => (
                <button
                  key={quality}
                  onClick={() => handleQualityChange(quality)}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    selectedQuality === quality
                      ? 'bg-blue-600'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{quality}p</span>
                    {selectedQuality === quality && (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Server Selection Bar */}
      <div className="p-3 bg-gray-900 border-t border-gray-800">
        <div className="flex flex-wrap gap-2">
          <p className="text-sm text-gray-400 w-full mb-2">Server:</p>
          {availableServers.map((server: any, index: number) => (
            <button
              key={index}
              onClick={() => handleServerChange(index)}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                selectedServer === index
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {server.nama || `Server ${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}