import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent } from "@/components/ui/card";
import { Video } from '@/services/video/types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const router = useRouter();

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/player/${video.id}`)}
    >
      <CardContent className="p-4">
        <div className="relative aspect-video mb-4">
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover rounded-md"
          />
          {video.last_played_position > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
              Resume at {Math.floor(video.last_played_position / 60)}:{String(video.last_played_position % 60).padStart(2, '0')}
            </div>
          )}
        </div>
        <h3 className="font-semibold truncate">{video.title}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">{video.description}</p>
      </CardContent>
    </Card>
  );
};

export default VideoCard;