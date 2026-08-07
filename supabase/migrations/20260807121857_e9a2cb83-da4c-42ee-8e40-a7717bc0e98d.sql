
CREATE POLICY "oasis own files read" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'outfit-oasis' AND (storage.foldername(name))[2] = auth.uid()::text);
CREATE POLICY "oasis own files insert" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'outfit-oasis' AND (storage.foldername(name))[2] = auth.uid()::text);
CREATE POLICY "oasis own files update" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'outfit-oasis' AND (storage.foldername(name))[2] = auth.uid()::text);
CREATE POLICY "oasis own files delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'outfit-oasis' AND (storage.foldername(name))[2] = auth.uid()::text);
