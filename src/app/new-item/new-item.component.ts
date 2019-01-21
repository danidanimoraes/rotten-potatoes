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

  private selectedFile: File;

  constructor(
    private firebaseService: FirebaseService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  public detectFiles(event)
  {
    this.selectedFile = event.target.files[0];
    console.log("File:", this.selectedFile.name)
  }

  public saveItem(title: string, description: string, score: number, genre: string)
  {
    console.log(`Saving ${title}:${description} (${score}/10) - ${genre}`)
    this.firebaseService.createItem(title, description, score, genre, this.selectedFile);
    this.location.back();
  }

  public goBack(): void
  {
    this.location.back();
  }
}
