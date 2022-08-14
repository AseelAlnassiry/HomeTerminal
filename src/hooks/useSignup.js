import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authInfo } from '../config/config';
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(authInfo, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      const { user } = res;
      await updateProfile(user, { displayName: firstName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: user });

      // check for cancellation
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
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
