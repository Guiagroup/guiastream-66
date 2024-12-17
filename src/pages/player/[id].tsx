import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchVideoById } from '@/services/video';
import VideoPlayer from '@/components/video/VideoPlayer';

export default function PlayerPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: video, isLoading, error } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchVideoById(id as string),
    enabled: !!id
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading video</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <VideoPlayer video={video} />
    </main>
  );
}