-- Trigger function to automatically assign sede_id based on the authenticated user
-- This ensures that even if the Frontend forgets to send the sede_id, 
-- the database automatically assigns it to the creator's Sede.
-- This prevents "orphan" records that the creator cannot see.

CREATE OR REPLACE FUNCTION public.assign_sede_id_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Only assist if the field is missing
  IF NEW.sede_id IS NULL THEN
    -- get_owned_sede_id() is our secure function that gets the Sede ID from the user's context
    NEW.sede_id := get_owned_sede_id(); 
  END IF;
  
  -- If it's still null (e.g. Super Admin doing something weird, or user has no sede), 
  -- we let it pass as NULL or handle it. 
  -- Ideally, RLS policies will handle visibility, but this ensures data integrity.
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply this safety net to the new tables
DROP TRIGGER IF EXISTS trg_assign_sede_teachers ON teachers;
CREATE TRIGGER trg_assign_sede_teachers
BEFORE INSERT ON teachers
FOR EACH ROW EXECUTE FUNCTION assign_sede_id_on_insert();

DROP TRIGGER IF EXISTS trg_assign_sede_gift_cards ON gift_cards;
CREATE TRIGGER trg_assign_sede_gift_cards
BEFORE INSERT ON gift_cards
FOR EACH ROW EXECUTE FUNCTION assign_sede_id_on_insert();

DROP TRIGGER IF EXISTS trg_assign_sede_assigned_classes ON student_assigned_classes;
CREATE TRIGGER trg_assign_sede_assigned_classes
BEFORE INSERT ON student_assigned_classes
FOR EACH ROW EXECUTE FUNCTION assign_sede_id_on_insert();

-- Also apply to main tables just in case
DROP TRIGGER IF EXISTS trg_assign_sede_students ON students;
CREATE TRIGGER trg_assign_sede_students
BEFORE INSERT ON students
FOR EACH ROW EXECUTE FUNCTION assign_sede_id_on_insert();
