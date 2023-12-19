import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  Storage,
  deleteObject,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { map, of, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import IClip from 'src/app/models/clip.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  private clipCollection: CollectionReference<DocumentData>;
  private firestore: Firestore = inject(Firestore);

  private readonly storage: Storage = inject(Storage);

  pageClips: IClip[] = [];

  constructor(private authService: AuthService) {
    this.clipCollection = collection(this.firestore, 'clips');
  }

  createClip = (data: IClip): Promise<DocumentReference> => {
    return addDoc(this.clipCollection, data);
  };

  getUserClips = (sort: string) => {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }

        const clipQuery = query(
          this.clipCollection,
          where('uid', '==', user.uid)
        );

        return getDocs(clipQuery);
      }),
      map((snapshot) => {
        const docs = (snapshot as QuerySnapshot<IClip>).docs;
         return docs.map((doc) => {
          const data = doc.data()
          return {
            docID: doc.id,
            ...data,
          };
         })
      })
    );
  };

  updateClip = (id: string, data: Partial<IClip>) => {
    return updateDoc(doc(this.clipCollection, id), { ...data });
  };

  uploadClip = async (data: IClip) => {
    // const clipFileName = uuid();
    // const clipPath = `clips/${clipFileName}.mp4`;
    // const storageRef = ref(this.storage, clipPath);
  };

  deleteClip = async (clip: IClip) => {
    const clipRef = ref(this.storage, clip.clipFileName);
    await deleteObject(clipRef);

    const screenshotRef = ref(this.storage, clip.screenshotFileName);
    await deleteObject(screenshotRef);

    const docRef = doc(this.clipCollection, clip.docID);
    await deleteDoc(docRef);
  };
}

// Firebase Storage Rules:
// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read: if true;
//       allow write: if request.auth != null &&
//       	request.resource.contentType == 'video/mp4' &&
//         // request.resource.contentType.matches('video/*') &&
//         request.resource.size < 10 * 1000 * 1000;
//     }
//   }
// }
