import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Genre } from '../genre';
import { Observable } from 'rxjs-compat/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { storage, User } from 'firebase';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Item } from '../item';
import { AuthenticationService } from '../authentitcation.service';

export enum OrderOptions{
  Title = "Title",
  Score = "Score",
  User = "User",
  Modified = "Modified",
  Included = "Included"
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  user: any = {};

  items: Array<any> = [];
  images: Map<string, string> = new Map<string, string>();
  orderByOptions: Array<string> = new Array<string>();
  selectedOrder: OrderOptions;
  isReverseOrder: boolean = false;
  
  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.orderByOptions = Object.keys(OrderOptions);
    this.selectedOrder = OrderOptions.Title;
    this.getAllItems(); 
  }

  public getAllItems()
  {
    this.firebaseService
      .getAllItems()
      .subscribe((result) => 
      {
        this.items = result.map((item: DocumentChangeAction<Item>) => 
        {
          
          if(!item.payload.doc.data().image)
          {
            this.storage.ref('series-and-movies').child('nosignal.jpg').getDownloadURL().subscribe((url: string) => this.images.set(item.payload.doc.id, url));
            
            return item;
          }
          const imageLink: string[] = item.payload.doc.data().image.split('/');
          this.storage.ref(imageLink[0]).child(imageLink[1]).getDownloadURL().subscribe((url: string) => this.images.set(item.payload.doc.id, url));
          return item;
        })
        .sort((a, b) => this.sortItemsBy(a, b, this.selectedOrder));
    });
      
  }

  private sortItemsBy(a, b, order: OrderOptions)
  {
    switch(order)
    {
      case OrderOptions.Title:
        if(this.isReverseOrder)
          return a.payload.doc.data().title.toLowerCase() >= b.payload.doc.data().title.toLowerCase() ? -1 : 1;
        else
          return a.payload.doc.data().title.toLowerCase() < b.payload.doc.data().title.toLowerCase() ? -1 : 1;
      case OrderOptions.Score:
        if(this.isReverseOrder)
          return parseInt(a.payload.doc.data().score, 10) >= parseInt(b.payload.doc.data().score, 10) ? -1 : 1;
        else
          return parseInt(a.payload.doc.data().score, 10) < parseInt(b.payload.doc.data().score, 10) ? -1 : 1;
      case OrderOptions.User:
        if(this.isReverseOrder)
          return a.payload.doc.data().userIncluded.toLowerCase() >= b.payload.doc.data().userIncluded.toLowerCase() ? -1 : 1;
        else
          return a.payload.doc.data().userIncluded.toLowerCase() < b.payload.doc.data().userIncluded.toLowerCase() ? -1 : 1;
      case OrderOptions.Modified:
        if(this.isReverseOrder)
          return a.payload.doc.data().modified >= b.payload.doc.data().modified ? -1 : 1;
        else
          return a.payload.doc.data().modified < b.payload.doc.data().modified ? -1 : 1;
      case OrderOptions.Included:
        if(this.isReverseOrder)
          return a.payload.doc.data().included >= b.payload.doc.data().included ? -1 : 1;
        else
          return a.payload.doc.data().included < b.payload.doc.data().included ? -1 : 1;
    }
  }

  private sortItems()
  {
      this.items = this.items.sort((a, b) => this.sortItemsBy(a, b, this.selectedOrder));
  }

  public onSelectOrder(selectedOrder: OrderOptions)
  {
    this.selectedOrder = selectedOrder;
    this.sortItems();
  }

  public changeReverse()
  {
    this.isReverseOrder = !this.isReverseOrder;
    this.sortItems();
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
    this.firebaseService.deleteItem(item.payload.doc.id, item.payload.doc.data().image);
  }
}
