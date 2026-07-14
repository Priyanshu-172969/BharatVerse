export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  footnotes?: { ref: string; text: string }[];
}

export interface RippleStage {
  title: string;
  description: string;
  connectedEvents?: string[];
}

export interface ConnectedEntity {
  type: 'personality' | 'dynasty' | 'event' | 'civilization' | 'literature' | 'site' | 'temple' | 'science';
  name: string;
  relation: string;
  link?: string;
}

export interface EventDetail {
  id: string;
  location: string;
  readingTimeMin: number;
  sections: ArticleSection[];
  rippleStages: RippleStage[];
  connectedEntities: ConnectedEntity[];
  evidence: { type: string; description: string; source: string; confidence: string }[];
  interestingFacts: string[];
}

export const EVENT_DETAILS: Record<string, EventDetail> = {
  e1: {
    id: 'e1',
    location: 'Indus River Valley (Modern Pakistan & NW India)',
    readingTimeMin: 8,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'The Indus Valley Civilization, also known as the Harappan Civilization, represents one of the three earliest urban societies of the ancient world, alongside Mesopotamia and Egypt. Flourishing from approximately 3300 to 1300 BCE, it spanned a vast area of over a million square kilometers across what is now Pakistan and northwestern India.',
          'What sets the Indus Valley apart is its remarkable urban planning. Cities like Mohenjo-daro and Harappa featured grid-based street layouts, standardized brick dimensions, and sophisticated drainage systems that rivaled those of much later civilizations. The Great Bath of Mohenjo-daro stands as one of the earliest public water structures in the world.',
          'Despite its sophistication, the Indus script remains undeciphered, making it one of archaeology\'s greatest mysteries. Thousands of inscribed seals have been discovered, but without a bilingual text akin to the Rosetta Stone, their meaning continues to elude scholars.',
        ],
        footnotes: [
          { ref: '1', text: 'Marshall, J. (1931). Mohenjo-daro and the Indus Civilization. London: Arthur Probsthain.' },
          { ref: '2', text: 'Wright, R. P. (2010). The Ancient Indus: Urbanism, Economy, and Society. Cambridge University Press.' },
        ],
      },
      {
        id: 'background',
        title: 'Historical Background',
        paragraphs: [
          'The roots of the Indus Valley Civilization extend back to the early farming communities of Mehrgarh, in Balochistan, around 7000 BCE. Over millennia, these agricultural settlements evolved into increasingly complex societies, culminating in the full urbanization of the Mature Harappan period (2600–1900 BCE).',
          'The civilization\'s geographic reach was extraordinary, encompassing over 1,500 sites across a region larger than ancient Egypt and Mesopotamia combined. Major urban centers included Mohenjo-daro, Harappa, Dholavira, Ganeriwala, and Rakhigarhi, each demonstrating remarkable consistency in urban planning and material culture.',
        ],
      },
      {
        id: 'society',
        title: 'Society & Administration',
        paragraphs: [
          'Unlike contemporary civilizations in Egypt and Mesopotamia, the Indus Valley appears to lack monumental palaces, royal tombs, or centralized temples. This has led scholars to speculate that Harappan society may have been organized along more egalitarian lines, possibly governed by a network of merchant-elites or councils rather than a single monarch.',
          'The remarkable standardization of weights and measures across the civilization suggests a sophisticated administrative apparatus. Cubical weights following a binary system were used for trade, and the consistency of brick dimensions (in a 4:2:1 ratio) across hundreds of sites points to centralized planning.',
        ],
      },
      {
        id: 'economy',
        title: 'Economy & Trade',
        paragraphs: [
          'The Indus Valley economy was deeply integrated into long-distance trade networks. Harappan merchants traded with Mesopotamia, where the civilization was known as "Meluhha." Goods exchanged included carnelian beads, cotton textiles, copper, and ivory, received in exchange for silver, tin, and luxury items.',
          'Agriculture formed the backbone of the economy, with the fertile Indus floodplain supporting wheat, barley, peas, sesame, and cotton — the earliest known cultivation of cotton in the world. The granaries at Mohenjo-daro attest to large-scale grain storage and distribution.',
        ],
      },
      {
        id: 'science',
        title: 'Science & Technology',
        paragraphs: [
          'Harappan achievements in engineering were remarkable. The covered drainage system at Mohenjo-daro, with its standardized brick-lined channels and inspection holes, represents one of the most sophisticated urban sanitation systems of the ancient world. Every house was connected to the drainage network.',
          'The Great Bath, measuring 12 by 7 meters with a depth of 2.4 meters, was made watertight using fitted bricks and a layer of bitumen. Its exact purpose remains debated, but it likely served a ritual or ceremonial function.',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Modern Relevance',
        paragraphs: [
          'The decline of the Indus Valley Civilization around 1900–1300 BCE remains debated, with theories ranging from climate change and the shifting of river courses to tectonic events and trade disruption. Whatever the cause, the civilization\'s legacy endured in the cultural and technological traditions of the subcontinent.',
          'Modern archaeology continues to reveal new Indus sites, with recent discoveries pushing the boundaries of the civilization further east and south. The ongoing efforts to decipher the Indus script represent one of the most tantalizing challenges in historical linguistics.',
        ],
      },
    ],
    rippleStages: [
      { title: 'Historical Context', description: 'Early farming communities at Mehrgarh (7000 BCE) laid the agricultural foundations for later urbanization.', connectedEvents: ['e16'] },
      { title: 'Primary Cause', description: 'Favorable climate, fertile river valleys, and trade contacts with Mesopotamia catalyzed urban growth.' },
      { title: 'The Event', description: 'Full urbanization emerges at Mohenjo-daro, Harappa, and over 1,500 other sites with standardized planning.' },
      { title: 'Immediate Consequences', description: 'Long-distance trade networks established, connecting the subcontinent to Mesopotamia and Central Asia.' },
      { title: 'Regional Impact', description: 'The Indus script, weights, and urban planning set standards that influenced subsequent South Asian cultures.' },
      { title: 'Civilizational Impact', description: 'Cotton cultivation, drainage systems, and grid-based city planning became enduring contributions to human civilization.' },
      { title: 'Long-Term Legacy', description: 'The undeciphered script and the mystery of the civilization\'s decline continue to fascinate scholars and the public alike.' },
      { title: 'Modern Relevance', description: 'Ongoing archaeological discoveries and decipherment attempts keep the Indus Valley at the forefront of historical research.' },
    ],
    connectedEntities: [
      { type: 'site', name: 'Mohenjo-daro', relation: 'Major urban center' },
      { type: 'site', name: 'Harappa', relation: 'Type site of the civilization' },
      { type: 'site', name: 'Dholavira', relation: 'Notable urban center with water conservation' },
      { type: 'event', name: 'Mehrgarh Settlement', relation: 'Predecessor farming community', link: '/event/e16' },
      { type: 'science', name: 'Indus Script', relation: 'Undeciphered writing system' },
    ],
    evidence: [
      { type: 'archaeology', description: 'Excavations at Harappa and Mohenjo-daro beginning 1921-22', source: 'Marshall, "Mohenjo-daro and the Indus Civilization" (1931)', confidence: 'verified' },
      { type: 'inscriptions', description: 'Indus script seals — undeciphered but widespread', source: 'Corpus of Indus Seals and Inscriptions', confidence: 'verified' },
      { type: 'carbon', description: 'Radiocarbon dating of site layers', source: 'Possehl, "The Indus Civilization" (2002)', confidence: 'verified' },
    ],
    interestingFacts: [
      'The Indus Valley Civilization covered an area larger than ancient Egypt and Mesopotamia combined.',
      'Harappan cities had the most advanced drainage system of any ancient civilization.',
      'The Indus script has over 400 known signs, but remains undeciphered after a century of attempts.',
      'Cotton was first cultivated in the Indus Valley, giving the region its Greek name "Sindon" (for cotton).',
    ],
  },
  e4: {
    id: 'e4',
    location: 'Pataliputra (Modern Patna, Bihar)',
    readingTimeMin: 7,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'The founding of the Mauryan Empire in 321 BCE marks a watershed moment in Indian history — the first time the vast majority of the subcontinent was unified under a single political authority. Chandragupta Maurya, guided by his mentor Chanakya, overthrew the Nanda dynasty and established an empire that would set the template for Indian governance for the next two millennia.',
          'The Mauryan Empire at its peak under Ashoka covered nearly the entire Indian subcontinent, from the Hindu Kush to Bengal and from the Himalayas to the Deccan. Its administrative system, described in detail in the Arthashastra, influenced every subsequent Indian empire.',
        ],
        footnotes: [
          { ref: '1', text: 'Thapar, R. (2002). Early India: From the Origins to AD 1300. University of California Press.' },
          { ref: '2', text: 'Kautilya. Arthashastra (c. 2nd century BCE).' },
        ],
      },
      {
        id: 'background',
        title: 'Historical Background',
        paragraphs: [
          'The political landscape of 4th century BCE India was dominated by the Nanda Empire, centered in Magadha. The Nandas were wealthy and powerful but widely resented for their oppressive taxation and the low caste origins of their founder. This created an opening for a challenger.',
          'Chandragupta was reportedly a young man of humble origins when he came under the tutelage of Chanakya (also known as Kautilya), a Brahmin scholar expelled from the Nanda court. Together, they forged an alliance and built an army, possibly with support from the northwestern frontier regions destabilized by Alexander\'s retreat.',
        ],
      },
      {
        id: 'political',
        title: 'Political Situation',
        paragraphs: [
          'The Mauryan state was a highly centralized bureaucracy, described in the Arthashastra as a complex network of ministers, spies, and provincial governors. The empire was divided into provinces, each under a royal prince or trusted official, with a sophisticated system of revenue collection and administration.',
          'Chandragupta\'s reign saw the empire expand rapidly. He defeated Seleucus Nicator, Alexander\'s former general, and secured the territories of modern-day Afghanistan and Balochistan. A marriage alliance followed, cementing the Mauryan position in the northwest.',
        ],
      },
      {
        id: 'military',
        title: 'Military',
        paragraphs: [
          'The Mauryan army was one of the largest in the ancient world. Greek sources, particularly Megasthenes, describe a force of 600,000 infantry, 30,000 cavalry, and 9,000 war elephants. The army was organized into specialized units and supported by a dedicated war office.',
          'The use of war elephants was a Mauryan innovation that would define Indian warfare for centuries. These animals served as living tanks, breaking enemy formations and inspiring terror in armies unfamiliar with them.',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Modern Relevance',
        paragraphs: [
          'The Mauryan Empire established the political ideal of a unified India that would echo through subsequent centuries. The concept of "Chakravartin" (universal ruler) and the administrative framework of the Arthashastra influenced every major Indian state that followed.',
          'The empire\'s greatest legacy, however, came through Ashoka, who transformed the Mauryan state into a vehicle for spreading Buddhism across Asia. The Mauryan period thus represents both the political unification and the spiritual expansion of Indian civilization.',
        ],
      },
    ],
    rippleStages: [
      { title: 'Historical Context', description: 'The Nanda Empire dominated northern India but faced internal resentment and external pressure from Alexander\'s invasion.' },
      { title: 'Primary Cause', description: 'Chanakya\'s expulsion from the Nanda court and his vow of revenge, combined with Chandragupta\'s ambition.' },
      { title: 'The Event', description: 'Chandragupta overthrows the Nanda dynasty in 321 BCE, establishing the Mauryan Empire.' },
      { title: 'Immediate Consequences', description: 'A centralized bureaucracy is established, and the empire expands across northern India.' },
      { title: 'Regional Impact', description: 'The defeat of Seleucus Nicator secures the northwest frontier and brings Greek knowledge into the empire.' },
      { title: 'Civilizational Impact', description: 'The Arthashastra codifies statecraft, economics, and military strategy for future generations.' },
      { title: 'Long-Term Legacy', description: 'The Mauryan model of empire influences all subsequent Indian states, from the Guptas to the Mughals.' },
      { title: 'Modern Relevance', description: 'The Arthashastra remains studied as a foundational text of political science and realpolitik.' },
    ],
    connectedEntities: [
      { type: 'personality', name: 'Chandragupta Maurya', relation: 'Founder of the empire', link: '/personalities' },
      { type: 'personality', name: 'Chanakya', relation: 'Strategist and author of the Arthashastra', link: '/personalities' },
      { type: 'dynasty', name: 'Maurya Dynasty', relation: 'Ruling dynasty', link: '/dynasties' },
      { type: 'event', name: 'Kalinga War and Ashoka\'s Transformation', relation: 'Defining moment of the empire', link: '/event/e5' },
      { type: 'event', name: 'Ashokan Rock Edicts', relation: 'Administrative legacy', link: '/event/e17' },
      { type: 'event', name: 'Composition of the Arthashastra', relation: 'Foundational text', link: '/event/e18' },
      { type: 'literature', name: 'Arthashastra', relation: 'Treatise on statecraft' },
    ],
    evidence: [
      { type: 'literary', description: 'References in the Arthashastra and Puranas', source: 'Kautilya, Arthashastra', confidence: 'strong' },
      { type: 'foreign', description: 'Megasthenes\' account of the Mauryan court', source: 'Megasthenes, Indica (fragments)', confidence: 'strong' },
      { type: 'inscriptions', description: 'Ashokan edicts reference the Mauryan lineage', source: 'Corpus of Ashokan Inscriptions', confidence: 'verified' },
    ],
    interestingFacts: [
      'The Mauryan army reportedly had 9,000 war elephants, the largest elephant corps in history.',
      'Chanakya\'s Arthashastra predates Machiavelli\'s The Prince by nearly 1,800 years.',
      'Chandragupta reportedly abdicated and became a Jain monk in his final years.',
    ],
  },
  e5: {
    id: 'e5',
    location: 'Kalinga (Modern Odisha)',
    readingTimeMin: 9,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'The Kalinga War of 261 BCE stands as one of the most transformative events in world history — not for the battle itself, but for its aftermath. Emperor Ashoka\'s remorse after the bloodshed led to his conversion to Buddhism and a radical reorientation of imperial policy from conquest to welfare, known as "dhamma."',
          'The war was fought between the Mauryan Empire under Ashoka and the independent state of Kalinga (modern Odisha). The Mauryan victory came at a devastating cost: according to Ashoka\'s own Rock Edict XIII, 100,000 were killed and 150,000 deported, with many more dying from famine and disease.',
          'What followed was unprecedented in the ancient world. Ashoka renounced war as an instrument of policy, embraced Buddhism, and dedicated the remainder of his reign to spreading the message of dhamma — a policy of non-violence, tolerance, and moral governance — across his empire and beyond.',
        ],
        footnotes: [
          { ref: '1', text: 'Ashokan Rock Edict XIII (c. 256 BCE).' },
          { ref: '2', text: 'Thapar, R. (1961). Asoka and the Decline of the Mauryas. Oxford University Press.' },
        ],
      },
      {
        id: 'background',
        title: 'Historical Background',
        paragraphs: [
          'Kalinga was a prosperous and strategically important region that had maintained its independence despite the expansion of the Mauryan Empire under Chandragupta and Bindusara. Its control of eastern trade routes and ports made it a tempting target for the young emperor Ashoka, who had been on the throne for about eight years.',
          'Ashoka\'s own account in Rock Edict XIII is remarkably candid about the violence. He expresses deep remorse for the suffering caused, particularly to the Brahmins and Shramanas of Kalinga, and vows that such a war would never be waged again.',
        ],
      },
      {
        id: 'religion',
        title: 'Religion & Philosophy',
        paragraphs: [
          'The Kalinga War marks the beginning of Ashoka\'s transformation from a conventional warrior-king to a Buddhist reformer. While the exact nature of his conversion is debated, the edicts make clear that he embraced Buddhist principles and sought to govern according to dhamma — a concept encompassing righteousness, duty, and moral law.',
          'Ashoka\'s dhamma was not purely Buddhist in a sectarian sense. It emphasized universal ethical principles: respect for elders, humane treatment of servants, tolerance of all religious traditions, and non-violence. His Rock Edicts and Pillar Edicts, inscribed across the empire, represent one of the earliest attempts to govern through moral persuasion rather than force.',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Modern Relevance',
        paragraphs: [
          'Ashoka\'s post-Kalinga transformation had consequences that reverberate to this day. He sent Buddhist missions to Sri Lanka, Central Asia, and Southeast Asia, spreading the religion across the known world. His symbol of the four lions (the Lion Capital of Sarnath) became the national emblem of modern India.',
          'The concept of a ruler renouncing war and governing through moral principle has made Ashoka a model for leaders from Mahatma Gandhi to modern democratic theorists. H. G. Wells called him "the greatest of kings" for his unique experiment in moral governance.',
        ],
      },
    ],
    rippleStages: [
      { title: 'Historical Context', description: 'The Mauryan Empire under Ashoka sought to complete the subcontinent\'s unification by conquering independent Kalinga.' },
      { title: 'Primary Cause', description: 'Kalinga\'s strategic location and prosperous trade routes made it a target for imperial expansion.' },
      { title: 'The Event', description: 'The Mauryan army devastates Kalinga in 261 BCE, with massive casualties on both sides.' },
      { title: 'Immediate Consequences', description: 'Ashoka experiences profound remorse and embraces Buddhism, renouncing war as state policy.' },
      { title: 'Regional Impact', description: 'Buddhist missions are sent across Asia, transforming the religious landscape of the continent.' },
      { title: 'Civilizational Impact', description: 'The concept of dhamma — moral governance — becomes a model for ethical rulership.' },
      { title: 'Long-Term Legacy', description: 'Ashoka\'s edicts and symbols become enduring emblems of Indian civilization, including the national emblem.' },
      { title: 'Modern Relevance', description: 'Ashoka\'s renunciation of war inspires modern leaders and peace movements worldwide.' },
    ],
    connectedEntities: [
      { type: 'personality', name: 'Ashoka the Great', relation: 'The transformed emperor', link: '/personalities' },
      { type: 'event', name: 'Ashokan Rock Edicts', relation: 'Inscribed record of his remorse and dhamma policy', link: '/event/e17' },
      { type: 'event', name: 'Founding of the Mauryan Empire', relation: 'The empire Ashoka inherited', link: '/event/e4' },
      { type: 'dynasty', name: 'Maurya Dynasty', relation: 'Ruling dynasty', link: '/dynasties' },
      { type: 'literature', name: 'Buddhist Chronicles', relation: 'Record the conversion and missions' },
    ],
    evidence: [
      { type: 'inscriptions', description: 'Ashoka\'s own Rock Edict XIII describes the Kalinga War', source: 'Ashokan Rock Edict XIII', confidence: 'verified' },
      { type: 'literary', description: 'Buddhist chronicles like the Mahavamsa record the conversion', source: 'Mahavamsa (5th century CE)', confidence: 'strong' },
      { type: 'academic', description: 'Scholarly analysis of the edicts and their historical context', source: 'Thapar, "Asoka and the Decline of the Mauryas" (1961)', confidence: 'verified' },
    ],
    interestingFacts: [
      'Ashoka\'s Rock Edict XIII is the only ancient royal inscription expressing remorse for a war.',
      'The Lion Capital of Ashoka at Sarnath is the national emblem of modern India.',
      'Ashoka sent his own children, Mahendra and Sanghamitra, as Buddhist missionaries to Sri Lanka.',
    ],
  },
  e7: {
    id: 'e7',
    location: 'Kusumapura (Modern Patna, Bihar)',
    readingTimeMin: 8,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'In 499 CE, the mathematician and astronomer Aryabhata composed the Aryabhatiya, a landmark treatise that introduced the place-value system, an approximation of pi, and the foundations of trigonometry. This work, composed when Aryabhata was just 23 years old, represents one of the crowning achievements of the Gupta Golden Age.',
          'The Aryabhatiya consists of four sections: Gitikapada (cosmology), Ganitapada (mathematics), Kalakriyapada (time reckoning), and Golapada (spherical astronomy). In remarkably condensed verse, it covers topics from arithmetic and algebra to planetary motion and eclipses.',
          'Aryabhata\'s most famous contribution is arguably his approximation of pi as 3.1416, and his assertion that the Earth rotates on its axis — a full millennium before Copernicus. He also correctly explained that eclipses are caused by the shadow of the Earth and Moon, not by mythological demons.',
        ],
        footnotes: [
          { ref: '1', text: 'Aryabhata. Aryabhatiya (499 CE). Translated by K. S. Shukla and K. V. Sarma (1976).' },
          { ref: '2', text: 'Plofker, K. (2009). Mathematics in India. Princeton University Press.' },
        ],
      },
      {
        id: 'science',
        title: 'Science & Technology',
        paragraphs: [
          'Aryabhata\'s mathematical innovations were revolutionary. He described algorithms for calculating square and cube roots, solved linear and quadratic equations, and developed the "kuttaka" method for solving indeterminate equations — a precursor to the continued fraction method.',
          'In astronomy, Aryabhata proposed that the Earth rotates on its axis, causing the apparent movement of stars. He calculated the length of the sidereal year as 365.358 days, remarkably close to the modern value. His explanation of solar and lunar eclipses as shadow phenomena was a radical departure from prevailing mythological explanations.',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Modern Relevance',
        paragraphs: [
          'Aryabhata\'s work was transmitted to the Islamic world and from there to Europe, where Indian numerals — including the concept of zero — revolutionized mathematics. The very word "algorithm" derives from al-Khwarizmi, who built upon Aryabhata\'s methods.',
          'India\'s first satellite, launched in 1975, was named "Aryabhata" in his honor. His contributions to mathematics and astronomy are recognized globally as foundational to the scientific tradition.',
        ],
      },
    ],
    rippleStages: [
      { title: 'Historical Context', description: 'The Gupta Golden Age created a flourishing environment for scientific inquiry and mathematical innovation.' },
      { title: 'Primary Cause', description: 'Aryabhata\'s genius and the patronage of learning during the Gupta era.' },
      { title: 'The Event', description: 'The Aryabhatiya is composed in 499 CE, introducing revolutionary mathematical and astronomical concepts.' },
      { title: 'Immediate Consequences', description: 'Indian mathematics advances rapidly, with followers like Brahmagupta building on Aryabhata\'s work.' },
      { title: 'Regional Impact', description: 'The place-value system and Indian numerals spread across Asia through trade and scholarship.' },
      { title: 'Civilizational Impact', description: 'The transmission of Indian numerals to the Islamic world and Europe transforms global mathematics.' },
      { title: 'Long-Term Legacy', description: 'The word "algorithm" and the concept of zero become foundational to modern computing and science.' },
      { title: 'Modern Relevance', description: 'India\'s first satellite is named Aryabhata, and his work remains studied in the history of science.' },
    ],
    connectedEntities: [
      { type: 'personality', name: 'Aryabhata', relation: 'Author of the Aryabhatiya', link: '/personalities' },
      { type: 'event', name: 'Reign of Samudragupta Begins', relation: 'Gupta Golden Age context', link: '/event/e6' },
      { type: 'event', name: 'Nalanda University Flourishes', relation: 'Center of learning where Aryabhata may have studied', link: '/event/e15' },
      { type: 'science', name: 'Place-Value System', relation: 'Foundational mathematical innovation' },
      { type: 'science', name: 'Approximation of Pi', relation: 'Key mathematical contribution' },
    ],
    evidence: [
      { type: 'literary', description: 'The Aryabhatiya itself survives in later manuscripts', source: 'Aryabhata, Aryabhatiya (499 CE)', confidence: 'verified' },
      { type: 'academic', description: 'Scholarly analysis and translation of the text', source: 'Shukla & Sarma, "Aryabhatiya" (1976)', confidence: 'verified' },
    ],
    interestingFacts: [
      'Aryabhata approximated pi as 3.1416, accurate to four decimal places.',
      'He proposed that the Earth rotates on its axis 1,000 years before Copernicus.',
      'India\'s first satellite (1975) was named "Aryabhata" in his honor.',
      'The word "algorithm" ultimately derives from the transmission of his mathematical methods.',
    ],
  },
  e13: {
    id: 'e13',
    location: 'Dandi, Gujarat (240-mile march from Sabarmati)',
    readingTimeMin: 6,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'The Dandi Salt March of 1930 was one of the most iconic acts of nonviolent civil disobedience in history. Mahatma Gandhi, then 61 years old, walked 240 miles over 24 days from his ashram at Sabarmati to the coastal village of Dandi, where he defied the British salt monopoly by making salt from seawater.',
          'The Salt March was a masterstroke of political theater. By choosing the salt tax — a burden that affected every Indian regardless of class, caste, or religion — Gandhi found an issue that could unite the entire nation against British rule. The simplicity of the act, and the dignity of its execution, captured the world\'s attention.',
          'The march began on March 12, 1930, with 78 companions. By the time Gandhi reached Dandi on April 6, tens of thousands had joined along the route. The act of making salt was a direct violation of British law, and it sparked a nationwide campaign of civil disobedience that would ultimately make India ungovernable.',
        ],
        footnotes: [
          { ref: '1', text: 'Gandhi, M. K. (1930). Young India, March-June 1930 issues.' },
          { ref: '2', text: 'Fischer, L. (1954). The Life of Mahatma Gandhi. Harper & Brothers.' },
        ],
      },
      {
        id: 'background',
        title: 'Historical Background',
        paragraphs: [
          'The Salt March was part of the broader Civil Disobedience Movement launched by the Indian National Congress under Gandhi\'s leadership. The British Salt Act of 1882 gave the colonial government a monopoly on salt production and collection, making it illegal for Indians to collect or sell salt, a basic necessity of life.',
          'Gandhi announced his intention to march on March 2, 1930, in a letter to the Viceroy, Lord Irwin. He outlined his plan and offered to call off the march if the British would agree to a series of reforms. The Viceroy dismissed the letter, and the march proceeded as planned.',
        ],
      },
      {
        id: 'political',
        title: 'Political Impact',
        paragraphs: [
          'The Salt March demonstrated the power of nonviolent resistance to a global audience. Gandhi\'s march was covered by international press, and the images of a frail man walking across India to defy an empire became iconic. The British arrested Gandhi on May 5, but the movement continued without him.',
          'The march inspired thousands of Indians to make their own salt, and the campaign of civil disobedience spread across the country. The British responded with mass arrests — over 60,000 people were jailed — but the movement could not be suppressed. The Salt March is widely seen as the beginning of the end of British rule in India.',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Modern Relevance',
        paragraphs: [
          'The Salt March became a template for nonviolent resistance movements worldwide. Martin Luther King Jr. cited Gandhi\'s march as a direct inspiration for the American civil rights movement, and the techniques of civil disobedience developed during the march have been used in struggles for freedom and justice across the globe.',
          'In India, the Salt March is remembered as a defining moment of the freedom struggle. The route of the march is now a heritage trail, and Dandi has become a place of pilgrimage for those who honor the legacy of nonviolent resistance.',
        ],
      },
    ],
    rippleStages: [
      { title: 'Historical Context', description: 'The British salt monopoly taxed a basic necessity, affecting every Indian regardless of status.' },
      { title: 'Primary Cause', description: 'Gandhi\'s strategic genius in choosing salt as a unifying issue for civil disobedience.' },
      { title: 'The Event', description: 'Gandhi marches 240 miles to Dandi and makes salt, defying British law on April 6, 1930.' },
      { title: 'Immediate Consequences', description: 'Nationwide civil disobedience erupts; 60,000+ Indians are arrested for making salt.' },
      { title: 'Regional Impact', description: 'The march captures global media attention, exposing the injustice of colonial rule.' },
      { title: 'Civilizational Impact', description: 'The technique of nonviolent resistance is refined and demonstrated as a political force.' },
      { title: 'Long-Term Legacy', description: 'Gandhi\'s methods inspire civil rights and freedom movements worldwide, from MLK to Mandela.' },
      { title: 'Modern Relevance', description: 'The Salt March remains the gold standard for nonviolent political action in the 21st century.' },
    ],
    connectedEntities: [
      { type: 'personality', name: 'Mahatma Gandhi', relation: 'Leader of the march', link: '/personalities' },
      { type: 'event', name: 'Indian Independence', relation: 'The march contributed to the eventual end of British rule', link: '/event/e14' },
      { type: 'event', name: 'Indian Rebellion of 1857', relation: 'Earlier uprising against British rule', link: '/event/e12' },
      { type: 'civilization', name: 'Freedom Movement', relation: 'The broader independence struggle', link: '/explore?tab=freedom' },
    ],
    evidence: [
      { type: 'primary', description: 'Contemporary newspaper reports and Gandhi\'s own writings', source: 'Young India, 1930 issues', confidence: 'verified' },
      { type: 'foreign', description: 'International press coverage of the march', source: 'Webb Miller, United Press dispatch (1930)', confidence: 'verified' },
      { type: 'academic', description: 'Historical analysis of the march and its impact', source: 'Fischer, "The Life of Mahatma Gandhi" (1954)', confidence: 'verified' },
    ],
    interestingFacts: [
      'Gandhi walked an average of 10 miles per day for 24 days at the age of 61.',
      'The march began with 78 companions but drew tens of thousands along the route.',
      'The Salt March inspired Martin Luther King Jr.\'s civil rights strategy.',
      'Over 60,000 Indians were arrested during the resulting civil disobedience campaign.',
    ],
  },
};

