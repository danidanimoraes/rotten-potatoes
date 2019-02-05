import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AboutComponent } from './about/about.component';

const routes: Routes =
[
  { path: '', redirectTo: '/items', pathMatch: 'full'},
  { path: 'new', component: NewItemComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  // You generally don't declare components in a routing module, so I've deleted declarations and CommonModule.
  // Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule
{ }