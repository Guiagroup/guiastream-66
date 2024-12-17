import { supabase } from "@/integrations/supabase/client";
import { Video, VideoUploadData, VideoUpdateData } from "./types";

export const fetchUserVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('upload_date', { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchVideoById = async (id: string): Promise<Video> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const fetchVideosByCategory = async (category: string, currentVideoId?: string): Promise<Video[]> => {
  let query = supabase
    .from('videos')
    .select('*')
    .eq('category', category)
    .order('upload_date', { ascending: false });
    
  if (currentVideoId) {
    query = query.neq('id', currentVideoId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};