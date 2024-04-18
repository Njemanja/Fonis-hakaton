import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game_words } from '../models/Game_words';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { KvizService } from '../services/kviz.service';
import { User } from '../models/users';
import { Hit } from '../models/hit';

interface Answer {
  text: string;
  isRight: boolean;
  position: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private gameService: GameService, private router: Router, private kvizService: KvizService) {}

  game_word: Game_words;
  playercolor: string = "blueplayercolor";
  player = 0;
  score = 0;
  speed_multiplier = 0.025;
  lanes: { answers: Answer[] }[] = [
    { answers: [] },
    { answers: [] }
  ];
  lastFrameTime = Date.now();
  animationFrameId: number = 0;

  timer: number = 20;
  timerSubscription: Subscription;
  isPreparing: boolean = false;
  gameOver: boolean = false;
  language: string;
  counter: number=0;
  hitArr: Hit[];
  hit: Hit;
  allWords: Game_words[];
  threeWords: Game_words[];
  currentIndex: number = 0;

  user: User;
  ngOnInit() {
    this.allWords = new Array();
    this.threeWords = new Array();
    this.hitArr = new Array();
    this.user = JSON.parse(localStorage.getItem("token"));
    this.bringWords();
    this.startTimer();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    this.stopGame();
  }

  
  bringWords() {
    this.gameService.bringWords().subscribe((word: Game_words) => {
      if (word) {
        this.game_word = word;
        this.generateAnswers();
        this.startGame();
        
        
      } else {
        alert("Greška");
      }
    });
  }

  // bringWords() {
  //   if(this.threeWords.length == 0){
  //     this.gameService.bringWords2(this.user.currentCity).subscribe((words: Game_words[]) => {
  //       if (words) {
  //         this.allWords = words;
  //         this.getThreeWords();
  //         this.game_word = this.threeWords[this.currentIndex];
  //         this.generateAnswers();
  //         this.startGame();
  //       } else {
  //         alert("Greška");
  //       }
  //     })
  //   }

  //   else{
  //     this.game_word = this.threeWords[++this.currentIndex];
  //     this.generateAnswers();
  //     this.startGame();
  //   }
  // }

  getThreeWords(){
    for(let i = 0;i < 3; i++){
      let index = this.generateRandomIndex(this.allWords);
      this.threeWords.push(this.allWords[index]);
      this.allWords.splice(index, 1);
    }
  }

  
  generateRandomIndex(words: Game_words[]): number {
    const randomIndex = Math.floor(Math.random() * words.length);
    return randomIndex;
  }

  goToHomepage() {
    this.router.navigate(['../homepage']);
  }

  restartGame() {
    this.gameOver = false;
    this.score = 0;
    this.timer = 20;
    this.playercolor = "blueplayercolor";
    this.player = 0;
    this.lanes = [{ answers: [] }, { answers: [] }];
    this.startTimer();
    this.bringWords();
  }

  startGame() {
    if (!this.gameOver) {
      const tick = () => {
        const now = Date.now();
        const deltaTime = (now - this.lastFrameTime) / 1000;
        this.lastFrameTime = now;

        this.moveAnswers(deltaTime);
        this.checkCollision();
        this.animationFrameId = requestAnimationFrame(tick);
      };
      tick();
    }
  }

  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        this.timer = 0;
        this.timerSubscription.unsubscribe();
        this.endGame();
      }
    });
  }
  stopGame() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  endGame() {
    this.gameOver = true;
    this.kvizService.saveScore2(this.user.username, this.score).subscribe((res) => {
      if (res) {
        console.log('Score saved')
        this.gameService.updateHits(this.hitArr).subscribe((res) => {
          if (res) {
            console.log('hits updated');
            this.user.points+=this.score;
            localStorage.setItem('token', JSON.stringify(this.user));
            this.hitArr = new Array();
            this.allWords = new Array();
            this.threeWords = new Array();
            this.timerSubscription.unsubscribe();
          }
        });
      }
    });
    /*this.gameService.saveScore(this.username, this.score).subscribe(()=>{
  
    } ); */
    cancelAnimationFrame(this.animationFrameId);

  }

  generateAnswers() {
    const rightAnswer = Math.random() < 0.5;
    //this.playercolor = "blueplayercolor";
    this.lanes[0].answers.push({ text: rightAnswer ? this.game_word.right : this.game_word.wrong, isRight: rightAnswer, position: 0 });
    this.lanes[1].answers.push({ text: !rightAnswer ? this.game_word.right : this.game_word.wrong, isRight: !rightAnswer, position: 0 });

  }

  moveAnswers(deltaTime: number) {
    this.lanes.forEach(lane => {
      lane.answers.forEach(answer => {
        answer.position += this.speed_multiplier * deltaTime * 60;
      });
      lane.answers = lane.answers.filter(answer => answer.position < 9.1);
    });
  }

  checkCollision() {
    if (!this.gameOver) {
      this.lanes.forEach((lane, index) => {
        lane.answers = lane.answers.filter(answer => {
          if(answer.position>=1 && index === this.player){
              this.playercolor = "blueplayercolor";
          }
          if (answer.position >= 9 && answer.position < 9.1 && index === this.player) {
            if (answer.isRight) {
              this.score++;
              this.hit = new Hit();
              this.hit.hit_word = this.game_word.right;
              this.hit.language = this.language;
              this.hit.id = this.game_word.id;


              this.hit.question = this.game_word.question_word;
              this.hit.username = this.user.username;
              this.hitArr.push(this.hit);
              

              this.playercolor = "greenplayercolor";
              this.bringWords();
            } else {
              this.score--;
              this.playercolor = "redplayercolor";
              this.bringWords();
            }

            if(this.score/5-1>this.counter){
              this.timer+=15;
              this.counter+=1;
            }
            return false;
          }
          return true;
        });
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.movePlayer(0);
    } else if (event.key === 'ArrowRight') {
      this.movePlayer(1);
    }
  }

  movePlayer(laneIndex: number) {
    this.player = laneIndex;
  }
} 