/*
# Enrich Personalities Batch B: Mauryan, Shunga, Kanva, Satavahana, and Related Rulers

1. Purpose
Populates all fields for 19 key rulers from the Haryanka, Shishunaga, Nanda,
Maurya, Shunga, Kanva, Satavahana, Chedi (Kalinga), and Western Kshatrapa dynasties.

2. Records Enriched
- p11 Bindusara (Mauryan emperor)
- p12 Brihadratha (last Mauryan emperor)
- p13 Pushyamitra Shunga (founder of Shunga dynasty)
- p1368 Agnimitra (Shunga king)
- p1377 Vasudeva Kanva (founder of Kanva dynasty)
- p1011 Bimbisara (Haryanka dynasty, Magadha)
- p1012 Ajatashatru (Haryanka dynasty, Magadha)
- p83 Udayin (founder of Pataliputra)
- p1015 Shishunaga (founder of Shishunaga dynasty)
- p1016 Mahapadma Nanda (founder of Nanda dynasty)
- p1017 Dhana Nanda (last Nanda king)
- p1381 Simuka Satavahana (founder of Satavahana dynasty)
- p1386 Satakarni I (early Satavahana king)
- p1050 Gautamiputra Satakarni (greatest Satavahana king)
- p1387 Hala (Satavahana king, patron of literature)
- p1052 Yajna Sri Satakarni (last great Satavahana king)
- p182 Kharavela (King of Kalinga, Hathigumpha inscription)
- p1038 Rudradaman I (Western Kshatrapa king, Junagadh inscription)
- p1046 Nahapana (Western Kshatrapa king, defeated by Gautamiputra)

3. Safety
- Only UPDATE statements, no schema changes.
- BCE years stored as negative integers.
- Unknown values left as NULL.
*/

-- p11: Bindusara
UPDATE personalities SET
  slug = 'bindusara', title = 'Emperor', gender = 'Male',
  birth_year = -320, death_year = -272, birth_text = 'c. 320 BCE', death_text = 'c. 272 BCE',
  categories = ARRAY['Ruler','Military','Administrator']::TEXT[],
  civilization = 'Mauryan Empire', historical_period = 'Ancient India',
  dynasty = 'Maurya Dynasty', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['Emperor']::TEXT[],
  birthplace = 'Pataliputra', death_place = 'Pataliputra',
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Bindusara was the second Mauryan emperor who ruled from approximately 298 to 272 BCE, expanding the empire into the Deccan and maintaining diplomatic relations with the Hellenic world.',
  famous_for = 'Second emperor of the Maurya Empire. Expanded the empire southward into the Deccan and maintained diplomatic ties with Greek kingdoms.',
  achievements = ARRAY['Expanded the Mauryan Empire into the Deccan','Maintained diplomatic relations with Hellenic kingdoms','Consolidated the empire inherited from Chandragupta Maurya']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Emperor','Amitrochates']::TEXT[],
  active_start_year = -298, active_end_year = -272, century = '3rd century BCE', timeline_order = 3,
  father = 'Chandragupta Maurya', mother = NULL, spouse = NULL,
  children = ARRAY['Ashoka']::TEXT[], teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Chandragupta Maurya', successor = 'Ashoka',
  contemporaries = ARRAY['Antiochus I Soter']::TEXT[],
  related_people = ARRAY['Chandragupta Maurya','Ashoka','Chanakya']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Maurya Dynasty']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Bindusara',
  keywords = ARRAY['Bindusara','Mauryan Empire','Magadha','Deccan','Amitrochates','Ancient India']::TEXT[],
  search_aliases = ARRAY['Amitrochates']::TEXT[],
  meta_description = 'Bindusara was the second Mauryan emperor (c. 298-272 BCE) who expanded the empire into the Deccan and maintained diplomatic ties with Hellenic kingdoms.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p11';

-- p12: Brihadratha
UPDATE personalities SET
  slug = 'brihadratha', title = 'Emperor', gender = 'Male',
  birth_year = NULL, death_year = -185, birth_text = NULL, death_text = 'c. 185 BCE',
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Mauryan Empire', historical_period = 'Ancient India',
  dynasty = 'Maurya Dynasty', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['Emperor']::TEXT[],
  birthplace = NULL, death_place = 'Pataliputra',
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Brihadratha was the last Mauryan emperor who was assassinated by his commander Pushyamitra Shunga around 185 BCE, ending the Maurya dynasty and ushering in the Shunga Empire.',
  famous_for = 'Last ruler of the Maurya Empire. He was assassinated by his general Pushyamitra Shunga, ending Mauryan rule.',
  achievements = ARRAY[]::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Emperor']::TEXT[],
  active_start_year = NULL, active_end_year = -185, century = '2nd century BCE', timeline_order = 4,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = 'Pushyamitra Shunga',
  contemporaries = ARRAY['Pushyamitra Shunga']::TEXT[],
  related_people = ARRAY['Pushyamitra Shunga','Ashoka']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Maurya Dynasty','Shunga']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Brihadratha_Maurya',
  keywords = ARRAY['Brihadratha','Mauryan Empire','last emperor','Pushyamitra','assassination']::TEXT[],
  search_aliases = ARRAY['Brihadratha Maurya']::TEXT[],
  meta_description = 'Brihadratha was the last Mauryan emperor, assassinated by Pushyamitra Shunga c. 185 BCE, ending the Maurya dynasty and beginning the Shunga Empire.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p12';

