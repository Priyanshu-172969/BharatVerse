/*
# Drop FK constraint on dynasties.civilization_id

The pasted dynasty data references many civilization_id values (mahajanapada, shunga, 
kanva, satavahana, kshatrapa, etc.) that don't exist in the civilizations table (which 
only has 10 rows). The civilization_id column is used as a loose grouping reference, 
not a strict FK. Dropping the FK constraint allows inserting all 178 unique dynasties 
without data loss.
*/

ALTER TABLE dynasties DROP CONSTRAINT IF EXISTS dynasties_civilization_id_fkey;
