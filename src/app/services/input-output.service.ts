import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { InputOutputModel } from '../models/input-output.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InputOutputService {

  constructor(private firestore: AngularFirestore,
              private authSvc: AuthService) { }

  createInputOutput(inputOutput: InputOutputModel) {
    const uid = this.authSvc.user.uid;
    // console.log(uid);
    return this.firestore.doc(`${uid}/inputs-outputs`)
      .collection('items')
      .add({ ...inputOutput });
  }

  initInputsOutputs(uid: string) {
    return this.firestore.collection(`${uid}/inputs-outputs/items`)
      .snapshotChanges()
      .pipe(
        // map(snapshot => {
        //   return snapshot.map(doc => {
        //     const data: any = doc.payload.doc.data();
        //     return {
        //       uid: doc.payload.doc.id,
        //       ...data
        //     };
        //   });
        // })
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        ))
      );
  }

  deleteInputOutput(uidItem: string) {
    const uidUser = this.authSvc.user.uid;
    return this.firestore.doc(`${uidUser}/inputs-outputs/items/${uidItem}`).delete();
  }
}
