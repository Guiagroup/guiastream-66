export interface Video {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  upload_date: string;
  is_favorite: boolean;
  last_played_position: number;
}

export interface VideoUploadData extends Omit<Video, 'id' | 'user_id'> {}
export interface VideoUpdateData extends Partial<VideoUploadData> {}