-- p13: Pushyamitra Shunga
UPDATE personalities SET
  slug = 'pushyamitra-shunga', title = 'Emperor', gender = 'Male',
  birth_year = NULL, death_year = -149, birth_text = NULL, death_text = 'c. 149 BCE',
  categories = ARRAY['Ruler','Military','Founder']::TEXT[],
  civilization = 'Shunga Empire', historical_period = 'Ancient India',
  dynasty = 'Shunga', kingdom = 'Magadha', religion = 'Hinduism',
  occupation = ARRAY['Emperor','Military Commander']::TEXT[],
  birthplace = NULL, death_place = 'Pataliputra',
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Pushyamitra Shunga was the founder of the Shunga Empire who assassinated the last Mauryan emperor Brihadratha around 185 BCE and ruled for approximately 36 years, reviving Brahmanical traditions.',
  famous_for = 'Founder of the Shunga Empire. He overthrew the Maurya dynasty and resisted Indo-Greek incursions.',
  achievements = ARRAY['Founded the Shunga Empire after overthrowing the Maurya dynasty','Ruled for approximately 36 years','Resisted Indo-Greek invasions','Performed the Ashvamedha sacrifice','Patronized Brahmanical traditions']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Emperor','Senapati','Maharaja']::TEXT[],
  active_start_year = -185, active_end_year = -149, century = '2nd century BCE', timeline_order = 4,
  father = NULL, mother = NULL, spouse = NULL,
  children = ARRAY['Agnimitra']::TEXT[], teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Brihadratha', successor = 'Agnimitra',
  contemporaries = ARRAY['Menander I','Brihadratha']::TEXT[],
  related_people = ARRAY['Brihadratha','Agnimitra','Patanjali']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Shunga','Maurya Dynasty']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Pushyamitra_Shunga',
  keywords = ARRAY['Pushyamitra','Shunga Empire','Magadha','Brahmanical','Ashvamedha','Indo-Greek']::TEXT[],
  search_aliases = ARRAY['Pushpamitra Shunga']::TEXT[],
  meta_description = 'Pushyamitra Shunga founded the Shunga Empire c. 185 BCE by overthrowing the Mauryas, ruled 36 years, and resisted Indo-Greek invasions.',
  verified = TRUE, featured = TRUE, updated_at = NOW()
WHERE id = 'p13';

-- p1368: Agnimitra
UPDATE personalities SET
  slug = 'agnimitra', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Shunga Empire', historical_period = 'Ancient India',
  dynasty = 'Shunga', kingdom = 'Magadha', religion = 'Hinduism',
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Agnimitra was the second ruler of the Shunga Empire who reigned from approximately 149 to 141 BCE and is known as the protagonist of Kalidasa''s play Malavikagnimitra.',
  famous_for = 'Second king of the Shunga dynasty. He is the hero of Kalidasa''s Sanskrit play Malavikagnimitra.',
  achievements = ARRAY['Succeeded Pushyamitra as the second Shunga ruler','Subject of Kalidasa''s play Malavikagnimitra']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King','Maharaja']::TEXT[],
  active_start_year = -149, active_end_year = -141, century = '2nd century BCE', timeline_order = 4,
  father = 'Pushyamitra Shunga', mother = NULL,
  spouse = ARRAY['Malavika']::TEXT[], children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Pushyamitra Shunga', successor = NULL,
  contemporaries = ARRAY[]::TEXT[],
  related_people = ARRAY['Pushyamitra Shunga','Kalidasa']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Shunga']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Agnimitra',
  keywords = ARRAY['Agnimitra','Shunga Empire','Malavikagnimitra','Kalidasa','Magadha']::TEXT[],
  search_aliases = ARRAY['Agnimitra Shunga']::TEXT[],
  meta_description = 'Agnimitra was the second Shunga king (c. 149-141 BCE), known as the protagonist of Kalidasa''s Sanskrit play Malavikagnimitra.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1368';

