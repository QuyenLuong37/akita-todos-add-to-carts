import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../state/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() add = new EventEmitter();
  @Output() sub = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
