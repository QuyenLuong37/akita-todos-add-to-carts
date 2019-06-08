import { Product } from 'src/app/products/state/product.model';

export interface Cart {
  productId: Product['id'];
  quantity: number;
  total: number;
}
