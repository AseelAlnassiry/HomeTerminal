import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    const auth = getAuth();

    // sign user out
    try {
      // update online status
      const { uid } = user;
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, { online: false });
      // sign out of firebase backend
      await await signOut(auth);
      console.log('signout successful');

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      if (!isCancelled) {
        console.log(e.message);
        setError(e.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
