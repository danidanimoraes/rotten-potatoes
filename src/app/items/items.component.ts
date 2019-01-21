import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Genre } from '../genre';
import { Observable } from 'rxjs-compat/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { storage } from 'firebase';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Array<any>;
  images: Map<string, string> = new Map<string, string>();

  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getAllItems();
  }

  public getAllItems()
  {
    this.firebaseService
      .getAllItems()
      .subscribe((result) => result.map((item: DocumentChangeAction<Item>) => 
      {
        this.items = result;
        if(!item.payload.doc.data().image)
        {
          this.storage.ref('series-and-movies').child('nosignal.jpg').getDownloadURL().subscribe((url: string) => this.images.set(item.payload.doc.id, url));
          return;
        }
        const imageLink: string[] = item.payload.doc.data().image.split('/');
        this.storage.ref(imageLink[0]).child(imageLink[1]).getDownloadURL().subscribe((url: string) => this.images.set(item.payload.doc.id, url));
        return;
      }));
  }

  public getURLStyle(id: string)
  {
    if(id)
    {
      return {
        "background-image" : `url(${this.images.get(id)})`,
        "background-position": "center",
        "background-repeat": "no-repeat",
        "width": "100%",
        "background-size" : "cover"
      };
    }
  }

  public deleteItem(item)
  {
    this.firebaseService.deleteItem(item);
  }
}
