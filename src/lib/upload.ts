import { supabase } from "@/integrations/supabase/client";

export const BUCKET = "outfit-oasis";

export type UploadFolder = "profiles" | "wardrobe" | "outfits" | "boards";

/** One year — long-lived signed URL for a private bucket. */
const SIGNED_URL_TTL = 60 * 60 * 24 * 365;

export async function uploadImage(
  folder: UploadFolder,
  userId: string,
  file: File,
): Promise<{ path: string; url: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signError || !data) throw signError ?? new Error("Could not prepare that image.");

  return { path, url: data.signedUrl };
}

export async function deleteImage(path: string) {
  await supabase.storage.from(BUCKET).remove([path]);
}
