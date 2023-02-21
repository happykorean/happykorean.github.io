export const getDramaName = (dramaList, key, locale) => {
  const drama = dramaList.find(d => d.key === key);
  return drama ? drama.label[locale] : '';
}
