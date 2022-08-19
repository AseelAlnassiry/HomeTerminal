import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';

const useCollection = (targetCollection, _queryString = ['__name__', '!=', 'yeeha'], _orderByArg = ['__name__']) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const queryString = useRef(_queryString).current;
  const orderByArg = useRef(_orderByArg).current;

  useEffect(() => {
    let docRef = collection(db, targetCollection);
    let ref = '';
    if (queryString[0] && orderByArg[0]) {
      ref = query(docRef, where(...queryString), orderBy(...orderByArg));
    } else if (!queryString[0]) {
      ref = query(docRef, orderBy(...orderByArg));
    } else if (!orderByArg[0]) {
      ref = query(docRef, where(...queryString));
    } else {
      ref = query(docRef);
    }

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
  }, [targetCollection, queryString, orderByArg]);

  return { documents, error };
};

export default useCollection;
