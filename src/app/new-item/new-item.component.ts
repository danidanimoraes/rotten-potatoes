import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  public saveItem(title: string, description: string, score: number, genre: string)
  {
    console.log(`Saving ${title}:${description} (${score}/10) - ${genre}`)
    this.firebaseService.createItem(title, description, score, genre);
    this.location.back();
  }
}
