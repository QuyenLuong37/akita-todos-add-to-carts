import { Injectable } from "@angular/core";
import { Cart } from "./cart.model";
import { CartStore, CartState } from "./cart.store";
import { QueryEntity, QueryConfig } from "@datorama/akita";
import { combineLatest } from "rxjs";
import { ProcductQuery } from "src/app/products/state/product.query";
import { map, shareReplay, withLatestFrom } from "rxjs/operators";
import { Product } from "src/app/products/state/product.model";

@Injectable({
  providedIn: "root"
})
@QueryConfig({})
export class CartQuery extends QueryEntity<CartState, Cart> {
  constructor(
    protected storeCart: CartStore,
    private productQuery: ProcductQuery
  ) {
    super(storeCart);
  }

  selectCarts$ = combineLatest(
    this.selectAll(),
    this.productQuery.selectAll({asObject: true})
  ).pipe(
    map(joinCartWithProduct),
    shareReplay(1)
  );

  selectTotalPrice$ = this.selectCarts$.pipe(
    map(cartItems => cartItems.reduce((acc, item) => acc + item.total, 0))
  );
}
function joinCartWithProduct([cartItem, listProduct]) {
  console.log(listProduct);
  return cartItem.map(item => {
    const product = listProduct[item.productId];
    return {
      ...item,
      ...product,
      total: item.quantity * product.price
    };
  });
}
