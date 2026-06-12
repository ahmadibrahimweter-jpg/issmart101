CREATE POLICY "Contact submissions are never publicly readable"
ON public.contact_submissions
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);