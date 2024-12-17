import { supabase } from "@/integrations/supabase/client";
import { VideoUploadData, VideoUpdateData } from "./types";

export const createVideo = async (videoData: VideoUploadData) => {
  const { data, error } = await supabase
    .from('videos')
    .insert([videoData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateVideo = async (id: string, updates: VideoUpdateData) => {
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateLastPlayedPosition = async (id: string, position: number) => {
  const { error } = await supabase
    .from('videos')
    .update({ last_played_position: position })
    .eq('id', id);

  if (error) throw error;
};

export const deleteVideo = async (id: string) => {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);

  if (error) throw error;
};