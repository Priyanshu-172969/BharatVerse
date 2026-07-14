/*
# Remove Duplicate Personality Records

1. Purpose
This migration removes 19 duplicate personality records where the same
historical individual appears twice under slightly different name formats.
In each pair, the record with the more descriptive/longer name is removed,
keeping the shorter canonical name.

2. Pairs Removed (keeping -> deleting)
  - Akalanka -> Akalanka Deva
  - Amoghavarsha I -> Amoghavarsha I Rashtrakuta
  - Bilhana -> Bilhana Kashmir
  - Chastana -> Chastana Western Kshatrapa
  - Dost Mohammad -> Dost Mohammad Khan
  - Gandaraditya -> Gandaraditya Chola
  - Indra III -> Indra III Rashtrakuta
  - Kirttivarman I -> Kirttivarman I Chalukya
  - Krishna -> Krishna Deva (epic figure, keeping the canonical "Krishna")
  - Krishna II -> Krishna II Rashtrakuta
  - Madanapala -> Madanapala Pala
  - Mahaviracharya -> Mahaviracharya mathematician
  - Pulakeshin II -> Pulakeshin II Chalukya
  - Rajaraja II -> Rajaraja II Chola
  - Tailapa III -> Tailapa III Chalukya
  - Udayaditya -> Udayaditya Paramara
  - Varahamihira -> Varahamihira astronomer
  - Vijayapala -> Vijayapala Pratihara
  - Vikramaditya II -> Vikramaditya II Chalukya

3. Safety
- Only deletes the duplicate record; the canonical name is preserved.
- No foreign key constraints reference these IDs.
*/

DELETE FROM personalities WHERE id = 'p696';  -- Akalanka Deva (dup of Akalanka p595)
DELETE FROM personalities WHERE id = 'p37';   -- Amoghavarsha I Rashtrakuta (dup of Amoghavarsha I p1123)
DELETE FROM personalities WHERE id = 'p292';  -- Bilhana Kashmir (dup of Bilhana p149)
DELETE FROM personalities WHERE id = 'p330';  -- Chastana Western Kshatrapa (dup of Chastana p1042)
DELETE FROM personalities WHERE id = 'p1597'; -- Dost Mohammad Khan (dup of Dost Mohammad p1589)
DELETE FROM personalities WHERE id = 'p403';  -- Gandaraditya Chola (dup of Gandaraditya p227)
DELETE FROM personalities WHERE id = 'p507';  -- Indra III Rashtrakuta (dup of Indra III p1125)
DELETE FROM personalities WHERE id = 'p127';  -- Kirttivarman I Chalukya (dup of Kirttivarman I p1098)
DELETE FROM personalities WHERE id = 'p960';  -- Krishna Deva (dup of Krishna p1309)
DELETE FROM personalities WHERE id = 'p506';  -- Krishna II Rashtrakuta (dup of Krishna II p1124)
DELETE FROM personalities WHERE id = 'p138';  -- Madanapala Pala (dup of Madanapala p1149)
DELETE FROM personalities WHERE id = 'p599';  -- Mahaviracharya mathematician (dup of Mahaviracharya p1265)
DELETE FROM personalities WHERE id = 'p35';   -- Pulakeshin II Chalukya (dup of Pulakeshin II p1100)
DELETE FROM personalities WHERE id = 'p407';  -- Rajaraja II Chola (dup of Rajaraja II p231)
DELETE FROM personalities WHERE id = 'p204';  -- Tailapa III Chalukya (dup of Tailapa III p1116)
DELETE FROM personalities WHERE id = 'p139';  -- Udayaditya Paramara (dup of Udayaditya p1152)
DELETE FROM personalities WHERE id = 'p636';  -- Varahamihira astronomer (dup of Varahamihira p1262)
DELETE FROM personalities WHERE id = 'p200';  -- Vijayapala Pratihara (dup of Vijayapala p1166)
DELETE FROM personalities WHERE id = 'p220';  -- Vikramaditya II Chalukya (dup of Vikramaditya II p1104)
