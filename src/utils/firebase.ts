import firebase from 'firebase';

// import { INITIAL_LEVEL } from '../components/Levels';
const INITIAL_LEVEL = 'level1';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
const app = firebase.initializeApp(config);

/**
 * The UserInfo that the app needs to process levels
 */
export interface UserInfo {
  name?: string,
  email?: string,
  level?: string,
}

/**
 * The props for the _Firebase Class
 */
export interface _FirebaseProps {
  /**
   * The hook for initializing the _Firebase.load()
   *
   * @param b the boolean value to change app state
   */
  setIsSignedIn: (b: boolean) => void;
}

/**
 * The class to perform operations on Firebase
 */
export class _Firebase {
  /**
   * the sign in hook
   */
  public setIsSignedIn: (b: boolean) => void;
  /**
   * user info will be stored here
   */
  public user?: UserInfo;
  /**
   * the authenticated user information
   *
   * Used for the firebase CRUD operations
   */
  protected auth_user?: firebase.User;

  public constructor(){
    this.setIsSignedIn = (b) => {b;};
  }

  /**
   * When component mounts, run the this function.
   *
   * 1. Set the persistence for the firebase.app to persist locally
   * 2. Sign in the user and store the auth_user
   * 3. Update this.user with through a POST
   *
   * @param props the properties to for load
   */
  public load(props: _FirebaseProps): void  {
    this.setIsSignedIn = props.setIsSignedIn;
    this.user = {};

    void firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth(app).onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        this.setIsSignedIn(true);
        this.auth_user = user;
        if (this.user && Object.keys(this.user).length === 0){
          void this.postUser();
        }
      }
    });
  }

  /**
   * @returns the UI Configuration for StyledFirebaseAuth
   */
  public uiConfig(): firebaseui.auth.Config {
    return {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          this.setIsSignedIn(true);
          return false;
        },
      },
    };
  }

  /**
   * @returns the firebase.app
   */
  public auth(): firebase.auth.Auth {
    return firebase.auth(app);
  }

  /**
   * Sign out and empty this.user
   */
  public signOut(): void {
    void firebase.auth(app).signOut().then(() => this.user = {});
  }

  /**
   * Retrieves the document on a user and perform an operation
   *
   * @param ternaryOp if the document doesnt exist, complete this operation
   */
  protected retrieveDocument(ternaryOp: any) {
    if(!this.auth_user) return;
    const document = firebase.firestore(app).collection('users').doc(this.auth_user.uid);
    return document.get().then((doc) => {
      return doc.exists ? doc.data() : ternaryOp;
    });
  }

  /**
   * GET operation for the user.
   */
  public getUser(): Promise<any> | undefined {
    return this.retrieveDocument({});
  }

  /**
   * POST operation for the user.
   */
  public postUser(): Promise<any> | undefined {
    return this.retrieveDocument(this.putUser());
  }

  /**
   * UPDATE operation for the user.
   *
   * @param updates the updated user object, defaults to this.user if not passed in
   */
  public updateUser(updates: UserInfo): Promise<any> | undefined {
    if(!this.auth_user) return;
    const document = firebase.firestore(app).collection('users').doc(this.auth_user.uid);
    const updatedUser: UserInfo = {
      name: updates.name ?? this.user?.name,
      email: updates.email ?? this.user?.email,
      level: updates.level ?? this.user?.level,
    };
    return document.update(updatedUser);
  }

  /**
   * PUT operation for the user.
   */
  public putUser(): UserInfo {
    if(!this.auth_user) return {};
    const document = firebase.firestore(app).collection('users').doc(this.auth_user.uid);
    const profile = this.auth_user.providerData[0];

    const deets: UserInfo = {
      name: profile?.displayName ?? 'Anonymous User',
      email: profile?.email ?? 'N/A',
      level: INITIAL_LEVEL,
    };
    void document.set(deets);
    return deets;
  }
}
