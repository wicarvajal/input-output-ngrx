import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs: Subscription;

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      if (fUser) {
        this.userSubs = this.firestore.doc(`${fUser.uid}/user`).valueChanges()
        .subscribe((fStoreUser: any) => {
          // Se debe desuscribir ya que si hay cambios en la bdd
          // entra al subscribe y mantiene info incorrecta del usuario
          const tempUser = User.fromFirebase(fStoreUser);
          this.store.dispatch(setUser({user: tempUser}));
        });
      } else {
        this.userSubs.unsubscribe();
        this.store.dispatch(unsetUser());
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    // console.log({ name, email, password });
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user.uid, name, user.email);
        return this.firestore.doc(`${user.uid}/user`).set({ ...newUser });
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
