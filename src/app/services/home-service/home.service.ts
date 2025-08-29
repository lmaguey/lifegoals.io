import { Injectable } from '@angular/core';
import { Firestore, collectionData, addDoc, deleteDoc, doc, collection } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../../models/meta.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MetaService {
  
  private dbPath = 'metas';

  metasRef!: AngularFirestoreCollection<Meta>;

  constructor(private firestore: AngularFirestore) {
     this.metasRef = firestore.collection(this.dbPath);
   }

   getMetas(): AngularFirestoreCollection<Meta> {
      return this.metasRef;
  }

  addMeta(meta: Meta) {
    return this.metasRef.add(meta);
  }

  deleteMeta(id: string) {
    return this.metasRef.doc(id).delete();
  }

  countMetas(): Observable<number> {
   return this.metasRef.snapshotChanges().pipe(
     map(actions => actions.length)
    );
   }
   

}
