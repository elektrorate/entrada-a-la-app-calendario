-- Migration to synchronize DB with Frontend (calendario-taller-jesus)

-- 1. Table: students
-- Frontend expects split name/surname, but DB has full_name. 
-- We can add name/surname columns or keep using full_name and parse it in frontend.
-- Adding columns for now to match frontend expectations directly.
ALTER TABLE students ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS surname text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS phone_country text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS birth_day integer;
ALTER TABLE students ADD COLUMN IF NOT EXISTS birth_month integer;
ALTER TABLE students ADD COLUMN IF NOT EXISTS birth_year integer;
ALTER TABLE students ADD COLUMN IF NOT EXISTS classes_remaining integer DEFAULT 0;
ALTER TABLE students ADD COLUMN IF NOT EXISTS payment_method text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS observations text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS price numeric;
ALTER TABLE students ADD COLUMN IF NOT EXISTS class_type text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS expiry_date timestamp with time zone;

-- 2. Table: teachers
CREATE TABLE IF NOT EXISTS teachers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    sede_id uuid REFERENCES sedes(id), -- Added for Multi-tenancy
    name text NOT NULL,
    surname text,
    email text,
    phone text,
    specialty text,
    notes text,
    created_at timestamp with time zone DEFAULT now()
);

-- 3. Table: student_assigned_classes
CREATE TABLE IF NOT EXISTS student_assigned_classes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id uuid REFERENCES students(id) ON DELETE CASCADE,
    sede_id uuid REFERENCES sedes(id), -- Added for Multi-tenancy
    date text,
    start_time text,
    end_time text,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now()
);

-- 4. Table: pieces (Frontend) vs ceramic_pieces (DB)
-- Recommendation: Rename DB table or Create View.
-- Adding missing columns to ceramic_pieces.
ALTER TABLE ceramic_pieces ADD COLUMN IF NOT EXISTS glaze_type text;
ALTER TABLE ceramic_pieces ADD COLUMN IF NOT EXISTS delivery_date timestamp with time zone;
ALTER TABLE ceramic_pieces ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE ceramic_pieces ADD COLUMN IF NOT EXISTS extra_commentary text;

-- 5. Table: gift_cards
CREATE TABLE IF NOT EXISTS gift_cards (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    sede_id uuid REFERENCES sedes(id), -- Added for Multi-tenancy
    buyer text,
    recipient text,
    num_classes integer,
    type text,
    scheduled_date timestamp with time zone,
    extra_commentary text,
    created_at timestamp with time zone DEFAULT now()
);

-- 6. Table: sessions
-- Frontend expects 'teacher_id', 'teacher_substitute_id', 'completed_at', 'workshop_name', 'private_reason', 'class_type'
-- DB has 'instructor_id', 'type', 'title'.
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS teacher_id uuid REFERENCES teachers(id);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS teacher_substitute_id uuid REFERENCES teachers(id);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS completed_at timestamp with time zone;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS workshop_name text;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS private_reason text;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS class_type text; -- Frontend uses this specific name

-- 7. Table: session_students (Frontend) vs session_bookings (DB)
-- Frontend uses 'attendance' (present/absent/pending). DB uses 'status'.
-- We can map them, but for strict sync:
ALTER TABLE session_bookings ADD COLUMN IF NOT EXISTS student_name text; -- Frontend uses this for caching/display?
ALTER TABLE session_bookings ADD COLUMN IF NOT EXISTS attendance text;

-- 8. Enable RLS on new tables
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_assigned_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;

-- 9. Create policies for new tables (Multi-tenancy isolation)
-- Using DO block to avoid errors if policies already exist
DO $$
BEGIN
    -- Teachers Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'teachers' AND policyname = 'Tallerista view own teachers') THEN
        CREATE POLICY "Tallerista view own teachers" ON teachers FOR SELECT USING (sede_id = get_owned_sede_id());
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'teachers' AND policyname = 'Tallerista manage own teachers') THEN
        CREATE POLICY "Tallerista manage own teachers" ON teachers FOR ALL USING (sede_id = get_owned_sede_id());
    END IF;

    -- Gift Cards Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gift_cards' AND policyname = 'Tallerista view own gift_cards') THEN
        CREATE POLICY "Tallerista view own gift_cards" ON gift_cards FOR SELECT USING (sede_id = get_owned_sede_id());
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gift_cards' AND policyname = 'Tallerista manage own gift_cards') THEN
        CREATE POLICY "Tallerista manage own gift_cards" ON gift_cards FOR ALL USING (sede_id = get_owned_sede_id());
    END IF;
    
     -- Assigned Classes Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'student_assigned_classes' AND policyname = 'Tallerista view assigned classes') THEN
        CREATE POLICY "Tallerista view assigned classes" ON student_assigned_classes FOR SELECT USING (sede_id = get_owned_sede_id());
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'student_assigned_classes' AND policyname = 'Tallerista manage assigned classes') THEN
        CREATE POLICY "Tallerista manage assigned classes" ON student_assigned_classes FOR ALL USING (sede_id = get_owned_sede_id());
    END IF;
END
$$;
