import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    const auth = getAuth();

    // sign user in
    try {
      // firebase backend login
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('signin successful');

      // set online status
      const { uid } = res.user;
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, { online: true });

      // dispatch a login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      if (!isCancelled) {
        if (e.message === 'Firebase: Error (auth/wrong-password).') {
          setError('incorrect email or password');
        } else {
          setError(e.message);
        }
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
