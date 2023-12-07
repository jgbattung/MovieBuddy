export const formatQid = (qid: string) => {
  return qid
    .replace(/(movie|tvSeries|tvMiniSeries|short)/g, (match) => {
      return match.charAt(0).toUpperCase() + match.slice(1);
    })
    .replace(/([A-Z])/g, ' $1')
    .replace(/Tv V/g, 'TV V')
    .replace(/Tv ([A-Z])/g, (match, p1) => {
      return 'TV ' + p1.toUpperCase();
    })
    .trim();
};

export const imageNotFoundLink = "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png"
