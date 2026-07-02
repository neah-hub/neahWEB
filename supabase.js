import { createClient }
from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://ralijdslwhmwynvfdcnx.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbGlqZHNsd2htd3ludmZkY254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMTE4NTMsImV4cCI6MjA5ODU4Nzg1M30.N98twiwdUU4Yc_oadZQRyZUz-h6OJMxtT6f9EQZct3g";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

window.supabase = supabase;