import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input()
  item: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private location: Location,
  ) { }

  ngOnInit()
  {
    const id: string  = this.route.snapshot.paramMap.get('id');
    this.firebaseService
      .getItem(id)
      .subscribe((item) => {
        this.item = item.data();
        const imageLink: string[] = this.item.image.split('/');
        this.storage.ref(imageLink[0]).child(imageLink[1]).getDownloadURL().subscribe((url: string) => this.item.image = url);
      });
  }

  public getImageURL()
  {
      return {
        "background-image" : `url(${this.item.image})`,
        "background-position": "center",
        "background-repeat": "no-repeat",
        "width": "100%",
        "height":"100%",
        "background-size" : "cover"
      };
  }

  public goBack(): void
  {
    this.location.back();
  }
}
