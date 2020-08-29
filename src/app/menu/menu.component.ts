import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/animation';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
  dishes:Dish[];
  selectedDish:Dish;
  errMess: string;
  constructor(private dishService:DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //this.dishes = this.dishService.getDishes();
    //this.dishService.getDishes().then(dishes => this.dishes = dishes)
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }
  onSelectedDish(dish:Dish){
    this.selectedDish = dish
  }
}
