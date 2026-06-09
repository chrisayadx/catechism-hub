-- ============================================================
-- Coptic Catechism Hub — Supabase Schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- Sessions
create table if not exists public.sessions (
  id integer primary key,
  title text not null,
  theme text not null,
  color text not null default '#C8A96E',
  topics text[] not null default '{}',
  memorize text[] not null default '{}',
  practice text[] not null default '{}',
  sort_order integer not null default 0
);

-- Curriculum
create table if not exists public.curriculum (
  id integer primary key,
  label text not null,
  part_name text not null,
  color text not null default '#C8A96E',
  topics jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0
);

-- Resources
create table if not exists public.resources_groups (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('free', 'purchase')),
  category text not null,
  icon text not null default '🔗',
  items jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- Disable RLS for now (enable and add policies later if you want auth)
alter table public.sessions disable row level security;
alter table public.curriculum disable row level security;
alter table public.resources_groups disable row level security;

-- ============================================================
-- SEED: Initial sessions data
-- ============================================================
insert into public.sessions (id, title, theme, color, topics, memorize, practice, sort_order) values
(1, 'The Story & the Symbol of Faith', 'What we believe and how we confess it', '#C8A96E',
  array['What is Doctrine? (Christ as source; Tradition, Scripture, Worship)', 'The Nicene-Constantinopolitan Creed — the baptismal confession', 'Who is God? Who are we? What went wrong? The Gospel in summary.', 'Scripture in the Church: salvation history and how we read the Bible.'],
  array['The Nicene Creed', 'Mark 1:15', 'Hebrews 11:1'],
  array['Recite the Creed together; paraphrase each part.', 'Read a Gospel passage; interpret it through the Creed.'],
  1),
(2, 'Jesus Christ & the Holy Trinity', 'God saves us through His Son in the Spirit', '#8B5E3C',
  array['The Trinity: One God in Three Persons.', '100% True God + 100% True Man = 100% Jesus Christ', 'Salvation as participation in the life of Christ (Incarnation, Cross, Resurrection, Ascension).', 'Judgment and eternal destiny.'],
  array['Ephesians 2:18–22'],
  array['Pray ''to the Father, through the Son, in the Holy Spirit.''', '''Gospel in 60 seconds'' exercise.'],
  2),
(3, 'The Church, Worship & the Mysteries', 'Life in the Kingdom, here and now', '#4A6741',
  array['The Church as One, Holy, Catholic, Apostolic.', 'Worship as bringing heaven on earth.', 'The Seven Sacraments (Mysteries): Baptism, Chrismation, Eucharist, Confession, Unction, Marriage, Priesthood.', 'Divine Liturgy as the center of Christian life.'],
  array['Psalm 141:2', 'John 6:51', '1 Corinthians 10:16'],
  array['Walking tour through the church (altar, icons, candles, vestments).', 'Review the Divine Liturgy in 5 steps.'],
  3),
(4, 'Spiritual Life: Rule, Beatitudes & Virtues', 'Living the Gospel daily', '#5B4A8C',
  array['Goal: being filled with the fullness of God.', 'The Beatitudes as the roadmap of Christian life.', 'Virtues & Fruit of the Spirit (faith, hope, love, humility, patience, self-control, gratitude).', 'Prayer, fasting, and almsgiving as the ''spiritual trinity.'''],
  array['Matthew 5:3–12', 'The Lord''s Prayer', 'Arrow prayers (the Jesus Prayer)'],
  array['Draft a simple rule of life: prayer (Agpeya), fasting rhythm, almsgiving, confession schedule.'],
  4),
(5, 'History, Authority & Next Steps', 'Joining the Apostolic Church', '#7A3030',
  array['The Creed Part II: One Baptism, resurrection, life of the Age to come.', 'Church history up to Chalcedon: unity, councils, canons, divisions.', 'Apostolic authority today: bishop, priest, laity.', 'Preparing for Baptism/Chrismation: confession, godparent/sponsor, fasting.'],
  array['Ephesians 4:1–6'],
  array['Review baptism/chrismation service.', 'Schedule confession.', 'Draft sponsor/godparent conversation guide.'],
  5)
on conflict (id) do nothing;

