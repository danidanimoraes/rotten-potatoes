import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  public createItem(title: string, description: string, score: number, genre: string, user: string, imageFile: File)
  {
    if(imageFile)
    {
      const image: string = `series-and-movies/${title.toLowerCase().replace(/\s/g,'')}.${imageFile.type.split('/')[1]}`;

      this.storage.upload(image, imageFile).then(() => {
        return this.db
          .collection('items')
          .add(
            {
              title,
              description,
              score,
              genre,
              user,
              image
            }
          )
      });
    }

    const image: string = `series-and-movies/nosignal.jpg`;
    return this.db
      .collection('items')
      .add(
        {
          title,
          description,
          score,
          genre,
          user,
          image 
        }
      )
  }

  public uploadItem(id: string, title: string, description: string, score: number, genre: string, user: string, imageFile: File)
  {
    if(imageFile)
    {
      const image: string = `series-and-movies/${title.toLowerCase().replace(/\s/g,'')}.${imageFile.type.split('/')[1]}`;
      this.storage.ref(image).delete();
      this.storage.upload(image, imageFile).then(() => {
        return this.db
          .collection('items')
          .doc(`${id}`)
          .update({
            title,
            description,
            score,
            genre,
            user,
            image
          });
      });      
    }

    return this.db
        .collection('items')
        .doc(`${id}`)
        .update({
          title,
          description,
          score,
          genre,
          user
        });    
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

  public deleteItem(item)
  {
    console.log(item.payload.doc.data().image)
    // ver se o nome eh nosignal.jpg
    if(!(item.payload.doc.data().image as string).includes('nosignal.jpg'))
    {
      this.storage.ref(item.payload.doc.data().image).delete();
    }
    return this.db
      .collection('items')
      .doc(`${item.payload.doc.id}`)
      .delete();
  }

  public updateItem(item)
  {
    this.db
      .collection(`items`)
      .doc(`${item}`)
  }
}
