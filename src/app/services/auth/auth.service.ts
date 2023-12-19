import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import IUser from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private usersCollection: AngularFirestoreCollection<IUser>;

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  authState$ = authState(this.auth);
  userSubscription: Subscription;
  currentUser: User | null = null;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  private firestore: Firestore = inject(Firestore);
  private usersCollection: CollectionReference<DocumentData>;

  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      this.currentUser = aUser;
    });
    // this.isAuthenticated$ = this.user$.pipe(map((user) => !!user));
    this.isAuthenticated$ = this.authState$.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
    
    this.usersCollection = collection(this.firestore, 'users');
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }

  createUser = async (userData: IUser) => {
    const { name, email, age, phoneNumber, password } = userData;
    if (!password) {
      throw new Error('Password not provided!');
    }

    // Register new user.
    const userCredentials = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    if (!userCredentials.user) {
      throw new Error('Password not provided!');
    }

    // Create new user.
    // await this.usersCollection.doc(userCredentials.user?.uid).set({
    //   name,
    //   email,
    //   age,
    //   phoneNumber,
    // });
    await setDoc(doc(this.usersCollection, userCredentials.user?.uid), {
      name,
      email,
      age,
      phoneNumber,
    });

    await updateProfile(userCredentials.user, {
      displayName: name,
    });
  };

  login = async (email: string, password: string) => {
    // Login user.
    await signInWithEmailAndPassword(this.auth, email, password);
  };

  logout = async () => {
    await this.auth.signOut();
    await this.router.navigateByUrl('/');
  };

  emailExists = async (email: string): Promise<string[]> => {
    return await fetchSignInMethodsForEmail(this.auth, email);
  };
}
