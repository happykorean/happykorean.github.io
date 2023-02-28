export const getDramaName = (dramaList, key, locale) => {
  const drama = dramaList.find(d => d.key === key);
  return drama ? drama.label[locale] : '';
}

export const getDramaSeason = (dramaList, key) => {
  const drama = dramaList.find(d => d.key === key);
  return drama ? drama.season : 1;
}

export const getDramaNoOfEp = (dramaList, key) => {
  const drama = dramaList.find(d => d.key === key);
  return drama ? drama.noOfEp : 24;
}
