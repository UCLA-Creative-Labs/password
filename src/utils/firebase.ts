import firebase from 'firebase';

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
  level?: number,
}

export interface _FirebaseProps {
  setIsSignedIn: (b: boolean) => void;
}

export class _Firebase {

  public setIsSignedIn: (b: boolean) => void;
  public user: UserInfo;

  public constructor(){
    this.setIsSignedIn = (b) => {b;};
    this.user = {};
  }

  public load(props: _FirebaseProps): void  {
    this.setIsSignedIn = props.setIsSignedIn;
    this.user = {};

    void firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth(app).onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        this.setIsSignedIn(true);
        if (Object.keys(this.user).length === 0){
          this.postUser(user);
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

  public postUser(auth_user: firebase.User, setState?: (t: UserInfo) => void ): void {
    const document = firebase.firestore(app).collection('users').doc(auth_user.uid);
    void document.get().then((doc) => {
      this.user = doc.exists ? doc.data() : this.putUser(auth_user);
      if (setState) setState(this.user);
    });
  }

  public putUser(auth_user: firebase.User): UserInfo {
    const collection = firebase.firestore(app).collection('users');
    const profile = auth_user.providerData[0];

    const deets: UserInfo = {
      name: profile?.displayName ?? 'Anonymous User',
      email: profile?.email ?? 'N/A',
      level: 0,
    };
    void collection.doc(auth_user.uid).set(deets);
    return deets;
  }
}