-- p1377: Vasudeva Kanva
UPDATE personalities SET
  slug = 'vasudeva-kanva', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Founder']::TEXT[],
  civilization = 'Kanva Dynasty', historical_period = 'Ancient India',
  dynasty = 'Kanva', kingdom = 'Magadha', religion = 'Hinduism',
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Vasudeva Kanva was the founder of the Kanva dynasty who overthrew the last Shunga ruler Devabhuti around 73 BCE and established Brahmanical rule over Magadha.',
  famous_for = 'Founder of the Kanva dynasty. He overthrew the last Shunga king Devabhuti and established Kanva rule over Magadha.',
  achievements = ARRAY['Founded the Kanva dynasty by overthrowing Devabhuti','Ruled Magadha for approximately nine years (c. 73-64 BCE)']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King','Maharaja']::TEXT[],
  active_start_year = -73, active_end_year = -64, century = '1st century BCE', timeline_order = 5,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Devabhuti', successor = 'Bhumimitra',
  contemporaries = ARRAY['Devabhuti']::TEXT[],
  related_people = ARRAY['Devabhuti','Bhumimitra']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Kanva','Shunga']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Vasudeva_Kanva',
  keywords = ARRAY['Vasudeva','Kanva','Magadha','founder','Brahmin']::TEXT[],
  search_aliases = ARRAY[]::TEXT[],
  meta_description = 'Vasudeva Kanva founded the Kanva dynasty c. 73 BCE by overthrowing the last Shunga king Devabhuti, ruling Magadha for about nine years.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1377';

-- p1011: Bimbisara
UPDATE personalities SET
  slug = 'bimbisara', title = 'King', gender = 'Male',
  birth_year = -558, death_year = -492, birth_text = 'c. 558 BCE', death_text = 'c. 492 BCE',
  categories = ARRAY['Ruler','Founder']::TEXT[],
  civilization = 'Mahajanapada Period', historical_period = 'Ancient India',
  dynasty = 'Haryanka', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = 'Rajagriha',
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Bimbisara was the founder of the Haryanka dynasty and king of Magadha from approximately 543 to 492 BCE who annexed Anga and was a contemporary and patron of both Gautama Buddha and Mahavira.',
  famous_for = 'Founder of the Haryanka dynasty and early king of Magadha. He was a contemporary and patron of both Buddha and Mahavira, and annexed the kingdom of Anga.',
  achievements = ARRAY['Founded the Haryanka dynasty','Annexed the kingdom of Anga to Magadha','Established Rajagriha as a fortified capital','Patron and contemporary of Gautama Buddha','Contemporary of Mahavira']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King of Magadha','Seniya']::TEXT[],
  active_start_year = -543, active_end_year = -492, century = '6th century BCE', timeline_order = 2,
  father = 'Bhattiya', mother = NULL,
  spouse = ARRAY['Kosala Devi','Chellana']::TEXT[],
  children = ARRAY['Ajatashatru']::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Bhattiya', successor = 'Ajatashatru',
  contemporaries = ARRAY['Gautama Buddha','Mahavira']::TEXT[],
  related_people = ARRAY['Ajatashatru','Gautama Buddha','Mahavira']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Haryanka']::TEXT[],
  related_kingdoms = ARRAY['Magadha','Anga']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Bimbisara',
  keywords = ARRAY['Bimbisara','Haryanka','Magadha','Buddha','Mahavira','Anga','Rajagriha']::TEXT[],
  search_aliases = ARRAY['Seniya Bimbisara']::TEXT[],
  meta_description = 'Bimbisara (c. 543-492 BCE) founded the Haryanka dynasty, ruled Magadha, annexed Anga, and was a contemporary and patron of Buddha and Mahavira.',
  verified = TRUE, featured = TRUE, updated_at = NOW()
WHERE id = 'p1011';

-- p1012: Ajatashatru
UPDATE personalities SET
  slug = 'ajatashatru', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = -460, birth_text = NULL, death_text = 'c. 460 BCE',
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Mahajanapada Period', historical_period = 'Ancient India',
  dynasty = 'Haryanka', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = 'Rajagriha',
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Ajatashatru was the second king of the Haryanka dynasty who ruled Magadha from approximately 492 to 460 BCE, known for defeating the Vajji confederacy and commissioning the first Buddhist council at Rajagriha.',
  famous_for = 'King of Magadha who imprisoned his father Bimbisara to seize the throne. He defeated the Vajji confederacy and sponsored the first Buddhist council.',
  achievements = ARRAY['Defeated the Vajji confederacy','Sponsored the First Buddhist Council at Rajagriha','Expanded Magadhan territory through military conquests']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King of Magadha','Kunika']::TEXT[],
  active_start_year = -492, active_end_year = -460, century = '5th century BCE', timeline_order = 2,
  father = 'Bimbisara', mother = 'Chellana', spouse = NULL,
  children = ARRAY['Udayin']::TEXT[], teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Bimbisara', successor = 'Udayin',
  contemporaries = ARRAY['Gautama Buddha','Mahavira']::TEXT[],
  related_people = ARRAY['Bimbisara','Udayin','Gautama Buddha']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Haryanka']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Ajatashatru',
  keywords = ARRAY['Ajatashatru','Haryanka','Magadha','Buddha','Vajji','first Buddhist council']::TEXT[],
  search_aliases = ARRAY['Kunika','Ajatasattu']::TEXT[],
  meta_description = 'Ajatashatru (c. 492-460 BCE) was the second Haryanka king of Magadha who defeated the Vajjis and held the first Buddhist Council at Rajagriha.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1012';

