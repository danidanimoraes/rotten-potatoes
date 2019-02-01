import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs-compat/Observable';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { storage } from 'firebase';
import { AuthenticationService } from '../authentitcation.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  private selectedFile: File;
  private hasFile: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private location: Location,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public detectFiles(event)
  {
    this.selectedFile = event.target.files[0];
    console.log("File:", this.selectedFile.name)
    this.hasFile = true;
  }

  public saveItem(title: string, description: string, score: number, genre: string)
  {
    const image = this.hasFile ? this.selectedFile : null;
    this.authService.angularFireAuth.authState.subscribe((user) => {
      this.firebaseService.createItem(title, description, score, genre, user.displayName, image);
      this.location.back();
      this.hasFile = false;
    });    
  }

  public goBack(): void
  {
    this.location.back();
  }
}
