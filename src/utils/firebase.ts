import firebase from 'firebase';

import { INITIAL_LEVEL } from '../components/Levels';

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

export interface UserInfo {
  name?: string,
  email?: string,
  level?: string,
}

export interface _FirebaseProps {
  setIsSignedIn: (b: boolean) => void;
}

export class _Firebase {

  public setIsSignedIn: (b: boolean) => void;
  public user?: UserInfo;

  protected auth_user?: firebase.User;

  public constructor(){
    this.setIsSignedIn = (b) => {b;};
  }

  public load(props: _FirebaseProps): void  {
    this.setIsSignedIn = props.setIsSignedIn;
    this.user = {};

    void firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth(app).onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        this.setIsSignedIn(true);
        this.auth_user = user;
        if (this.user && Object.keys(this.user).length === 0){
          this.postUser();
        }
      }
    });
  }

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

  public auth(): firebase.auth.Auth {
    return firebase.auth(app);
  }

  public signOut(): void {
    void firebase.auth(app).signOut().then(() => this.user = {});
  }

  protected retrieveDocument(ternaryOp: any, setState?: (t: UserInfo) => void) {
    if(!this.auth_user) return;
    const document = firebase.firestore(app).collection('users').doc(this.auth_user.uid);
    void document.get().then((doc) => {
      this.user = doc.exists ? doc.data() : ternaryOp;
      if (setState && this.user) setState(this.user);
    });
  }

  public getUser(setState: (t: UserInfo) => void): void {
    this.retrieveDocument({}, setState);
  }

  public postUser(setState?: (t: UserInfo) => void ): void {
    this.retrieveDocument(this.putUser, setState);
  }

  public updateUser(updates: UserInfo): void {
    if(!this.auth_user) return;
    const document = firebase.firestore(app).collection('users').doc(this.auth_user.uid);

    const updatedUser: UserInfo = {
      name: updates.name ?? this.user?.name,
      email: updates.email ?? this.user?.email,
      level: updates.level ?? this.user?.level,
    };
    void document.update(updatedUser);
  }

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