-- p83: Udayin
UPDATE personalities SET
  slug = 'udayin', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Mahajanapada Period', historical_period = 'Ancient India',
  dynasty = 'Haryanka', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Udayin was the third king of the Haryanka dynasty who ruled Magadha from approximately 460 to 444 BCE and is credited with founding the city of Pataliputra by shifting the capital from Rajagriha.',
  famous_for = 'Third king of the Haryanka dynasty who founded the city of Pataliputra. He shifted the Magadhan capital from Rajagriha to Pataliputra.',
  achievements = ARRAY['Founded the city of Pataliputra','Shifted the Magadhan capital from Rajagriha to Pataliputra']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King of Magadha']::TEXT[],
  active_start_year = -460, active_end_year = -444, century = '5th century BCE', timeline_order = 2,
  father = 'Ajatashatru', mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Ajatashatru', successor = NULL,
  contemporaries = ARRAY[]::TEXT[],
  related_people = ARRAY['Ajatashatru','Bimbisara']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Haryanka']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Udayin',
  keywords = ARRAY['Udayin','Haryanka','Magadha','Pataliputra','Rajagriha']::TEXT[],
  search_aliases = ARRAY['Udayabhadra']::TEXT[],
  meta_description = 'Udayin (c. 460-444 BCE) was the third Haryanka king of Magadha who founded Pataliputra and shifted the capital from Rajagriha.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p83';

-- p1015: Shishunaga
UPDATE personalities SET
  slug = 'shishunaga', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Founder']::TEXT[],
  civilization = 'Mahajanapada Period', historical_period = 'Ancient India',
  dynasty = 'Shishunaga', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Shishunaga was the founder of the Shishunaga dynasty who ascended the throne of Magadha around 413 BCE, originally serving as a viceroy at Kashi before overthrowing the last Haryanka ruler.',
  famous_for = 'Founder of the Shishunaga dynasty of Magadha. He overthrew the last Haryanka ruler and expanded the Magadhan empire.',
  achievements = ARRAY['Founded the Shishunaga dynasty around 413 BCE','Served as Magadhan viceroy at Kashi before ascending the throne','Expanded the Magadhan empire']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King of Magadha']::TEXT[],
  active_start_year = -413, active_end_year = -395, century = '5th century BCE', timeline_order = 3,
  father = NULL, mother = NULL, spouse = NULL,
  children = ARRAY['Kalashoka']::TEXT[], teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Nagadasaka', successor = 'Kalashoka',
  contemporaries = ARRAY[]::TEXT[],
  related_people = ARRAY['Kalashoka']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Shishunaga','Haryanka']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Shishunaga',
  keywords = ARRAY['Shishunaga','Magadha','Kashi','founder','dynasty']::TEXT[],
  search_aliases = ARRAY['Sisunaga']::TEXT[],
  meta_description = 'Shishunaga founded the Shishunaga dynasty of Magadha c. 413 BCE, previously serving as viceroy at Kashi before overthrowing the Haryankas.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1015';

-- p1016: Mahapadma Nanda
UPDATE personalities SET
  slug = 'mahapadma-nanda', title = 'Emperor', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Founder','Military']::TEXT[],
  civilization = 'Mahajanapada Period', historical_period = 'Ancient India',
  dynasty = 'Nanda', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['Emperor']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Mahapadma Nanda was the founder of the Nanda dynasty who ruled Magadha from approximately 345 to 329 BCE, described in the Puranas as the destroyer of all Kshatriyas and the first non-Kshatriya ruler to establish a vast empire.',
  famous_for = 'Founder of the Nanda dynasty and the first non-Kshatriya emperor of Magadha. The Puranas describe him as the destroyer of all Kshatriya dynasties.',
  achievements = ARRAY['Founded the Nanda dynasty around 345 BCE','First non-Kshatriya ruler to establish a vast empire in northern India','Expanded the empire to include Kalinga and the Godavari valley','Established one of the wealthiest empires of ancient India']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Emperor','Mahapadmapati','Sarva-Kshatrantaka']::TEXT[],
  active_start_year = -345, active_end_year = -329, century = '4th century BCE', timeline_order = 3,
  father = NULL, mother = NULL, spouse = NULL,
  children = ARRAY['Dhana Nanda']::TEXT[], teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = 'Dhana Nanda',
  contemporaries = ARRAY[]::TEXT[],
  related_people = ARRAY['Dhana Nanda']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Nanda','Shishunaga']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Mahapadma_Nanda',
  keywords = ARRAY['Mahapadma Nanda','Nanda dynasty','Magadha','Kshatriya','Ugrasena','founder']::TEXT[],
  search_aliases = ARRAY['Ugrasena','Mahapadmapati']::TEXT[],
  meta_description = 'Mahapadma Nanda founded the Nanda dynasty c. 345 BCE as the first non-Kshatriya emperor of Magadha, described in Puranas as the destroyer of Kshatriyas.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1016';

