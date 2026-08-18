const NEWS_TAGS = [
  { id: 'all', title: 'Все' },
  { id: 'temple', title: 'Храм' },
  { id: 'sport', title: 'Спорт' },
  { id: 'social-service', title: 'Социальное служение' },
  { id: 'education', title: 'Образование' },
  { id: 'weekly-meetings', title: 'Еженедельные собрания' },
  { id: 'pilgrimage', title: 'Паломничество' },
];

const NEWS_TAG_VALUES = NEWS_TAGS.filter((tag) => tag.id !== 'all');

const getNewsTag = (id) => NEWS_TAGS.find((tag) => tag.id === id) || null;

const parseTagId = (value) => {
  if (value && typeof value === 'object') {
    return String(value.id || '').trim();
  }

  return String(value || '').trim();
};

const isAllowedNewsTag = (id) => NEWS_TAG_VALUES.some((tag) => tag.id === id);

module.exports = { NEWS_TAGS, NEWS_TAG_VALUES, getNewsTag, parseTagId, isAllowedNewsTag };
