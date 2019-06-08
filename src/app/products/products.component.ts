import { Component, OnInit } from '@angular/core';
import { ProductService } from './state/product.service';
import { Product } from './state/product.model';
import { Observable, combineLatest } from 'rxjs';
import { ProcductQuery } from './state/product.query';
import { CartQuery } from '../cart/state/cart.query';
import { FormControl } from '@angular/forms';
import { CartService } from '../cart/state/cart.service';
import { switchMap, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  listProducts$: Observable<Product[]>;
  count$: Observable<number>;
  sortBy = new FormControl('title');
  constructor(
    private serviceProduct: ProductService,
    private queryProduct: ProcductQuery,
    private queryCart: CartQuery,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.serviceProduct.getMockData().subscribe();
    // this.listProducts$ = this.queryProduct.selectAll({sortBy: 'title'});
    this.count$ = this.queryCart.selectCount();
    this.listProducts$ = combineLatest(this.sortBy.valueChanges.pipe(
      startWith('title'))
    ).pipe(
      switchMap(([sortBy]) => this.queryProduct.selectAll({sortBy}))
    );
  }

  addToCart({id}: Product) {
    this.cartService.updateQuantity(id);
  }

}
