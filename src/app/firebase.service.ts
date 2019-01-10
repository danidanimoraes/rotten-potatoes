import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { resolve } from 'q';


@Injectable()
export class FirebaseService {

  constructor(
    private db: AngularFirestore
  ) { }

  public createItem(title, description, score, genre)
  {
    return this.db
      .collection('items')
      .add(
        {
          title,
          description,
          score,
          genre
        }
      )
  }

  public getAllItems()
  {
    return this.db
      .collection('items')
      .snapshotChanges();
  }
}
