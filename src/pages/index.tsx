import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserVideos } from '@/services/video';
import VideoCard from '@/components/video/VideoCard';
import { Video } from '@/services/video/types';

export default function Home() {
  const { data: videos, isLoading, error } = useQuery<Video[]>({
    queryKey: ['videos'],
    queryFn: fetchUserVideos
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
}