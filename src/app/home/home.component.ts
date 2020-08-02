import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  featuredLeader:Leader;
  constructor(private dishService:DishService,
    private promotionService:PromotionService,
    private leaderService:LeaderService) { }

  ngOnInit() {
    //this.dish = this.dishService.getFeaturedDish();
    this.dishService.getFeaturedDish().then(dish => this.dish = dish);
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.featuredLeader = this.leaderService.getFeaturedLeader();
  }

}
