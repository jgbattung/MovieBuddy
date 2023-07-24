import { AuthError } from './components/common/constants';

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