-- p1017: Dhana Nanda
UPDATE personalities SET
  slug = 'dhana-nanda', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = -321, birth_text = NULL, death_text = 'c. 321 BCE',
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Mahajanapada Period', historical_period = 'Ancient India',
  dynasty = 'Nanda', kingdom = 'Magadha', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = 'Pataliputra',
  region = 'Magadha', present_state = 'Bihar', present_country = 'India',
  short_description = 'Dhana Nanda was the last ruler of the Nanda dynasty who was defeated and killed by Chandragupta Maurya with the assistance of Chanakya around 321 BCE, ending Nanda rule and establishing the Maurya Empire.',
  famous_for = 'Last king of the Nanda dynasty. He was overthrown by Chandragupta Maurya and Chanakya, ending Nanda rule and beginning the Maurya Empire.',
  achievements = ARRAY['Ruled the Nanda Empire at its territorial peak','Commanded a vast army that deterred Alexander the Great''s forces']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['King of Magadha']::TEXT[],
  active_start_year = -329, active_end_year = -321, century = '4th century BCE', timeline_order = 3,
  father = 'Mahapadma Nanda', mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Mahapadma Nanda', successor = 'Chandragupta Maurya',
  contemporaries = ARRAY['Chandragupta Maurya','Chanakya','Alexander the Great']::TEXT[],
  related_people = ARRAY['Mahapadma Nanda','Chandragupta Maurya','Chanakya']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Nanda','Maurya Dynasty']::TEXT[],
  related_kingdoms = ARRAY['Magadha']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Dhana_Nanda',
  keywords = ARRAY['Dhana Nanda','Nanda dynasty','Magadha','Chandragupta Maurya','Chanakya']::TEXT[],
  search_aliases = ARRAY['Agrammes','Xandrames']::TEXT[],
  meta_description = 'Dhana Nanda was the last Nanda king of Magadha, defeated by Chandragupta Maurya and Chanakya c. 321 BCE, ending the Nanda dynasty.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1017';

-- p1381: Simuka Satavahana
UPDATE personalities SET
  slug = 'simuka-satavahana', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Founder']::TEXT[],
  civilization = 'Satavahana Empire', historical_period = 'Ancient India',
  dynasty = 'Satavahana', kingdom = 'Deccan', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Deccan', present_state = NULL, present_country = 'India',
  short_description = 'Simuka was the founder of the Satavahana dynasty who established independent rule in the Deccan region during the late 3rd or early 2nd century BCE after the decline of Mauryan power.',
  famous_for = 'Founder of the Satavahana dynasty. He established independent rule in the Deccan after the decline of the Maurya Empire.',
  achievements = ARRAY['Founded the Satavahana dynasty in the Deccan','Established independent rule after the decline of Mauryan power']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Maharaja']::TEXT[],
  active_start_year = -230, active_end_year = -207, century = '3rd century BCE', timeline_order = 5,
  father = NULL, mother = NULL, spouse = NULL,
  children = ARRAY['Satakarni I']::TEXT[], teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = 'Satakarni I',
  contemporaries = ARRAY[]::TEXT[],
  related_people = ARRAY['Satakarni I']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Satavahana']::TEXT[],
  related_kingdoms = ARRAY['Deccan']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Simuka',
  keywords = ARRAY['Simuka','Satavahana','Deccan','founder','dynasty']::TEXT[],
  search_aliases = ARRAY['Sishuk','Sindhuk']::TEXT[],
  meta_description = 'Simuka founded the Satavahana dynasty in the Deccan after the decline of Mauryan power, establishing an empire that endured for over four centuries.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1381';

