import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})

export class ProductdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  product: Product;
  productcopy: Product;
  products : Product[];
  productIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  visibility = 'shown';

  formErrors = {
    'rating': '',
    'comment': '',
    'author': '',
    'date': '',
  };

  validationMessages = {
    'comment': {
      'required':      'A comment is required.',
    },
    'author': {
      'required':      'Your name is required.',
      'minlength':     'Your name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'date': {
      'required':      'Date is required.',
      'date':          'Date is not in valid format.'
    },
  };



  constructor(private productservice: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject ('BaseURL') private baseURL ) {

    this.createForm();
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.productservice.getProduct(params['id']); }))
    .subscribe(product => { this.product = product; this.productcopy = product; this.setPrevNext(product.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
     }

  createForm(): void {
    this.commentForm = this.fb.group({
      rating: '',
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      date: ''
      });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

    }

    onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.productcopy.comments.push(this.comment);
    this.productservice.putProduct(this.productcopy)
      .subscribe(product => {
        this.product = product; this.productcopy = product;
      },
      errmess => { this.product = null; this.productcopy = null; this.errMess = <any>errmess; });
    console.log(this.comment);
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: '',
    });
    this.commentFormDirective.resetForm();
  }

  ngOnInit() {
    this.productservice.getProductIds().subscribe(productIds => this.productIds = productIds);
    this.route.params.pipe(switchMap((params: Params) => this.productservice.getProduct(params['id'])))
    .subscribe(product => { this.product = product; this.setPrevNext(product.id);},
    errmess => this.errMess = <any>errmess );
  }

  setPrevNext(productId: string) {
    const index = this.productIds.indexOf(productId);
    this.prev = this.productIds[(this.productIds.length + index - 1) % this.productIds.length];
    this.next = this.productIds[(this.productIds.length + index + 1) % this.productIds.length];
  }

  goBack(): void {
  this.location.back();
  }

}
