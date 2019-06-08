import { Injectable } from "@angular/core";
import { ID } from "@datorama/akita";
import { CartQuery } from "./cart.query";
import { Cart } from "./cart.model";
import { CartStore } from "./cart.store";
import { Product } from "src/app/products/state/product.model";

export function createItemCart(params: ID): Cart {
  return {
    quantity: 1,
    total: 0,
    productId: params
  };
}

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private queryCart: CartQuery, private storeCart: CartStore) {}

  updateQuantity(productId: Product["id"], increase = 1) {
    const findItem = this.queryCart.getEntity(productId);
    if (!!findItem) {
      const newQuantity = findItem.quantity + increase;
      this.storeCart.update(productId, entity => {
        return {
          ...entity,
          quantity: newQuantity
        };
      });
    }
    const item = createItemCart(productId);
    console.log(item);
    return this.storeCart.add(item);
  }

  subQuantity(id: Product["id"]) {
    const item = this.queryCart.getEntity(id);
    if (item.quantity === 1) {
      return this.storeCart.remove(id);
    }
    this.updateQuantity(id, -1);
  }
}