-- p1386: Satakarni I
UPDATE personalities SET
  slug = 'satakarni-i', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Satavahana Empire', historical_period = 'Ancient India',
  dynasty = 'Satavahana', kingdom = 'Deccan', religion = 'Hinduism',
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Deccan', present_state = 'Maharashtra', present_country = 'India',
  short_description = 'Satakarni I was an early and significant ruler of the Satavahana dynasty who reigned during the 1st century BCE, known for the Naneghat inscription and for performing Vedic Rajasuya and Ashvamedha sacrifices.',
  famous_for = 'Early Satavahana king known for the Naneghat inscription. He performed the Rajasuya and Ashvamedha sacrifices, asserting imperial sovereignty.',
  achievements = ARRAY['Performed the Rajasuya sacrifice as recorded in the Naneghat inscription','Performed the Ashvamedha sacrifice','Expanded Satavahana territory in the Deccan']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Maharaja','Satakarni']::TEXT[],
  active_start_year = -70, active_end_year = -60, century = '1st century BCE', timeline_order = 5,
  father = 'Simuka', mother = NULL,
  spouse = ARRAY['Naganika']::TEXT[],
  children = ARRAY['Skandasati']::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Simuka', successor = 'Skandasati',
  contemporaries = ARRAY['Kharavela']::TEXT[],
  related_people = ARRAY['Simuka','Naganika','Skandasati']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Satavahana']::TEXT[],
  related_kingdoms = ARRAY['Deccan']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Satakarni_I',
  keywords = ARRAY['Satakarni','Satavahana','Naneghat','Naganika','Ashvamedha','Deccan']::TEXT[],
  search_aliases = ARRAY[]::TEXT[],
  meta_description = 'Satakarni I was an early Satavahana king (1st c. BCE) known for the Naneghat inscription by Queen Naganika and for performing Rajasuya sacrifices.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1386';

-- p1050: Gautamiputra Satakarni
UPDATE personalities SET
  slug = 'gautamiputra-satakarni', title = 'Emperor', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Military','Administrator']::TEXT[],
  civilization = 'Satavahana Empire', historical_period = 'Ancient India',
  dynasty = 'Satavahana', kingdom = 'Deccan', religion = 'Hinduism',
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Deccan', present_state = 'Maharashtra', present_country = 'India',
  short_description = 'Gautamiputra Satakarni was the greatest ruler of the Satavahana dynasty who reigned in the 1st or 2nd century CE, described in the Nashik prashasti inscription as the destroyer of Shakas, Pahlavas, and Yavanas.',
  famous_for = 'Greatest ruler of the Satavahana dynasty. He defeated the Western Kshatrapa king Nahapana and restored Satavahana glory across the Deccan.',
  achievements = ARRAY['Defeated the Western Kshatrapa king Nahapana','Described as destroyer of Shakas, Pahlavas, and Yavanas in the Nashik prashasti','Restored Satavahana power and expanded the empire','Issued coins bearing his own portrait']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Maharaja','Raja-Raja','Trisamudradhipati']::TEXT[],
  active_start_year = 106, active_end_year = 130, century = '2nd century CE', timeline_order = 7,
  father = NULL, mother = 'Gautami Balashri', spouse = NULL,
  children = ARRAY['Vashishtiputra Satakarni']::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = 'Vashishtiputra Satakarni',
  contemporaries = ARRAY['Nahapana']::TEXT[],
  related_people = ARRAY['Gautami Balashri','Nahapana','Vashishtiputra Satakarni']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Satavahana','Western Kshatrapa']::TEXT[],
  related_kingdoms = ARRAY['Deccan']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Gautamiputra_Satakarni',
  keywords = ARRAY['Gautamiputra','Satavahana','Satakarni','Nahapana','Nashik','Deccan','Shakas']::TEXT[],
  search_aliases = ARRAY['Gautamiputra Satakarni']::TEXT[],
  meta_description = 'Gautamiputra Satakarni was the greatest Satavahana king (1st-2nd c. CE) who defeated Nahapana and restored Satavahana glory across the Deccan.',
  verified = TRUE, featured = TRUE, updated_at = NOW()
WHERE id = 'p1050';

-- p1387: Hala
UPDATE personalities SET
  slug = 'hala-satavahana', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Poet','Patron of Arts']::TEXT[],
  civilization = 'Satavahana Empire', historical_period = 'Ancient India',
  dynasty = 'Satavahana', kingdom = 'Deccan', religion = 'Hinduism',
  occupation = ARRAY['King','Poet']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Deccan', present_state = 'Maharashtra', present_country = 'India',
  short_description = 'Hala was a Satavahana king who ruled from Pratishthana in the 1st century CE and is celebrated as the compiler of the Gatha Saptashati, a landmark anthology of approximately 700 love poems in the Maharashtri Prakrit language.',
  famous_for = 'Satavahana king renowned for compiling the Gatha Saptashati, a collection of 700 love poems in Maharashtri Prakrit. He was a great patron of literature.',
  achievements = ARRAY['Compiled the Gatha Saptashati, a collection of approximately 700 love poems','Patronized Prakrit literature and poetry at his court in Pratishthana','Produced one of the earliest surviving anthologies of secular poetry in India']::TEXT[],
  notable_works = ARRAY['Gatha Saptashati']::TEXT[], notable_titles = ARRAY['Maharaja','Kavivatsala']::TEXT[],
  active_start_year = 20, active_end_year = 50, century = '1st century CE', timeline_order = 7,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = NULL,
  contemporaries = ARRAY[]::TEXT[],
  related_people = ARRAY[]::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Satavahana']::TEXT[],
  related_kingdoms = ARRAY['Deccan']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Hala',
  keywords = ARRAY['Hala','Satavahana','Gatha Saptashati','Prakrit','poetry','Pratishthana']::TEXT[],
  search_aliases = ARRAY['Hala Satavahana']::TEXT[],
  meta_description = 'Hala was a Satavahana king (1st c. CE) who compiled the Gatha Saptashati, a landmark anthology of 700 love poems in Maharashtri Prakrit.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1387';

