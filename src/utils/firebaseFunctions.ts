import { DocumentData, collection, getDocs, query, where, doc, setDoc, arrayUnion } from 'firebase/firestore';
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
      console.log(userData)
      return userData;
    }
  }
};

export const addToFavorites = async (movieId: string) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(query(userCollectionRef, where('uid', '==', currentUser.uid)));
    const userDocRef = doc(db, 'users', querySnapshot.docs[0].id);

    try {
      await setDoc(
        userDocRef,
        {
          favorites: arrayUnion(movieId),
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Cannot add to favorites:", error)
    }

  }
} 