-- ============================================================
-- SEED: Curriculum
-- ============================================================
insert into public.curriculum (id, label, part_name, color, topics, sort_order) values
(1, 'I', 'Doctrine & Scripture', '#C8A96E', '[
  {"title":"What is Doctrine?","points":["Sources — Jesus Christ, Tradition, Scripture, Liturgy","Councils (up to Chalcedon, including split), Fathers, Canons","Saints, Iconography, Hymnography"]},
  {"title":"The Symbol of Faith: Nicene Creed Part I","points":["Faith","God","Creation of Angels/Demons & Humanity","Sin","Jesus Christ, Son of God","Redemption: Incarnation, Resurrection, Ascension","Judgement"]},
  {"title":"The Symbol of Faith: Nicene Creed Part II","points":["Church: One, Holy, Catholic, & Apostolic","Sacraments","Eternal Life/Heaven"]},
  {"title":"The Holy Trinity","points":["One God, One Father","3 Persons in 1 God","The Holy Trinity in Creation","The Holy Trinity in Salvation","The Holy Trinity in the Church","The Holy Trinity in the Sacraments","The Holy Trinity in Christian Life","The Holy Trinity in Eternal Life"]},
  {"title":"What is Scripture?","points":["Bible interpretation","OT — Law, History, Wisdom, Psalms, Prophets","NT — Gospels, Acts, Pauline Epistles, Catholic Epistles, Revelation","Salvation History — Word & Spirit, Pre-History, Abraham, Passover, Kingship, Priesthood, Prophecy, Holiness"]}
]'::jsonb, 1),
(2, 'II', 'Worship', '#4A7838', '[
  {"title":"Church Building","points":["Altar, Oblations, Icons, Sign of the Cross, Vestments, Christian Symbols"]},
  {"title":"Sacraments","points":[]},
  {"title":"Cycle of Prayer","points":["What is Prayer?","Vespers","Matins","Agpeya — Prayer book of the Hours"]},
  {"title":"The Church Year","points":["Liturgical Calendar","Major/Minor Feasts","Fasts","Holy Week","Holy 50"]},
  {"title":"The Divine Liturgy","points":["Quick review of the 10 week series"]}
]'::jsonb, 2),
(3, 'III', 'Spirituality', '#6B5080', '[
  {"title":"Everyday Communing with God","points":["Centered on God, in Christ, by the Holy Spirit","Born in His Image, Choosing His Likeness","Spiritual Warfare","Sacramental Life","Living in Kingdom of God in the World"]},
  {"title":"The Beatitudes","points":["Poor in Spirit","Mourning","Meekness","Hungering/Thirsting for Righteousness","Mercy","Pure in Heart","Peacemakers","Persecuted for Righteousness'' Sake","Rejoice & Be Glad"]},
  {"title":"The Virtues Part I","points":["Faith","Hope","Knowledge","Wisdom","Honesty","Humility"]},
  {"title":"The Virtues Part II","points":["Obedience","Patience","Courage","Faithfulness","Self-Control","Kindness","Gratitude"]},
  {"title":"The Greatest Commandment","points":["God is Love","Love of God","Love of Neighbor","The New Commandment"]},
  {"title":"Prayer, Fasting, & Almsgiving","points":[]},
  {"title":"Sexuality, Marriage & Family Life","points":[]},
  {"title":"Sickness, Suffering, & Death","points":[]},
  {"title":"The Kingdom of Heaven","points":["The Final Judgement","Heaven & Hell","Filled with All the Fullness of God"]}
]'::jsonb, 3)
on conflict (id) do nothing;

-- ============================================================
-- SEED: Resources
-- ============================================================
insert into public.resources_groups (section, category, icon, items, sort_order) values
('free', 'Fr. Tadros Malaty — Bible Commentaries', '📖', '[
  {"name":"Full commentary library (OT & NT)","url":"https://www.dpskchurch.org/bible-commentaries","note":"Hosted by DPSK Church"},
  {"name":"St. Mina Hamilton full collection","url":"https://www.stminahamilton.ca/groups/servants/bible-commentary-books/","note":"English & Arabic"},
  {"name":"Gospel of Mark (PDF)","url":"https://www.stminahamilton.ca/download/Books/Bible%20Commentary%20-%20Fr.%20Tadros%20EN/048_Mark%20-%20Fr.%20Tadros%20Yacoub%20Malaty.pdf","note":"Direct PDF download"},
  {"name":"Book of Revelation (PDF)","url":"https://www.stminahamilton.ca/download/Books/Bible%20Commentary%20-%20Fr.%20Tadros%20EN/073_Revelation%20-%20Fr.%20Tadros%20Yacoub%20Malaty.pdf","note":"Direct PDF download"}
]'::jsonb, 1),
('free', 'Fr. Thomas Hopko — The Orthodox Faith', '🕊️', '[
  {"name":"Vol. 1 — Doctrine & Scripture","url":"https://www.oca.org/orthodoxy/the-orthodox-faith/doctrine-scripture","note":"Full text on OCA.org"},
  {"name":"Vol. 2 — Worship","url":"https://www.oca.org/orthodoxy/the-orthodox-faith/worship","note":"Full text on OCA.org"},
  {"name":"Vol. 4 — Spirituality","url":"https://www.oca.org/orthodoxy/the-orthodox-faith/spirituality","note":"Full text on OCA.org"}
]'::jsonb, 2),
('free', 'Fr. Stephen De Young — Podcasts & Media', '🎙️', '[
  {"name":"The Whole Counsel of God — Podcast","url":"https://podcasts.apple.com/us/podcast/the-whole-counsel-of-god/id1193439458","note":"Verse-by-verse through Scripture"},
  {"name":"Lord of Spirits — Podcast","url":"https://open.spotify.com/show/4VFbXDdfvimLr8LGh1inZt","note":"Co-hosted with Fr. Andrew Damick"},
  {"name":"Ancient Faith Blog — The Whole Counsel","url":"https://blogs.ancientfaith.com/wholecounsel/","note":"Free articles & essays"}
]'::jsonb, 3),
('free', 'Apps & Daily Resources', '📱', '[
  {"name":"Coptic Reader App","url":"https://copticreader.com","note":"Agpeya, Liturgy, Synaxarium, Readings"},
  {"name":"Daily Readings & Synaxarium","url":"http://www.copticchurch.net/classes/getLectionary.php","note":"CopticChurch.net lectionary"}
]'::jsonb, 4),
('purchase', 'Books to Purchase', '📚', '[
  {"name":"This Great Mystery of Life — Fr. Antonios Kaldas","url":"https://www.stshenoudapress.com/store/this-great-mystery-of-life/","note":"St. Shenouda Press · best Coptic intro"},
  {"name":"The Whole Counsel of God — Fr. Stephen De Young","url":"https://store.ancientfaith.com/the-whole-counsel-of-god/","note":"Ancient Faith Publishing · intro to the Bible"},
  {"name":"The Orthodox Faith Vol. 1–4 — Fr. Thomas Hopko","url":"https://svspress.com/the-orthodox-faith-vol-i-doctrine/","note":"SVS Press · physical copies"}
]'::jsonb, 5);
