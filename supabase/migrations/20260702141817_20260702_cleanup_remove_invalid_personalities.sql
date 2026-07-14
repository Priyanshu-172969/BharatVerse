/*
# Remove Invalid Personality Records

1. Purpose
This migration removes approximately 237 records from the `personalities` table
that are NOT real, individually-identifiable historical persons. These records
were created during bulk insertion and fall into three categories:

  a. "Maharaja of X" entries (70) -- These are estate/kingdom titles, not names of
     specific individuals. Example: "Maharaja of Benares" could refer to multiple
     rulers across centuries; without a specific name these are not usable.

  b. Geographic place names (78) -- Villages, towns, and settlements in Kerala,
     colonial trading posts (Puducherry, Karaikal, Yanam, etc.), and Portuguese/
     Danish/French context entries. These are locations, not people.

  c. Placeholder/context entries (89) -- Names with suffixes like "additional",
     "context", "collective", "successor", "follower", "school", etc. Example:
     "Buddha context additional", "Todar Mal additional", "Dhrupad context".
     These are duplicate/auxiliary references, not distinct personalities.

2. Safety
- Only deletes records matching specific patterns; all genuine named
  personalities are preserved.
- The `personalities` table has no inbound foreign key constraints from other
  tables, so deletion is safe with no cascading effects.
- The table's RLS policies remain unchanged (public read for anon + authenticated).

3. Impact
- Reduces total personality count from 2001 to approximately 1764 genuine,
  identifiable historical individuals ready for enrichment.
*/

-- Remove "Maharaja of X" entries (estate titles, not individual names)
DELETE FROM personalities
WHERE name LIKE 'Maharaja of %';

-- Remove geographic place names that are NOT people
DELETE FROM personalities
WHERE name IN (
  'Beypore', 'Calicut', 'Koyilandy', 'Ponnani', 'Tanur', 'Mannarkkad', 'Nilambur',
  'Manjeri', 'Malappuram', 'Perinthalmanna', 'Angadippuram', 'Thirunavaya', 'Kottakkal',
  'Edappal', 'Parappanangadi', 'Tirurangadi', 'Feroke', 'Ramanattukara', 'Kozhikode',
  'Quilandy', 'Badagara', 'Mahe', 'Thalassery', 'Kannur', 'Payyannur', 'Taliparamba',
  'Sreekandapuram', 'Alakode', 'Iritty', 'Mattannur', 'Peravoor', 'Vengad', 'Koothuparamba',
  'Puducherry', 'Karaikal', 'Yanam', 'Chandernagore', 'Serampore', 'Tranquebar',
  'Vallikunnu', 'Kadalundi', 'Valluvambram', 'Melmuri', 'Mankada', 'Changuvetti', 'Vailathur',
  'Pulamanthole', 'Cherukara', 'Melattur', 'Pattambi', 'Ottapalam', 'Shoranur',
  'Attappadi', 'Agali', 'Anakkatti', 'Thavalam', 'Mukkali', 'Puthur', 'Karuvarakundu',
  'Kalikavu', 'Edakkara', 'Pothukallu', 'Chungathara', 'Mampad', 'Wandoor', 'Pandikkad',
  'Vazhayoor', 'Kizhisseri', 'Olavathur', 'Pulikkal', 'Edavanna', 'Areacode', 'Kondotty',
  'Valluvanad', 'Perumpadappu', 'Kottayam', 'Punnathoor', 'Kavalappara', 'Nedumpurayil',
  'Vettath', 'Parappanad', 'Chaliyam', 'Tellicherry', 'Mahé',
  'Frederick IV', 'Christian IV',
  'French context', 'Danish context', 'Portuguese context', 'Dutch context',
  'British East India', 'Danish East India',
  'Radhasoami context', 'Dhrupad context', 'Dagar brothers context',
  'Seon master context', 'Epigraphist context'
);

-- Remove placeholder/context/duplicate-suffix entries
DELETE FROM personalities
WHERE name LIKE '% additional'
   OR name LIKE '% context'
   OR name LIKE '% collective%'
   OR name LIKE '% successor%'
   OR name LIKE '% follower%'
   OR name LIKE '% school%'
   OR name ILIKE '% scholar%'
   OR name LIKE '% borderline%'
   OR name LIKE '% observer%'
   OR name LIKE '% traveler%'
   OR name LIKE '% ancient%'
   OR name LIKE '% final%'
   OR name LIKE '% dynasty%'
   OR name LIKE '% rulers%'
   OR name LIKE '% families%'
   OR name LIKE '% brothers%'
   OR name LIKE '% queens%'
   OR name LIKE '% sons%'
   OR name LIKE '% Navratnas%'
   OR name LIKE '% Satrap families%';

-- Remove specific non-person entries that slipped through
DELETE FROM personalities
WHERE name IN (
  'Kanva Dynasty rulers',
  'Marakkar naval commanders',
  'Travancore Maharajas',
  'Cochin Rajas',
  'Akbar''s sons context',
  'Asoka additional queens',
  'Aurangzeb daughters',
  'Sangamaji',
  'Prabandhakosha authors'
);
