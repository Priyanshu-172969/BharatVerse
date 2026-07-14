-- Remove all duplicate names, keeping only the first occurrence (lowest ID)
DELETE FROM personalities 
WHERE id NOT IN (
    SELECT MIN(id) FROM personalities GROUP BY name
);