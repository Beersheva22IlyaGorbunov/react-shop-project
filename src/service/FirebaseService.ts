import { FirebaseError } from 'firebase/app'
import {
  CollectionReference,
  DocumentReference,
  FirestoreError,
  doc
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import firestoreApp from '../config/firebaseConfig'

export default class FirebaseService {
  private readonly storage = getStorage(firestoreApp)

  protected async uploadImages (
    images: File[],
    folder: string
  ): Promise<string[]> {
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(this.storage, `/${folder}/${image.name}`)
      return await uploadBytes(storageRef, image)
    })
    const uploadResults = await Promise.all(uploadPromises)
    const urlsPromises = uploadResults.map(async (res) => await getDownloadURL(res.ref))
    const urls = await Promise.all(urlsPromises)
    return urls
  }

  protected getErrorMsg (error: FirestoreError | FirebaseError): string {
    let errMsg = error.message
    switch (error.code) {
      case 'unauthenticated':
      case 'permission-denied': {
        errMsg = 'Authentication'
        break
      }
      case 'not-found': {
        errMsg = 'Not found'
        break
      }
    }
    return errMsg
  }

  protected getDocRef (
    collectionRef: CollectionReference,
    id: string
  ): DocumentReference {
    return doc(collectionRef, id)
  }
}
