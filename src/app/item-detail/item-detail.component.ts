import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { Location } from '@angular/common';
import { Item } from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input()
  item: Item;

  private id: string;
  public editMode: boolean = false;
  private selectedFile: File;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private location: Location,
  ) { }

  ngOnInit()
  {
    this.id  = this.route.snapshot.paramMap.get('id');
    this.getItem(this.id);
  }

  private getItem(id: string)
  {
    this.firebaseService
      .getItem(this.id)
      .subscribe((item) => {
        this.item = item.data() as Item;
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

  public deleteItem()
  {
    this.firebaseService.deleteItem(this.id).then(() => this.goBack())
  }

  public detectFiles(event)
  {
    this.selectedFile = event.target.files[0];
  }

  public uploadItem(title: string, description: string, score: number, genre: string)
  {
    const uploadedTitle = title && title != this.item.title ? title : this.item.title;
    const uploadedDescription = description && description != this.item.description ? description : this.item.description;
    const uploadedScore = score && score != this.item.score ? score : this.item.score;
    const uploadedGenre = genre && genre != this.item.genre ? genre : this.item.genre;
    const uploadedImage = this.selectedFile;

    this.firebaseService.uploadItem(this.id, uploadedTitle, uploadedDescription, uploadedScore, uploadedGenre, uploadedImage);
    this.editMode = false;
    this.getItem(this.id);
  }
}
