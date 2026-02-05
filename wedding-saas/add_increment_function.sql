CREATE OR REPLACE FUNCTION increment_slug_count(p_user_id UUID) 
RETURNS VOID AS $$ 
BEGIN 
    UPDATE profiles 
    SET slug_change_count = COALESCE(slug_change_count, 0) + 1 
    WHERE id = p_user_id; 
END; 
$$ LANGUAGE plpgsql;