-- p1052: Yajna Sri Satakarni
UPDATE personalities SET
  slug = 'yajna-sri-satakarni', title = 'King', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Satavahana Empire', historical_period = 'Ancient India',
  dynasty = 'Satavahana', kingdom = 'Deccan', religion = 'Hinduism',
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Deccan', present_state = 'Maharashtra', present_country = 'India',
  short_description = 'Yajna Sri Satakarni was the last great ruler of the Satavahana dynasty who reigned from approximately 172 to 201 CE, known for asserting Satavahana authority over the Shakas and issuing coins with a ship motif.',
  famous_for = 'Last great king of the Satavahana dynasty. He asserted authority over the Shakas and issued distinctive coins featuring a ship motif.',
  achievements = ARRAY['Last great ruler of the Satavahana dynasty','Asserted Satavahana authority over the Western Kshatrapas','Issued coins bearing a ship motif reflecting maritime trade prominence']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Maharaja','Satakarni']::TEXT[],
  active_start_year = 172, active_end_year = 201, century = '2nd century CE', timeline_order = 8,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = 'Vijaya Satakarni',
  contemporaries = ARRAY['Rudradaman I']::TEXT[],
  related_people = ARRAY['Gautamiputra Satakarni','Rudradaman I']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Satavahana','Western Kshatrapa']::TEXT[],
  related_kingdoms = ARRAY['Deccan']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Yajna_Sri_Satakarni',
  keywords = ARRAY['Yajna Sri','Satavahana','Satakarni','Shakas','ship coins','Deccan']::TEXT[],
  search_aliases = ARRAY['Sri Yajna Satakarni']::TEXT[],
  meta_description = 'Yajna Sri Satakarni (c. 172-201 CE) was the last great Satavahana king who asserted authority over the Shakas and issued ship-motif coins.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1052';

-- p182: Kharavela
UPDATE personalities SET
  slug = 'kharavela', title = 'Emperor', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler','Military']::TEXT[],
  civilization = 'Mahameghavahana Dynasty', historical_period = 'Ancient India',
  dynasty = 'Mahameghavahana', kingdom = 'Kalinga', religion = 'Jainism',
  occupation = ARRAY['Emperor']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Kalinga', present_state = 'Odisha', present_country = 'India',
  short_description = 'Kharavela was the emperor of Kalinga in the 2nd or 1st century BCE, belonging to the Mahameghavahana dynasty, whose reign is documented in the Hathigumpha inscription at Udayagiri recording military campaigns across India.',
  famous_for = 'Emperor of Kalinga known for the Hathigumpha inscription at Udayagiri. He conducted extensive military campaigns across northern and southern India.',
  achievements = ARRAY['Commissioned the Hathigumpha inscription at Udayagiri','Conducted military campaigns across northern and southern India','Patron of Jainism and sponsored Jain monastic establishments']::TEXT[],
  notable_works = ARRAY['Hathigumpha Inscription']::TEXT[],
  notable_titles = ARRAY['Emperor','Maharaja','Chakravartin','Kalingadhipati']::TEXT[],
  active_start_year = -170, active_end_year = -150, century = '2nd century BCE', timeline_order = 5,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = NULL,
  contemporaries = ARRAY['Satakarni I','Pushyamitra Shunga']::TEXT[],
  related_people = ARRAY['Satakarni I','Pushyamitra Shunga']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Mahameghavahana','Satavahana']::TEXT[],
  related_kingdoms = ARRAY['Kalinga']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Kharavela',
  keywords = ARRAY['Kharavela','Kalinga','Hathigumpha','Udayagiri','Jainism','Mahameghavahana']::TEXT[],
  search_aliases = ARRAY[]::TEXT[],
  meta_description = 'Kharavela was the emperor of Kalinga (2nd-1st c. BCE) of the Mahameghavahana dynasty, known for the Hathigumpha inscription recording his military campaigns.',
  verified = TRUE, featured = TRUE, updated_at = NOW()
WHERE id = 'p182';

