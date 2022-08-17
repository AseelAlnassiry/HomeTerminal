import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      const { user } = res;

      // upload user thumbnail
      const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;
      const imageRef = ref(storage, uploadPath);
      await uploadBytes(imageRef, thumbnail);
      const photoURL = await getDownloadURL(imageRef);

      // add display name to user
      await updateProfile(user, { displayName, photoURL });

      // create a user document
      await setDoc(doc(db, 'users', user.uid), { online: true, displayName, photoURL });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: user });

      // check for cancellation
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        console.log(user);
      }
    } catch (err) {
      if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('That email is already in use.');
      } else {
        console.log(err);
        setError(err.message);
      }

      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, signup };
};

export { useSignup };
