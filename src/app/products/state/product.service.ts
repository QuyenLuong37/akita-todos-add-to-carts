import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { Product } from './product.model';
import { mapTo, map } from 'rxjs/operators';
import { products } from '../product.mock';
import { ProcductQuery } from './product.query';
import { ProductStore } from './product.store';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    // private queryProduct: ProcductQuery,
    private storeProduct: ProductStore
  ) { }

  getMockData(): Observable<void> {
    return timer(300).pipe(
      mapTo(products),
      map(data => {
        this.storeProduct.set(data);
      })
    );
  }
}
