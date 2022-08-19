import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const docRef = doc(db, collection, id);
    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('no such document exists')
        }
      },
      (err) => {
        console.log(err.message);
        setError('failed to get document');
      }
    );

    return () => unsub;
  }, [collection, document, id]);

  return { document, error };
};

export default useDocument;
