import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {
   
    dish:Dish;

    constructor(private dishService:DishService,
      private route:ActivatedRoute,
      private location:Location) { }

    ngOnInit() {
      const id = this.route.snapshot.params['id'];
      //this.dish = this.dishService.getDish(id);
      this.dishService.getDish(id).then(dish => this.dish = dish);
    }
    goBack(): void {
      this.location.back();
    }
}
