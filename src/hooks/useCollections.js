import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';

const useCollection = (targetCollection, _queryString) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const queryString = useRef(_queryString).current;
  

  useEffect(() => {
    let ref = collection(db, targetCollection);

    ref = query(collection(db, targetCollection), where(...queryString));

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("couldn't fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [targetCollection, queryString]);

  return { documents, error };
};

export default useCollection;