-- p1038: Rudradaman I
UPDATE personalities SET
  slug = 'rudradaman-i', title = 'Mahakshatrapa', gender = 'Male',
  birth_year = NULL, death_year = 150, birth_text = NULL, death_text = 'c. 150 CE',
  categories = ARRAY['Ruler','Patron of Arts']::TEXT[],
  civilization = 'Western Kshatrapa', historical_period = 'Ancient India',
  dynasty = 'Kardamaka', kingdom = 'Saurashtra', religion = 'Hinduism',
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Saurashtra', present_state = 'Gujarat', present_country = 'India',
  short_description = 'Rudradaman I was the most prominent ruler of the Western Kshatrapa dynasty who reigned from approximately 130 to 150 CE, known for the Junagadh Rock Inscription, the first long inscription in pure Sanskrit.',
  famous_for = 'Greatest Western Kshatrapa king known for the Junagadh Rock Inscription. It is the first long inscription in pure Sanskrit and records the repair of Sudarshana Lake.',
  achievements = ARRAY['Issued the Junagadh Rock Inscription, the first long inscription in pure Sanskrit','Repaired the Sudarshana Lake dam originally built by Chandragupta Maurya','Defeated the Satavahana king Vashishtiputra Satakarni','Expanded Western Kshatrapa territory across Gujarat and Malwa']::TEXT[],
  notable_works = ARRAY['Junagadh Rock Inscription']::TEXT[],
  notable_titles = ARRAY['Mahakshatrapa']::TEXT[],
  active_start_year = 130, active_end_year = 150, century = '2nd century CE', timeline_order = 7,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = 'Jayadaman', successor = 'Damajada Sri I',
  contemporaries = ARRAY['Yajna Sri Satakarni']::TEXT[],
  related_people = ARRAY['Yajna Sri Satakarni','Chastana']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Kardamaka','Satavahana']::TEXT[],
  related_kingdoms = ARRAY['Saurashtra','Malwa']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Rudradaman_I',
  keywords = ARRAY['Rudradaman','Western Kshatrapa','Junagadh','Sanskrit','Sudarshana Lake','Saurashtra']::TEXT[],
  search_aliases = ARRAY['Rudradama']::TEXT[],
  meta_description = 'Rudradaman I (r. 130-150 CE) was the greatest Western Kshatrapa king, known for the Junagadh inscription, the first long Sanskrit inscription, and repairing Sudarshana Lake.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1038';

-- p1046: Nahapana
UPDATE personalities SET
  slug = 'nahapana', title = 'Kshatrapa', gender = 'Male',
  birth_year = NULL, death_year = NULL, birth_text = NULL, death_text = NULL,
  categories = ARRAY['Ruler']::TEXT[],
  civilization = 'Western Kshatrapa', historical_period = 'Ancient India',
  dynasty = 'Kshaharata', kingdom = 'Saurashtra', religion = NULL,
  occupation = ARRAY['King']::TEXT[],
  birthplace = NULL, death_place = NULL,
  region = 'Saurashtra', present_state = 'Gujarat', present_country = 'India',
  short_description = 'Nahapana was a Western Kshatrapa ruler of the Kshaharata dynasty who controlled parts of Gujarat, Maharashtra, and Malwa in the 1st century CE before being defeated by Gautamiputra Satakarni.',
  famous_for = 'Western Kshatrapa king who was defeated by Gautamiputra Satakarni. His coins were overstruck by the Satavahana victor, marking the end of Kshaharata rule.',
  achievements = ARRAY['Ruled the Kshaharata dynasty over Gujarat, Maharashtra, and Malwa','Controlled key trade routes and ports in western India']::TEXT[],
  notable_works = ARRAY[]::TEXT[], notable_titles = ARRAY['Kshatrapa','Mahakshatrapa']::TEXT[],
  active_start_year = 19, active_end_year = 106, century = '1st century CE', timeline_order = 7,
  father = NULL, mother = NULL, spouse = NULL, children = ARRAY[]::TEXT[],
  teacher = NULL, students = ARRAY[]::TEXT[],
  predecessor = NULL, successor = NULL,
  contemporaries = ARRAY['Gautamiputra Satakarni']::TEXT[],
  related_people = ARRAY['Gautamiputra Satkarni']::TEXT[],
  related_events = ARRAY[]::TEXT[], related_dynasties = ARRAY['Kshaharata','Satavahana']::TEXT[],
  related_kingdoms = ARRAY['Saurashtra']::TEXT[],
  wikipedia_url = 'https://en.wikipedia.org/wiki/Nahapana',
  keywords = ARRAY['Nahapana','Western Kshatrapa','Kshaharata','Gujarat','coins']::TEXT[],
  search_aliases = ARRAY[]::TEXT[],
  meta_description = 'Nahapana was a Western Kshatrapa king of the Kshaharata dynasty who ruled Gujarat and Malwa before being defeated by Gautamiputra Satakarni.',
  verified = TRUE, featured = FALSE, updated_at = NOW()
WHERE id = 'p1046';
