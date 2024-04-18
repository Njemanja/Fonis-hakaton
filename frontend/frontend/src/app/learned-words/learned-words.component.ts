import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { Hit } from '../models/hit';

@Component({
  selector: 'app-learned-words',
  templateUrl: './learned-words.component.html',
  styleUrls: ['./learned-words.component.css']
})
export class LearnedWordsComponent {
  constructor(private gameService: GameService, private router: Router) {}
  hited: Hit[];
  level: number;
  user: User;
  ngOnInit(){
    var token = localStorage.getItem("token");
    if(token == "null"){
      this.router.navigate(["login"]);   
    } else {
      this.user = JSON.parse(token);
    }

    this.gameService.getHits(JSON.parse(localStorage.getItem("token")).username).subscribe((hited: Hit[]) => {
        this.hited = hited;
        console.log(this.hited);

    });
    this.level = Math.floor(this.user.points/5)+1;
  }
  logout() {
    localStorage.setItem("token", null);
  }

}