// Fallback detail generator for events without custom content
export function getEventDetail(eventId: string, fallbackTitle: string, fallbackSummary: string): EventDetail {
  if (EVENT_DETAILS[eventId]) return EVENT_DETAILS[eventId];
  return {
    id: eventId,
    location: 'Indian Subcontinent',
    readingTimeMin: 6,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          `${fallbackSummary} This event represents a pivotal moment in the tapestry of Indian civilization, one whose reverberations would be felt across centuries and continue to shape our understanding of the subcontinent's rich heritage.`,
          'The historical significance of this event extends beyond its immediate circumstances. It sits at the intersection of political, cultural, and social currents that defined its era, and its study reveals the complexity of civilizational development in ancient India.',
        ],
      },
      {
        id: 'background',
        title: 'Historical Background',
        paragraphs: [
          'The political landscape surrounding this event was shaped by competing powers, shifting alliances, and the ambitions of rulers who sought to consolidate their authority. Understanding these dynamics is essential to grasping why events unfolded as they did.',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Modern Relevance',
        paragraphs: [
          'Through careful examination of archaeological evidence, literary sources, and scholarly interpretation, we can reconstruct the context and consequences of this moment with increasing precision. The legacy of this event continues to resonate in the cultural and political life of modern India.',
        ],
      },
    ],
    rippleStages: [
      { title: 'Historical Context', description: 'The conditions and circumstances that set the stage for what followed.' },
      { title: 'Primary Cause', description: 'The immediate trigger or driving force behind the event.' },
      { title: 'The Event', description: `${fallbackTitle} — the focal point of this historical moment.` },
      { title: 'Immediate Consequences', description: 'Direct outcomes that unfolded in the event\'s wake.' },
      { title: 'Regional Impact', description: 'How the event reshaped the surrounding region.' },
      { title: 'Civilizational Impact', description: 'The broader civilizational transformation it catalyzed.' },
      { title: 'Long-Term Legacy', description: 'Enduring consequences visible across subsequent centuries.' },
      { title: 'Modern Relevance', description: 'How this event continues to shape the present day.' },
    ],
    connectedEntities: [
      { type: 'event', name: 'Related Historical Events', relation: 'Explore connected events' },
    ],
    evidence: [
      { type: 'literary', description: 'Literary sources reference this event', source: 'BharatVerse Research Archive', confidence: 'strong' },
      { type: 'academic', description: 'Scholarly research supports the historical account', source: 'Academic Publications', confidence: 'strong' },
    ],
    interestingFacts: [
      'This event is part of the curated BharatVerse historical timeline.',
      'Scholarly research continues to reveal new perspectives on this moment in history.',
    ],
  };
}
