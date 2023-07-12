import {
  CollectionReference,
  DocumentReference,
  doc,
} from "firebase/firestore";

export function getDocRef(
  collectionRef: CollectionReference,
  id: string
): DocumentReference {
  return doc(collectionRef, id);
}
