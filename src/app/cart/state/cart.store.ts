import { Injectable } from "@angular/core";
import {
  EntityStore,
  EntityState,
  QueryConfig,
  StoreConfig
} from "@datorama/akita";
import { Cart } from "./cart.model";

export interface CartState extends EntityState<Cart> {}

@Injectable({
  providedIn: "root"
})
@StoreConfig({ name: "cart", idKey: "productId" })
export class CartStore extends EntityStore<CartState, Cart> {
  constructor() {
    super();
  }
}
