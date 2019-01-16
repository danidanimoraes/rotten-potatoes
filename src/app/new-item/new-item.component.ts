import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs-compat/Observable';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { storage } from 'firebase';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    private firebaseService: FirebaseService,
    private location: Location,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  public saveItem(title: string, description: string, score: number, genre: string)
  {
    console.log(`Saving ${title}:${description} (${score}/10) - ${genre}`)
    this.firebaseService.createItem(title, description, score, genre);
    this.location.back();
  }

}
