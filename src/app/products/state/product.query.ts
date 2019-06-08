import { Injectable } from '@angular/core';
import { QueryEntity, QueryConfig } from '@datorama/akita';
import { ProductStore, ProductState } from './product.store';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})

@QueryConfig({sortBy: 'price'})
export class ProcductQuery extends QueryEntity<ProductState, Product> {
  constructor(protected store: ProductStore) {
    super(store);
   }
}
