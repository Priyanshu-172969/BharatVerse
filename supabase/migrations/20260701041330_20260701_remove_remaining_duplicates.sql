-- Remove any remaining duplicates
DELETE FROM personalities 
WHERE id NOT IN (
    SELECT MIN(id) FROM personalities GROUP BY name
);