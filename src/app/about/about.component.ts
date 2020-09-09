import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand } from '../animations/animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    expand()
  ]
})
export class AboutComponent implements OnInit {
  
  leaders:Leader[];
  errorMsg

  constructor(private leaderService:LeaderService,
    @Inject('BaseURL') private BaseURL) { 

  }

  ngOnInit() {
    //this.leaderService.getLeaders().then(leaders => this.leaders = leaders);
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders,
      errormess => this.errorMsg = <any>errormess);
  }

}
