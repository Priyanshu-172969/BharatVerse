INSERT INTO collections (title, description, event_ids) VALUES
  ('Rise of Empires', 'Trace the rise and fall of the great empires that unified the Indian subcontinent, from the Mauryas to the Marathas.', ARRAY['e4', 'e5', 'e6', 'e8', 'e9', 'e10']),
  ('Ancient Universities', 'Explore the great centers of learning — Nalanda, Takshashila, and Vikramashila — that attracted scholars from across Asia.', ARRAY['e15', 'e7', 'e19']),
  ('Maritime Bharat', 'Discover India''s naval heritage, from the Chola expeditions to ancient trade routes connecting the subcontinent to the world.', ARRAY['e8', 'e20', 'e1']),
  ('Women in History', 'The often-overlooked stories of women who shaped Indian civilization — queens, scholars, saints, and freedom fighters.', ARRAY['e5', 'e13', 'e14']),
  ('Temple Architecture', 'A journey through the evolution of Indian temple architecture, from early shrines to the towering gopurams of the south.', ARRAY['e20', 'e8', 'e9']),
  ('Indian Astronomy', 'The scientific achievements of Indian astronomers and mathematicians, from Aryabhata to the Kerala School.', ARRAY['e7', 'e15', 'e6']),
  ('Great Battles', 'The decisive conflicts that shaped the subcontinent''s political destiny, from the Kalinga War to the freedom struggle.', ARRAY['e5', 'e11', 'e12']),
  ('Sacred Geography', 'The spiritual landscape of the subcontinent — pilgrimage routes, sacred rivers, and the geography of faith.', ARRAY['e3', 'e17', 'e20'])
ON CONFLICT DO NOTHING;
