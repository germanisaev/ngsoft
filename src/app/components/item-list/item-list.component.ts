import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/shared/models/item.model';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnInit {

  @Input() public items: Item[];
  @Output() public itemSelected = new EventEmitter<Item>();
  selectItem(item: Item) {  
    this.itemSelected.emit(item); 
    this.itemDetail = item;   
  }
  
  itemDetail?: Item;
  searchText: string = '';
  sortText: string = '';
  closeResult: string = '';

  constructor(private modalService: NgbModal, private _service: ShopService,) { }

  ngOnInit(): void {

  }
  
  open(content: any, itemId: any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteProduct(itemId); 
        this._service.deleteItem(itemId).subscribe(response => {
          console.log(response);
        });
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  
  
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }

  deleteProduct(id: any) {  
    this.items = this.items.filter(x => x.id !== id); 
  }

}

