import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand } from '../animations/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  featuredLeader:Leader;
  errMess;string;
  constructor(private dishService:DishService,
    private promotionService:PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //this.dish = this.dishService.getFeaturedDish();
    /* this.dishService.getFeaturedDish().then(dish => this.dish = dish);
    this.promotionService.getFeaturedPromotion().then(promotion => this.promotion = promotion)
    this.leaderService.getFeaturedLeader().then(leader => this.featuredLeader = leader); */
    this.dishService.getFeaturedDish().subscribe(dish => {
      this.dish = dish;
    },errormess => this.errMess = <any>errormess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errormess => this.errMess = <any>errormess )
    this.leaderService.getFeaturedLeader().subscribe(leader => this.featuredLeader = leader,
      errmess => this.errMess = <any>errmess);
  }

}
