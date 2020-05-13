import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      console.log(fUser?.uid);
      console.log(fUser?.email);
    });
  }

  createUser(name: string, email: string, password: string) {
    // console.log({ name, email, password });
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      const newUser = new User(user.uid, name, user.email);
      return this.firestore.doc(`${user.uid}/user`).set({...newUser});
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser !== null)
    );
  }
}
