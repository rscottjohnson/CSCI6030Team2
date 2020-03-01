import { Component, OnInit, Inject} from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';
import { Teammember } from '../shared/teammember';
import { TeammemberService } from '../services/teammember.service';
import { flyInOut, expand } from '../animations/app.animation';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class HomeComponent implements OnInit {
  product: Product;
  promotion: Promotion;
  teammember: Teammember;
  productErrMess: string;
  teammemberErrMess: string;


  constructor(private productService: ProductService,
  private teammemberService: TeammemberService,
  @Inject('BaseURL') private baseURL) { }


  ngOnInit() {
   this.productService.getFeaturedProduct()
     .subscribe(product => this.product = product,
     errmess => this.productErrMess = <any>errmess);
   this.teammemberService.getFeaturedTeammember()
     .subscribe(teammember => this.teammember = teammember,
     errmess => this.teammemberErrMess = <any>errmess);
  }

}
