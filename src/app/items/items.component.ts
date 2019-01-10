import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Genre } from '../genre';
import { Observable } from 'rxjs-compat/Observable';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Array<any>;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getAllItems();
  }

  public getAllItems()
  {
    this.firebaseService
      .getAllItems()
      .subscribe((result) => this.items = result);
  }
}
