import { Injectable } from '@angular/core';
import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Product } from './product.model';

export interface ProductState extends EntityState<Product> {}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({name: 'product'})
export class ProductStore extends EntityStore<ProductState, Product> {
  constructor() {
    super();
  }
}
