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
    const included: Date = new Date();
    const modified: Date = included;
    const userIncluded = user;
    const userModified = user;
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
              userIncluded,
              userModified,
              image,
              included,
              modified
            }
          )
      });
    }
    else{
      const image: string = `series-and-movies/nosignal.jpg`;
      return this.db
        .collection('items')
        .add(
          {
            title,
            description,
            score,
            genre,
            userIncluded,
            userModified,
            image ,
            included,
            modified
          }
        )
    }
  }

  public uploadItem(id: string, title: string, description: string, score: number, genre: string, userIncluded: string, userModified: string, imageFile: File)
  {
    const modified: Date = new Date();
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
            userIncluded,
            userModified,
            image,
            modified
          });
      });      
    }
    else{
      return this.db
      .collection('items')
      .doc(`${id}`)
      .update({
        title,
        description,
        score,
        genre,
        userIncluded,
        userModified,
        modified
      });   
    }
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

  public deleteItem(id: string, image: string)
  {
    // ver se o nome eh nosignal.jpg
    if(!image.includes('nosignal.jpg'))
    {
      this.storage.ref(image).delete();
    }

    return this.db
      .collection('items')
      .doc(`${id}`)
      .delete();
  }
}
