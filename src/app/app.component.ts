import { Component } from '@angular/core';
import { CartQuery } from './cart/state/cart.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'akita-cart';
  constructor(private queryCart: CartQuery) {}

  count$ = this.queryCart.selectCount();
}
