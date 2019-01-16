import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
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

  public getItem(id: string)
  {
    return this.db
      .collection(`items`)
      .doc(`${id}`)
      .get();
  }

  public getImagesFromStorage()
  {
    
  }
}
