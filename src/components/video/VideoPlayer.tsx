import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Video } from '@/services/video/types';
import { fetchVideosByCategory, updateLastPlayedPosition } from '@/services/video';
import VideoCard from './VideoCard';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Video[]>([]);

  useEffect(() => {
    // Set initial position when video loads
    if (videoRef.current && video.last_played_position) {
      videoRef.current.currentTime = video.last_played_position;
    }

    // Fetch recommendations
    fetchVideosByCategory(video.category, video.id)
      .then(setRecommendations)
      .catch(console.error);
  }, [video]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = Math.floor(videoRef.current.currentTime);
      // Update position every 5 seconds to avoid too many requests
      if (currentTime % 5 === 0) {
        updateLastPlayedPosition(video.id, currentTime).catch(console.error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-lg"
        controls
        onTimeUpdate={handleTimeUpdate}
        src={video.video_url}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">More from this category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <VideoCard key={rec.id} video={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;