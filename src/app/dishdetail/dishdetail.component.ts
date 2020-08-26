import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import {Comment} from '../shared/comment';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {
   
    dish:Dish;
    dishIds: string[];
    prev: string;
    next: string;
    errMess;
    newComment:any;
    commentForm:FormGroup;
    dishcopy: Dish;
    @ViewChild('fform') commentFormDirective;
    formErrors = {
      author:'',
      comment:''
    }

    validationMessages = {
      author:{
        required: 'Name is required.',
        minlength: 'First Name must be at least 2 characters long',
        maxlength: 'FirstName cannot be more than 25 characters long.'
      },
      comment:{
        required: 'Comment is required.'        
      }
    }
     
    constructor(private dishService:DishService,
      private route:ActivatedRoute,
      private location:Location, private fb:FormBuilder,
      @Inject('BaseURL') private BaseURL) {
        this.createForm();
    }
    createForm(){
      this.commentForm = this.fb.group({
        author: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        rating: 5,         
        comment: ['',Validators.required]          
      });    

      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();// this will reset all errors
    }
    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      if (this.commentForm.valid){
        this.displayPreview();
      }else{        
          this.newComment = null;       
      }


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
    displayPreview(){
      if(!this.newComment){
        this.newComment = {}       
      }     
      this.newComment.author = this.commentForm.value.author;
      this.newComment.comment = this.commentForm.value.comment;
      this.newComment.rating = this.commentForm.value.rating;
      
    }
    ngOnInit() {
      //const id = this.route.snapshot.params['id'];
      //this.dish = this.dishService.getDish(id);
      //this.dishService.getDish(id).then(dish => this.dish = dish);
      //this.dishService.getDish(id).subscribe(dish => this.dish = dish);

      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds );
      this.route.params.pipe(
        switchMap((params:Params) => this.dishService.getDish(params['id']))
        ).subscribe((dish) => {
          this.dish = dish;
          this.dishcopy = this.dish;
          this.setPrevNext(dish.id);
        },errmess => this.errMess = <any>errmess);

    }
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    goBack(): void {
      this.location.back();
    }
    formatLabel(value: number) {
      if (value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }
  
      return value;
    }
    onSubmit() {
      if(this.newComment){
        this.newComment.date = new Date().toISOString();
        //this.dish.comments.push(this.newComment); before implementing save
        this.dishcopy.comments.push(this.newComment);
        this.dishService.putDish(this.dishcopy).subscribe(dish => {
          this.dish = dish;
          this.dishcopy = this.dish;
        },errormess => {
            this.errMess = <any>errormess;
            this.dish = null; 
            this.dishcopy = null;
          }
        )

        this.commentFormDirective.resetForm();
        this.commentForm.controls['rating'].setValue(5);
       /*  this.commentForm.reset({
          author: '',
          rating: 5,
          comment: ''
        }); */
      }

    }
}
