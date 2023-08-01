import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const fetchAndSetUserData = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log('Not logged in')
  } else {
    const userCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(query(userCollectionRef, where('uid', '==', currentUser.uid)))

    if (querySnapshot.empty) {
      console.log('User does not exist')
    } else {
      const userData = querySnapshot.docs[0].data() as DocumentData;
      return userData;
    }
  }
};