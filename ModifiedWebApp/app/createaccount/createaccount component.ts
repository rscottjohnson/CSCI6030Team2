import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { flyInOut,expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service'

@Component({
  selector: 'app-contact',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block',
  '[@expand]': 'true',
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class CreateAccountComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackcopy: Feedback;
  errMess: string;
  spinwhilewait: Boolean;


  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'password': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 2 characters long.',
      'maxlength':     'Password cannot be more than 25 characters long.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 2 characters long.',
      'maxlength':     'Password cannot be more than 25 characters long.'
    }
  };


  constructor(private fb: FormBuilder,
     private feedbackService: FeedbackService) {

    this.createForm();
    this.spinwhilewait = false;
  }

  ngOnInit() {
  }

  createForm(): void {
      this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [Validators.required, Validators.pattern] ],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

    }


   onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
    this.spinwhilewait = true;
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback=> {
        this.feedback = feedback;
        this.feedbackcopy = feedback;
        this.spinwhilewait = false;
      },
      errmess => { this.feedback = null; this.feedbackcopy = null; this.errMess = <any>errmess; });
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password: '',
      message: ''
    });

    this.feedbackFormDirective.resetForm();
  }

}
