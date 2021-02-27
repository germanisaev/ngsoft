import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  public item: Item;
  public items: Item[];

  constructor(private _service: ShopService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._service.getItems()
      .subscribe((itms: Item[]) => this.items = itms);
  }

  selected(item: any) {
    this.item = item;
    //console.log(this.item);
  }

}
