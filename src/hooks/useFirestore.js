import { useReducer, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { addDoc, collection, Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, isPending: true, error: null, success: null };
    case 'ADDED_DOCUMENT':
      return { document: action.payload, isPending: false, success: true, error: null };
    case 'DELETED_DOCUMENT':
      return { document: action.payload, isPending: false, success: true, error: null };
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};
const useFirestore = (targetCollection) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = Timestamp.fromDate(new Date());

      const docRef = await addDoc(collection(db, targetCollection), { ...doc, createdAt });
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: docRef });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // remove a document
  const removeDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(db, targetCollection, id);
      const deletedDocument = await deleteDoc(docRef);
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deletedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: "couldn't delete" });
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(db, targetCollection, id);
      const updatedDocument = await updateDoc(docRef, updates);
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
      return updateDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: "couldn't update" });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, removeDocument, updateDocument, state };
};

export default useFirestore;
