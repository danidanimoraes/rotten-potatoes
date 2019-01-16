import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';

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
    private firebaseService: FirebaseService
  ) { }

  ngOnInit()
  {
    const id: string  = this.route.snapshot.paramMap.get('id');
    this.firebaseService
      .getItem(id)
      .subscribe((item) => this.item = item.data());
  }

}
