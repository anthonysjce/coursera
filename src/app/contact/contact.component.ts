import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { expand } from '../animations/animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    expand()
  ]
})
export class ContactComponent implements OnInit {

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
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
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  
  feedbackForm:FormGroup;
  feedback:Feedback;
  errMess;
  loading = false;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb:FormBuilder,
    private feedbackService: FeedbackService) { 
    this.createForm();
  }
  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      telnum: ['', [Validators.required,Validators.pattern] ],
      email: ['', [Validators.required,Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();// this will reset all errors
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
            if (messages.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    //feedback is the dataModel and feedbackForm.value is form Model
    const feedback:Feedback = this.feedbackForm.value;
    console.log(this.feedback);
    /* this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm(); */
    this.loading = true;
    this.feedbackService.postFeedback(feedback).subscribe(feedback => {
      this.feedback = feedback;
      this.loading = false;
      setTimeout(() =>{
        this.reset();
      },5000);
    },
      errormess => {
        this.errMess = <any>errormess;
        this.reset();
      });
  }
  reset(){
    this.feedback = null;
     this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    //this.feedbackFormDirective.resetForm();  // this is giving errorCannot read property 'resetForm()' of undefined   
    this.feedbackForm.reset();
  }
  ngOnInit() {
  }  
}
