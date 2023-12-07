import { AuthError } from '../components/common/constants';

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

export const API_KEY: string = `${process.env.REACT_APP_API_KEY}`;
export const API_HOST: string = 'imdb8.p.rapidapi.com';

export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'wrong-password':
    case 'user-not-found':
      return AuthError.INVALID_CREDENTIIALS;
    case 'email-already-in-use':
      return AuthError.EMAIL_EXISTS;
    case 'too-many-requests':
      return AuthError.TOO_MANY_REQUESTS;
    case 'invalid-email':
      return AuthError.INVALID_EMAIL;
    case 'weak-password':
      return AuthError.WEAK_PASSWORD;
    case 'missing-password':
      return AuthError.MISSING_PASSWORD;
    default:
      return 'An error occurred during authentication. Please try again';
  }
};