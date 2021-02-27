import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit, EventEmitter, Output, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit, DoCheck {

  private _element: any;

  @Output()
  elementChange = new EventEmitter<any>();

  get item() {
    return this._element;
  }

  @Input()
  set item(newVal: Item) {
    if (this._element === newVal) { return; }
    this._element = newVal;
    this.ref.markForCheck();
    this.elementChange.emit(this._element);
  }

  private elementDiffer: KeyValueDiffer<string, any>;

  detailForm: FormGroup;
  itemRef: Item;
  detailId: number;
  submitted = false;
  closeResult: string = '';
  numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private differs: KeyValueDiffers
  ) {
    this.elementDiffer = this.differs.find({}).create();
  }

  ngOnInit(): void {
    this.onCreate();
  }

  ngDoCheck() {
    const changes = this.elementDiffer.diff(this.item);
    if (changes) {
      this.item = { ...this.item };
      this.getDataById(this.item);
    }
  }

  onCreate() {
    this.detailForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1), Validators.pattern(this.numericNumberReg)]],
      urlImage: ['']
    });
  }

  getDataById(item: any) {
    this.detailForm.patchValue({
      name: item.name,
      description: item.description,
      price: item.price,
      urlImage: item.urlImage,
    });
  }

  get f() { return this.detailForm.controls; }

  onSubmit(content: any) {

    this.submitted = true;

    if (this.detailForm.invalid) {
      return;
    }

    this.itemRef = this.detailForm.value;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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

}
