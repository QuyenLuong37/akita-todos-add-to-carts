import { Component, OnInit } from '@angular/core';
import { CartQuery } from './state/cart.query';
import {Observable } from 'rxjs';
import { CartService } from './state/cart.service';
import { Product } from '../products/state/product.model';
import { CartStore } from './state/cart.store';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total$: Observable<number>;
  listCarts$: Observable<any>;
  constructor(
    private cartQuery: CartQuery,
    private cartService: CartService,
    private cartStore: CartStore
  ) { }

  ngOnInit() {
    this.listCarts$ = this.cartQuery.selectCarts$;
    this.total$ = this.cartQuery.selectTotalPrice$;

  }

  addQuantity(id: Product['id']) {
    this.cartService.updateQuantity(id);
  }

  subQuantity(id: Product['id']) {
    this.cartService.subQuantity(id);
  }

  removeCartItem(id: ID) {
    this.cartStore.remove(id);
  }

}
